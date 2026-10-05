import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

export const PreserveTableHead = Extension.create({
  name: 'preserveTableHead',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('preserveTableHead'),
        props: {
          handleDOMEvents: {
            paste(view, event) {
              const html = event.clipboardData?.getData('text/html');
              if (!html || !html.includes('<table')) return false;

              // Parse the pasted HTML in a detached document
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');
              const tables = doc.querySelectorAll('table');

              let changed = false;

              tables.forEach((table) => {
                // Collect all <tr> elements regardless of their current parent
                const allRows = Array.from(table.querySelectorAll('tr'));
                if (allRows.length === 0) return;

                // A row is a "header row" if every cell in it is a <th>
                const isHeaderRow = (tr) => {
                  const cells = Array.from(tr.children);
                  return cells.length > 0 && cells.every((c) => c.tagName === 'TH');
                };

                // Split rows into header group and body group
                const headerRows = [];
                const bodyRows = [];
                let headersDone = false;

                allRows.forEach((tr) => {
                  if (!headersDone && isHeaderRow(tr)) {
                    headerRows.push(tr);
                  } else {
                    headersDone = true;
                    bodyRows.push(tr);
                  }
                });

                // Only restructure if we actually found header rows
                if (headerRows.length === 0) return;

                // Remove every existing thead/tbody/tfoot from the table
                Array.from(table.querySelectorAll('thead, tbody, tfoot')).forEach((el) =>
                  el.remove(),
                );

                // Rebuild: thead first, then tbody
                const thead = doc.createElement('thead');
                headerRows.forEach((tr) => thead.appendChild(tr));
                table.appendChild(thead);

                if (bodyRows.length > 0) {
                  const tbody = doc.createElement('tbody');
                  bodyRows.forEach((tr) => tbody.appendChild(tr));
                  table.appendChild(tbody);
                }

                changed = true;
              });

              if (!changed) return false;

              // Re-serialize the corrected HTML
              const correctedHtml = doc.body.innerHTML;

              // Create a new DataTransfer with the fixed HTML and re-dispatch
              const dt = new DataTransfer();
              dt.setData('text/html', correctedHtml);
              dt.setData('text/plain', event.clipboardData?.getData('text/plain') || '');

              const newEvent = new ClipboardEvent('paste', {
                bubbles: true,
                cancelable: true,
                clipboardData: dt,
              });

              // Prevent the original paste, then fire the corrected one
              event.preventDefault();
              event.stopPropagation();

              // Let TipTap handle the corrected paste event
              view.dom.dispatchEvent(newEvent);

              return true; // original event is handled
            },
          },
        },
      }),
    ];
  },
});
