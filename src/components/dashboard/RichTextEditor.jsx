'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  ImageIcon,
  Table as TableIcon,
  Undo2,
  Redo2,
  RemoveFormatting,
  Code2,
  X,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Toolbar Button ────────────────────────────────────────────────────────────
function ToolBtn({ onClick, active, disabled, title, children }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      disabled={disabled}
      title={title}
      className={cn(
        'w-7 h-7 flex items-center justify-center rounded text-[13px] transition-all duration-100',
        active ? 'bg-[#eb5905] text-white' : 'text-[#4a5568] hover:bg-[#f4f6f9] hover:text-[#222222]',
        disabled && 'opacity-30 cursor-not-allowed',
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-[#e2e8f0] mx-0.5 shrink-0" />;
}

// ─── Main Editor ───────────────────────────────────────────────────────────────
export default function RichTextEditor({ value = '', onChange, placeholder = 'Start writing...' }) {
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: { HTMLAttributes: { class: 'code-block' } },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'editor-link' } }),
      Image.configure({ HTMLAttributes: { class: 'editor-image' } }),
      Placeholder.configure({ placeholder }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[320px] px-4 py-3 text-[14px] text-[#222222]',
      },
      // Fix pasted tables: ensure first row of every table goes into <thead>
      // This handles both HTML tables (from Sheets/Word) and plain-text paste
      transformPastedHTML(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        doc.querySelectorAll('table').forEach((table) => {
          // Already has a thead with rows — nothing to do
          if (table.querySelector('thead tr')) return;

          // Find first <tr> anywhere in the table
          const firstRow = table.querySelector('tr');
          if (!firstRow) return;

          // Convert every cell in the first row to <th>
          Array.from(firstRow.querySelectorAll('td')).forEach((td) => {
            const th = doc.createElement('th');
            th.innerHTML = td.innerHTML;
            Array.from(td.attributes).forEach((a) => th.setAttribute(a.name, a.value));
            td.replaceWith(th);
          });

          // Move the first row into a <thead>
          const thead = doc.createElement('thead');
          firstRow.parentNode.insertBefore(thead, firstRow);
          thead.appendChild(firstRow);
        });
        return doc.body.innerHTML;
      },
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl || 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    const toastId = toast.loading('Uploading image...');
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || 'Upload failed', { id: toastId });
        return;
      }

      editor.chain().focus().setImage({ src: data.data.url, alt: file.name }).run();
      toast.success('Image inserted', { id: toastId });
    } catch {
      toast.error('Failed to upload image', { id: toastId });
    } finally {
      e.target.value = '';
    }
  };

  const insertTable = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  // ── HTML Source modal ──────────────────────────────────────────────────────
  const [htmlModalOpen, setHtmlModalOpen] = useState(false);
  const [htmlSource, setHtmlSource] = useState('');

  const openHtmlModal = () => {
    setHtmlSource(editor.getHTML());
    setHtmlModalOpen(true);
  };

  const applyHtmlSource = () => {
    if (!editor) return;
    // Set the visual display in TipTap (will strip thead visually, but that's ok in editor)
    editor.commands.setContent(htmlSource, false);
    // Call onChange with the raw HTML the user typed — fixTableHtml will run on save
    onChange?.(htmlSource);
    setHtmlModalOpen(false);
  };

  if (!editor) return null;

  return (
    <>
      <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
        {/* Toolbar */}
        <div className="border-b border-[#e2e8f0] bg-[#f8f9fa] px-2 py-1.5 flex flex-wrap items-center gap-0.5">
          {/* Undo/Redo */}
          <ToolBtn
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </ToolBtn>

          <Divider />

          {/* Headings */}
          <ToolBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive('heading', { level: 1 })}
            title="Heading 1"
          >
            <Heading1 className="w-3.5 h-3.5" />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="w-3.5 h-3.5" />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive('heading', { level: 3 })}
            title="Heading 3"
          >
            <Heading3 className="w-3.5 h-3.5" />
          </ToolBtn>

          <Divider />

          {/* Inline styles */}
          <ToolBtn
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-3.5 h-3.5" />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-3.5 h-3.5" />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="w-3.5 h-3.5" />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            title="Strikethrough"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive('code')}
            title="Inline Code"
          >
            <Code className="w-3.5 h-3.5" />
          </ToolBtn>

          <Divider />

          {/* Alignment */}
          <ToolBtn
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            active={editor.isActive({ textAlign: 'left' })}
            title="Align Left"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            active={editor.isActive({ textAlign: 'center' })}
            title="Align Center"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            active={editor.isActive({ textAlign: 'right' })}
            title="Align Right"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            active={editor.isActive({ textAlign: 'justify' })}
            title="Justify"
          >
            <AlignJustify className="w-3.5 h-3.5" />
          </ToolBtn>

          <Divider />

          {/* Lists */}
          <ToolBtn
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="Ordered List"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            title="Blockquote"
          >
            <Quote className="w-3.5 h-3.5" />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive('codeBlock')}
            title="Code Block"
          >
            <span className="text-[10px] font-mono font-bold">{'{}'}</span>
          </ToolBtn>

          <Divider />

          {/* Horizontal rule */}
          <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
            <Minus className="w-3.5 h-3.5" />
          </ToolBtn>

          {/* Link */}
          <ToolBtn onClick={setLink} active={editor.isActive('link')} title="Insert Link">
            <LinkIcon className="w-3.5 h-3.5" />
          </ToolBtn>

          {/* Image */}
          <ToolBtn onClick={() => fileInputRef.current?.click()} title="Insert Image">
            <ImageIcon className="w-3.5 h-3.5" />
          </ToolBtn>

          {/* Table */}
          <ToolBtn onClick={insertTable} title="Insert Table (3×3 with header)">
            <TableIcon className="w-3.5 h-3.5" />
          </ToolBtn>

          {/* HTML Source */}
          <ToolBtn onClick={openHtmlModal} title="Edit HTML Source">
            <Code2 className="w-3.5 h-3.5" />
          </ToolBtn>

          {/* Table controls — only shown when cursor is inside a table */}
          {editor.isActive('table') && (
            <>
              <Divider />
              <span className="text-[10px] text-[#77838f] font-medium px-1 shrink-0">Col:</span>
              <ToolBtn onClick={() => editor.chain().focus().addColumnBefore().run()} title="Add column before">
                <span className="text-[9px] font-bold leading-none">◀+</span>
              </ToolBtn>
              <ToolBtn onClick={() => editor.chain().focus().addColumnAfter().run()} title="Add column after">
                <span className="text-[9px] font-bold leading-none">+▶</span>
              </ToolBtn>
              <ToolBtn onClick={() => editor.chain().focus().deleteColumn().run()} title="Delete column">
                <span className="text-[9px] font-bold leading-none text-red-500">✕col</span>
              </ToolBtn>
              <Divider />
              <span className="text-[10px] text-[#77838f] font-medium px-1 shrink-0">Row:</span>
              <ToolBtn onClick={() => editor.chain().focus().addRowBefore().run()} title="Add row before">
                <span className="text-[9px] font-bold leading-none">▲+</span>
              </ToolBtn>
              <ToolBtn onClick={() => editor.chain().focus().addRowAfter().run()} title="Add row after">
                <span className="text-[9px] font-bold leading-none">+▼</span>
              </ToolBtn>
              <ToolBtn onClick={() => editor.chain().focus().deleteRow().run()} title="Delete row">
                <span className="text-[9px] font-bold leading-none text-red-500">✕row</span>
              </ToolBtn>
              <Divider />
              <ToolBtn
                onClick={() => editor.chain().focus().toggleHeaderRow().run()}
                title="Toggle header row"
                active={false}
              >
                <span className="text-[9px] font-bold leading-none">TH</span>
              </ToolBtn>
              <ToolBtn onClick={() => editor.chain().focus().deleteTable().run()} title="Delete table">
                <Trash2 className="w-3 h-3 text-red-500" />
              </ToolBtn>
            </>
          )}

          <Divider />

          {/* Clear formatting */}
          <ToolBtn onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear Formatting">
            <RemoveFormatting className="w-3.5 h-3.5" />
          </ToolBtn>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={handleImageUpload}
        />

        {/* Editor content */}
        <EditorContent editor={editor} />

        {/* Word/char count */}
        <div className="border-t border-[#e2e8f0] bg-[#f8f9fa] px-3 py-1.5 flex items-center justify-between">
          <span className="text-[11px] text-[#77838f]">{editor.storage.characterCount?.words?.() ?? 0} words</span>
          <span className="text-[11px] text-[#77838f]">
            {editor.storage.characterCount?.characters?.() ?? 0} characters
          </span>
        </div>

        {/* Editor styles */}
        <style jsx global>{`
          .ProseMirror p.is-editor-empty:first-child::before {
            color: #bbb;
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
          }
          .ProseMirror .editor-link {
            color: #eb5905;
            text-decoration: underline;
          }
          .ProseMirror .editor-image {
            max-width: 100%;
            height: auto;
            border-radius: 6px;
            margin: 8px 0;
          }
          .ProseMirror table {
            border-collapse: collapse;
            width: 100%;
            margin: 8px 0;
          }
          .ProseMirror th,
          .ProseMirror td {
            border: 1px solid #e2e8f0;
            padding: 6px 10px;
            text-align: left;
          }
          .ProseMirror th {
            background: #f4f6f9;
            font-weight: 600;
          }
          .ProseMirror .code-block {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 12px 16px;
            border-radius: 6px;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            overflow-x: auto;
          }
          .ProseMirror blockquote {
            border-left: 3px solid #eb5905;
            padding-left: 12px;
            color: #4a5568;
            font-style: italic;
          }
          .ProseMirror hr {
            border: none;
            border-top: 2px solid #e2e8f0;
            margin: 16px 0;
          }
        `}</style>
      </div>

      {/* ── HTML Source Modal ───────────────────────────────────────────────── */}
      {htmlModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl flex flex-col" style={{ maxHeight: '90vh' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#eb5905]" />
                <span className="text-[14px] font-bold text-[#222222]">HTML Source Editor</span>
              </div>
              <button
                type="button"
                onClick={() => setHtmlModalOpen(false)}
                className="p-1.5 rounded hover:bg-[#f4f6f9] text-[#77838f] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Hint */}
            <p className="px-5 py-2 text-[12px] text-[#77838f] bg-[#f8f9fa] border-b border-[#e2e8f0]">
              Paste or write raw HTML — e.g.{' '}
              <code className="font-mono bg-[#e2e8f0] px-1 rounded">{'<table><thead><tr><th>...'}</code>. Click Apply to
              render it in the editor.
            </p>

            {/* Textarea */}
            <textarea
              className="flex-1 font-mono text-[13px] text-[#222222] p-4 resize-none focus:outline-none overflow-auto"
              style={{ minHeight: '360px' }}
              value={htmlSource}
              onChange={(e) => setHtmlSource(e.target.value)}
              spellCheck={false}
              autoComplete="off"
            />

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-[#e2e8f0]">
              <button
                type="button"
                onClick={() => setHtmlModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-[#e2e8f0] text-[13px] text-[#4a5568] hover:bg-[#f4f6f9] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyHtmlSource}
                className="px-4 py-2 rounded-lg bg-[#eb5905] hover:bg-[#d44f04] text-white text-[13px] font-semibold transition cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
