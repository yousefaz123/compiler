// Initialize the Ace code editor
const editor = ace.edit('editor');
editor.setTheme('ace/theme/monokai');
editor.session.setMode('ace/mode/java');

function runCode() {
  const code = editor.getValue();
  const outputElement = document.getElementById('output');
  outputElement.innerHTML = '';

  try {
    eval(code);
  } catch (error) {
    outputElement.innerHTML = error.toString();
  }
}
