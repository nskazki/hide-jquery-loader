'use strict'

let _uniqueId = 0
const uniqueId = () => ++_uniqueId
const deline = str => str.replace(/[\r\n]/g, ' ').replace(/\s{2,}/g, ' ')

module.exports = function hideJqueryLoader(source) {
  this.cacheable()
  const $Orig = `__$__orig__${uniqueId()}`
  const jQueryOrig = `__jQuery__orig__${uniqueId()}`

  const header = deline(`
    /* HIDE JQUERY LOADER HEADER -- https://github.com/nskazki/hide-jquery-loader */
    var _window;
    try { _window = Function('return this')() || (42, eval)('this'); }
    catch (_err) { _window = window || global || GLOBAL || {}; }

    var ${$Orig} = _window.$;
    var ${jQueryOrig} = _window.jQuery;
    delete _window.$;
    delete _window.jQuery;`)

  const footer = deline(`
    /* HIDE JQUERY LOADER FOOTER -- https://github.com/nskazki/hide-jquery-loader */
    _window.$ = ${$Orig};
    _window.jQuery = ${jQueryOrig};`)

  return `${header} ${source}; ${footer}`
}
