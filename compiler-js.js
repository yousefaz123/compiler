// Initialize the Ace code editor
const editor = ace.edit('editor');
editor.setTheme('ace/theme/monokai');
editor.session.setMode('ace/mode/html');

function runCode() {
  const code = editor.getValue();
  const outputElement = document.getElementById('output');
  outputElement.innerHTML = code;
}
