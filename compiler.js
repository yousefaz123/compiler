// Initialize the Ace code editor
const editor = ace.edit('editor');
editor.setTheme('ace/theme/monokai');
editor.session.setMode('ace/mode/python');

function runCode() {
  const code = editor.getValue();
  const outputElement = document.getElementById('output');
  outputElement.innerHTML = '';

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
    if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined) {
      throw 'File not found: \'' + x + '\'';
    }
    return Sk.builtinFiles['files'][x];
  }
}
