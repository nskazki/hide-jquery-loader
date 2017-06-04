'use strict'

let _uniqueId = 0
const uniqueId = () => ++_uniqueId

module.exports = function hideJqueryLoader(source) {
  this.cacheable()
  const $Orig = `__$__orig__${uniqueId()}`
  const jQueryOrig = `__jQuery__orig__${uniqueId()}`

  return `
/* HIDE JQUERY LOADER -- https://github.com/nskazki/hide-jquery-loader */

var _window
try { _window = Function('return this')() || (42, eval)('this'); }
catch (_err) { _window = window || global || GLOBAL || {}; }

var ${$Orig} = _window.$;
var ${jQueryOrig} = _window.jQuery;
delete _window.$;
delete _window.jQuery;

${source};

_window.$ = ${$Orig};
_window.jQuery = ${jQueryOrig};`
}
