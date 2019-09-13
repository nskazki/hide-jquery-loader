'use strict'

const deline = str => str.replace(/[\r\n]/g, ' ').replace(/\s{2,}/g, ' ')

module.exports = function hideJqueryLoader(source) {
  this.cacheable()
  const shotOrigName = '__hjl_shorOrig'
  const fullOrigName = '__hjl_fullOrig'
  const windowRefName = '__hjl_windowRef'

  const header = deline(`
    /* HIDE JQUERY LOADER -- HEADER */
    var ${windowRefName} = typeof window !== 'undefined' ? window : {};
    var ${shotOrigName} = ${windowRefName}.$;
    var ${fullOrigName} = ${windowRefName}.jQuery;
    ${windowRefName}.$ = undefined;
    ${windowRefName}.jQuery = undefined;`)

  const footer = deline(`
    /* HIDE JQUERY LOADER -- FOOTER */
    ${windowRefName}.$ = ${shotOrigName};
    ${windowRefName}.jQuery = ${fullOrigName};`)

  return `${header} ${source}; ${footer}`
}
