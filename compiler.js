// Initialize the Ace code editor
const editor = ace.edit('editor');
editor.setTheme('ace/theme/monokai');
editor.session.setMode('ace/mode/python');

const languageSelector = document.getElementById('language-selector');

languageSelector.addEventListener('change', function () {
  switch (languageSelector.value) {
    case 'python':
      editor.session.setMode('ace/mode/python');
      break;
    case 'java':
      editor.session.setMode('ace/mode/java');
      break;
    case 'html':
      editor.session.setMode('ace/mode/html');
      break;
    case 'javascript':
      editor.session.setMode('ace/mode/javascript');
      break;
  }
});

function runCode() {
  const code = editor.getValue();
  const outputElement = document.getElementById('output');
  outputElement.innerHTML = '';

  switch (languageSelector.value) {
    case 'python':
      runPython(code);
      break;
    case 'java':
      outputElement.innerHTML = 'Java is not supported in the browser.';
      break;
    case 'html':
      runHTML(code);
      break;
    case 'javascript':
      runJavaScript(code);
      break;
  }
}

function runPython(code) {
  Sk.pre = 'output';
  Sk.configure({ output: writeToOutput, read: builtinRead });

  (async function () {
    try {
      await Sk.misceval.AsyncToPromise(Sk.importMainWithBody('<stdin>', false, code, true));
    } catch (error) {
      writeToOutput(error.toString());
    }
  })();

  function writeToOutput(text) {
    const outputElement = document.getElementById('output');
    outputElement.innerHTML += text + '<br>';
  }

  function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x]
