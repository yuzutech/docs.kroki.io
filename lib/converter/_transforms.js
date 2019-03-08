module.exports = (self) => {
  return {
    listing: (node) => {
      let preStart
      let preEnd
      let codeAttrs
      const nowrap = !(node.getDocument().getAttribute('prewrap')) || (node.isOption('nowrap'))
      if (node.getStyle() === 'source') {
        const language = node.getAttribute('language', undefined, false)
        if (language) {
          codeAttrs = ` class="language-${language}" data-lang=${language}`
        } else {
          codeAttrs = ''
        }
        const dataLine = node.getAttribute('callout-lines') ? ` data-line="${node.getAttribute('callout-lines')}"` : ''
        const preClass = ` class="${nowrap ? 'nowrap' : ''}"${dataLine}`
        preStart = `<pre${preClass}><code${codeAttrs}>`
        preEnd = '</code></pre>'
      } else {
        preStart = `<pre${nowrap ? ' class="nowrap"' : ''}>`
        preEnd = '</pre>'
      }
      const titleElement = node.getTitle() ? `<div class="listing-title">${node.getCaptionedTitle()}</div>\n` : ''
      const idAttribute = node.getId() ? ` id="${node.getId()}"` : ''
      return `<div${idAttribute} class="listingblock${node.getRole() ? node.getRole() : ''}">
${titleElement}<div class="content">
${preStart}${node.getContent()}${preEnd}
</div>
</div>`
    },
    colist: (node) => {
      const result = []
      const idAttribute = node.getId() ? ` id="${node.getId()}"` : ''
      let classes = ['colist']
      if (node.getStyle()) {
        classes = classes.concat(node.getStyle())
      }
      if (node.getRole()) {
        classes = classes.concat(node.getRole())
      }
      const classAttribute = ` class="${classes.join(' ')}"`
      result.push(`<div${idAttribute}${classAttribute}>`)
      if (node.getTitle()) {
        result.push(`<div class="title">${node.getTitle()}</div>`)
      }
      if (node.getDocument().hasAttribute('icons')) {
        result.push('<table>')
        let num = 0
        let numLabel
        node.getItems().forEach((item) => {
          num += 1
          numLabel = `<i class="conum" data-value="${num}"></i><b>${num}</b>`
          result.push(`<tr>
          <td>${numLabel}</td>
          <td>${item.getText()}${item['$blocks?']() ? `\n ${item.getContent()}` : ''}</td>
          </tr>`)
        })
        result.push('</table>')
      } else {
        result.push('<ol>')

        node.getItems().forEach((item) => {
          result.push(`<li>
<p>${item.getText()}</p>${item['$blocks?']() ? `\n ${item.getContent()}` : ''}`)
        })
        result.push('</ol>')
      }
      result.push('</div>')
      return result.join('\n')
    },
    inline_callout: (node) => {
      return `<i class="conum" data-value="${node.text}"></i>`
    }
  }
}
