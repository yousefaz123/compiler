const editor = ace.edit('editor');
editor.setTheme('ace/theme/monokai');
editor.session.setMode('ace/mode/javascript');

function compileAndRun() {
  const userCode = editor.getValue();
  const compiledCode = compileCodeForEditorX(userCode);
  addCompiledCodeToIFrame(compiledCode);
}

function compileCodeForEditorX(code) {
  return 'data:text/html;charset=utf-8,' + encodeURIComponent('<script>' + code + '</script>');
}

function addCompiledCodeToIFrame(compiledCode) {
  const iFrame = document.getElementById('output');
  iFrame.src = compiledCode;
}
