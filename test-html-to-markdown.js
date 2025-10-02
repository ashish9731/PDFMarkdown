// Simple test for HTML to Markdown conversion
const { simpleHtmlToMarkdown } = require('./lib/html-to-markdown');

// Test cases
const testCases = [
  {
    name: 'Headers',
    html: '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>',
    expected: '# Heading 1\n\n## Heading 2\n\n### Heading 3\n\n'
  },
  {
    name: 'Paragraphs',
    html: '<p>Paragraph 1</p><p>Paragraph 2</p>',
    expected: 'Paragraph 1\n\nParagraph 2\n\n'
  },
  {
    name: 'Bold and italic',
    html: '<p>This is <strong>bold</strong> and this is <em>italic</em>.</p>',
    expected: 'This is **bold** and this is *italic*.\n\n'
  },
  {
    name: 'Links',
    html: '<p>Visit <a href="https://example.com">Example</a> for more info.</p>',
    expected: 'Visit [Example](https://example.com) for more info.\n\n'
  }
];

// Run tests
testCases.forEach(testCase => {
  const result = simpleHtmlToMarkdown(testCase.html);
  const passed = result === testCase.expected;
  
  console.log(`Test: ${testCase.name}`);
  console.log(`Expected: ${JSON.stringify(testCase.expected)}`);
  console.log(`Actual: ${JSON.stringify(result)}`);
  console.log(`Status: ${passed ? 'PASS' : 'FAIL'}\n`);
});