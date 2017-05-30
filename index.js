'use strict'

let _uniqueId = 0
const uniqueId = () => ++_uniqueId

module.exports = function hideJqueryLoader(source) {
  this.cacheable()
  const $Orig = `__$__orig__${uniqueId()}`
  const jQueryOrig = `__jQuery__orig__${uniqueId()}`

  return `
/* HIDE JQUERY LOADER -- https://github.com/nskazki/hide-jquery-loader */

var ${$Orig} = window.$;
var ${jQueryOrig} = window.jQuery;
delete window.$;
delete window.jQuery;

${source};

window.$ = ${$Orig};
window.jQuery = ${jQueryOrig};`
}
