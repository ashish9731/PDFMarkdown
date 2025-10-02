/**
 * Converts HTML string to Markdown
 * @param html - HTML string to convert
 * @returns Markdown formatted string
 */
export function htmlToMarkdown(html: string): string {
  if (!html) return '';

  // Create a temporary DOM element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Process the DOM tree recursively
  return processNode(tempDiv);
}

/**
 * Recursively processes DOM nodes and converts them to Markdown
 * @param node - DOM node to process
 * @param depth - Current depth level (for nested lists)
 * @returns Markdown formatted string
 */
function processNode(node: Node, depth = 0): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent || '';
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }

  const element = node as HTMLElement;
  const tagName = element.tagName.toLowerCase();
  const content = Array.from(element.childNodes)
    .map(child => processNode(child, depth))
    .join('');

  switch (tagName) {
    case 'h1':
      return `# ${content.trim()}\n\n`;
    case 'h2':
      return `## ${content.trim()}\n\n`;
    case 'h3':
      return `### ${content.trim()}\n\n`;
    case 'h4':
      return `#### ${content.trim()}\n\n`;
    case 'h5':
      return `##### ${content.trim()}\n\n`;
    case 'h6':
      return `###### ${content.trim()}\n\n`;
    case 'p':
      return `${content.trim()}\n\n`;
    case 'br':
      return '\n';
    case 'hr':
      return '\n---\n\n';
    case 'strong':
    case 'b':
      return `**${content}**`;
    case 'em':
    case 'i':
      return `*${content}*`;
    case 'u':
      return `__${content}__`;
    case 'strike':
    case 'del':
      return `~~${content}~~`;
    case 'a':
      const href = element.getAttribute('href');
      return href ? `[${content}](${href})` : content;
    case 'img':
      const src = element.getAttribute('src');
      const alt = element.getAttribute('alt') || '';
      return src ? `![${alt}](${src})` : '';
    case 'code':
      return `\`${content}\``;
    case 'pre':
      return `
\`\`\`
${content}
\`\`\`

`;
    case 'blockquote':
      // Fix the regex issue by using a string replacement
      const processedContent = content.trim();
      const lines = processedContent.split('\n');
      const quotedLines = lines.map(line => `> ${line}`);
      return `${quotedLines.join('\n')}\n\n`;
    case 'ul':
      return `\n${content}\n`;
    case 'ol':
      return `\n${content}\n`;
    case 'li':
      // Check parent element to determine if it's an ordered or unordered list
      const parentTagName = element.parentElement?.tagName.toLowerCase();
      const prefix = parentTagName === 'ol' ? `${depth + 1}. ` : '- ';
      return `${prefix}${content.trim()}\n`;
    case 'div':
      return `${content}\n`;
    default:
      // For unknown elements, just return the content
      return content;
  }
}

/**
 * Converts simple HTML string to Markdown (basic implementation)
 * @param html - HTML string to convert
 * @returns Markdown formatted string
 */
export function simpleHtmlToMarkdown(html: string): string {
  if (!html) return '';

  return html
    // Headers
    .replace(/<h1[^>]*>/gi, '# ')
    .replace(/<\/h1>/gi, '\n\n')
    .replace(/<h2[^>]*>/gi, '## ')
    .replace(/<\/h2>/gi, '\n\n')
    .replace(/<h3[^>]*>/gi, '### ')
    .replace(/<\/h3>/gi, '\n\n')
    .replace(/<h4[^>]*>/gi, '#### ')
    .replace(/<\/h4>/gi, '\n\n')
    .replace(/<h5[^>]*>/gi, '##### ')
    .replace(/<\/h5>/gi, '\n\n')
    .replace(/<h6[^>]*>/gi, '###### ')
    .replace(/<\/h6>/gi, '\n\n')
    // Paragraphs
    .replace(/<p[^>]*>/gi, '')
    .replace(/<\/p>/gi, '\n\n')
    // Line breaks
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<hr\s*\/?>/gi, '\n\n---\n\n')
    // Bold
    .replace(/<strong[^>]*>/gi, '**')
    .replace(/<\/strong>/gi, '**')
    .replace(/<b[^>]*>/gi, '**')
    .replace(/<\/b>/gi, '**')
    // Italic
    .replace(/<em[^>]*>/gi, '*')
    .replace(/<\/em>/gi, '*')
    .replace(/<i[^>]*>/gi, '*')
    .replace(/<\/i>/gi, '*')
    // Underline
    .replace(/<u[^>]*>/gi, '__')
    .replace(/<\/u>/gi, '__')
    // Strikethrough
    .replace(/<strike[^>]*>/gi, '~~')
    .replace(/<\/strike>/gi, '~~')
    .replace(/<del[^>]*>/gi, '~~')
    .replace(/<\/del>/gi, '~~')
    // Links
    .replace(/<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    // Images
    .replace(/<img\s+src="([^"]+)"(?:\s+alt="([^"]*)")?[^>]*>/gi, '![$2]($1)')
    // Code
    .replace(/<code[^>]*>/gi, '`')
    .replace(/<\/code>/gi, '`')
    .replace(/<pre[^>]*>/gi, '\n```\n')
    .replace(/<\/pre>/gi, '\n```\n')
    // Blockquotes
    .replace(/<blockquote[^>]*>/gi, '\n> ')
    .replace(/<\/blockquote>/gi, '\n\n')
    // Lists
    .replace(/<ul[^>]*>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<ol[^>]*>/gi, '\n')
    .replace(/<\/ol>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<\/li>/gi, '\n')
    // Remove any remaining HTML tags
    .replace(/<[^>]+>/g, '')
    // Clean up extra whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}