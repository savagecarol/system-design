/** Minimal Markdown → HTML for app privacy/instructions pages. */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function inlineFormat(text: string): string {
  let out = escapeHtml(text)
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>')
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  out = out.replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" rel="noopener noreferrer" target="_blank">$1</a>')
  return out
}

export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const html: string[] = []
  let i = 0
  let inList = false
  let inCode = false
  let codeLines: string[] = []

  function closeList() {
    if (inList) {
      html.push('</ul>')
      inList = false
    }
  }

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('```')) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`)
        codeLines = []
        inCode = false
      } else {
        closeList()
        inCode = true
      }
      i += 1
      continue
    }

    if (inCode) {
      codeLines.push(line)
      i += 1
      continue
    }

    if (!line.trim()) {
      closeList()
      i += 1
      continue
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(line)
    if (heading) {
      closeList()
      const level = heading[1].length
      html.push(`<h${level}>${inlineFormat(heading[2])}</h${level}>`)
      i += 1
      continue
    }

    if (/^[-*]\s+/.test(line)) {
      if (!inList) {
        html.push('<ul>')
        inList = true
      }
      html.push(`<li>${inlineFormat(line.replace(/^[-*]\s+/, ''))}</li>`)
      i += 1
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      closeList()
      // collect ordered list
      html.push('<ol>')
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        html.push(`<li>${inlineFormat(lines[i].replace(/^\d+\.\s+/, ''))}</li>`)
        i += 1
      }
      html.push('</ol>')
      continue
    }

    if (line.trim() === '---') {
      closeList()
      html.push('<hr />')
      i += 1
      continue
    }

    closeList()
    html.push(`<p>${inlineFormat(line)}</p>`)
    i += 1
  }

  closeList()
  if (inCode) {
    html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`)
  }

  return html.join('\n')
}
