/**
 * fixTableHtml
 *
 * TipTap/ProseMirror's internal table schema has no concept of <thead>/<tbody>
 * — it stores every row in a flat structure and serialises them all into <tbody>.
 *
 * This function post-processes the HTML string that TipTap produces and
 * restores <thead> for any table whose first row is made up entirely of <th>
 * cells, so the saved content renders correctly on the frontend.
 *
 * Runs in the browser (DOMParser) before the payload is sent to the API.
 */
export function fixTableHtml(html) {
  if (!html || !html.includes('<table')) return html;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  doc.querySelectorAll('table').forEach((table) => {
    // If a real <thead> already exists and has rows, nothing to do.
    if (table.querySelector('thead tr')) return;

    // Find the very first <tr> regardless of its current parent.
    const firstRow = table.querySelector('tr');
    if (!firstRow) return;

    // Check whether every cell in that row is a <th>.
    const cells = Array.from(firstRow.children);
    const allTh = cells.length > 0 && cells.every((c) => c.tagName === 'TH');
    if (!allTh) return;

    // Move the first row into a new <thead>, placed before the first <tbody>.
    const thead = doc.createElement('thead');
    const tbody = table.querySelector('tbody');

    firstRow.parentNode.removeChild(firstRow);
    thead.appendChild(firstRow);

    if (tbody) {
      table.insertBefore(thead, tbody);
    } else {
      table.prepend(thead);
    }
  });

  return doc.body.innerHTML;
}
