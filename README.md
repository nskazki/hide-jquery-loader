# hide-jquery-loader

Simplest way to protect your angular@1.x.x widget from unpredictable legacy.

For example:
 - jqLite: `anguler.element('<div class="foo"'/>).removeClass().hasClass('foo') === true`
 - jQuery@1.8.3: `anguler.element('<div class="foo"'/>).removeClass().hasClass('foo') === false`

```
yarn -D hide-jquery-loader
```

part of **webpack.config.js**

```js
const { sync: moduleResolve } = require('resolve')
const { resolve: pathResolve } = require('path')

const widgetResolve = (...p) => pathResolve(__dirname, 'widget/project/dir', ...p)
const widgetModule = (name) => moduleResolve(name, { basedir: widgetResolve() })

module.exports = {
  module: {
    loaders: [{
      include: [
        widgetModule('angular')
      ],
      loader: 'hide-jquery-loader'
    }]
  }
}
```
