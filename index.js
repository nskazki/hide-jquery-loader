'use strict'

const deline = str => str.replace(/[\r\n]/g, ' ').replace(/\s{2,}/g, ' ')

module.exports = function hideJqueryLoader(source) {
  this.cacheable()
  const $Orig = '__hide_jquery_loader_$__orig'
  const jQueryOrig = '__hide_jquery_loader_jQuery__orig'

  const header = deline(`
    /* HIDE JQUERY LOADER HEADER -- https://github.com/nskazki/hide-jquery-loader */
    var _window;
    try { _window = Function('return this')() || (42, eval)('this'); }
    catch (_err) { _window = window || global || GLOBAL || {}; }

    var ${$Orig} = _window.$;
    var ${jQueryOrig} = _window.jQuery;
    _window.$ = undefined;
    _window.jQuery = undefined;`)

  const footer = deline(`
    /* HIDE JQUERY LOADER FOOTER -- https://github.com/nskazki/hide-jquery-loader */
    _window.$ = ${$Orig};
    _window.jQuery = ${jQueryOrig};`)

  return `${header} ${source}; ${footer}`
}
