const baseConverter = require('@antora/asciidoc-loader/lib/converter/html5')

function createConverter (callbacks) {
  class DocumentationConverter {
    constructor () {
      this.baseConverter = baseConverter.$new('html5', undefined, callbacks)
    }

    $convert (node, transform, opts) {
      const transforms = require('./converter/_transforms')(this)
      const transformer = transforms[transform || node.node_name]
      if (transformer) {
        return transformer(node)
      }
      return this.baseConverter.$convert(node, transform, opts)
    }
  }

  return new DocumentationConverter()
}

module.exports = createConverter
