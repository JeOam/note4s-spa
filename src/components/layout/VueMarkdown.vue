<template>
  <div><slot></slot></div>
</template>
<script>
import MarkdownIt from 'markdown-it'
import toc from 'markdown-it-toc-and-anchor'
import highlight from 'markdown-it-highlightjs'

export default {
  props: {
    source: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: true
    },
    html: {
      type: Boolean,
      default: true
    },
    xhtmlOut: {
      type: Boolean,
      default: true
    },
    breaks: {
      type: Boolean,
      default: true
    },
    linkify: {
      type: Boolean,
      default: true
    },
    typographer: {
      type: Boolean,
      default: true
    },
    langPrefix: {
      type: String,
      default: 'language-'
    },
    quotes: {
      type: String,
      default: '“”‘’'
    },
    tableClass: {
      type: String,
      default: ''
    },
    toc: {
      type: Boolean,
      default: false
    },
    tocId: {
      type: String
    },
    tocClass: {
      type: String,
      default: 'table-of-contents'
    },
    tocFirstLevel: {
      type: Number,
      default: 2
    },
    tocLastLevel: {
      type: Number,
      default: 1
    },
    tocAnchorLink: {
      type: Boolean,
      default: true
    },
    tocAnchorClass: {
      type: String,
      default: 'toc-anchor'
    },
    tocAnchorLinkSymbol: {
      type: String,
      default: '#'
    },
    tocAnchorLinkSpace: {
      type: Boolean,
      default: true
    },
    tocAnchorLinkClass: {
      type: String,
      default: 'toc-anchor-link'
    }
  },
  watch: {
    'source': function () {
      this.reload()
    },
    'show': function () {
      this.reload()
    },
    'toc': function () {
      this.reload()
    }
  },
  methods: {
    reload: function () {
      let md = new MarkdownIt().use(highlight)
      md.set({
        html: this.html,
        xhtmlOut: this.xhtmlOut,
        breaks: this.breaks,
        linkify: this.linkify,
        typographer: this.typographer,
        langPrefix: this.langPrefix,
        quotes: this.quotes
      })
      md.renderer.rules.table_open = () => `<table class="${this.tableClass}">\n`
      if (!this.tocLastLevel) this.tocLastLevel = this.tocFirstLevel + 1
      if (this.toc) {
        md.use(toc, {
          tocClassName: this.tocClass,
          tocFirstLevel: this.tocFirstLevel,
          tocLastLevel: this.tocLastLevel,
          anchorLink: this.tocAnchorLink,
          anchorLinkSymbol: this.tocAnchorLinkSymbol,
          anchorLinkSpace: this.tocAnchorLinkSpace,
          anchorClassName: this.tocAnchorClass,
          anchorLinkSymbolClassName: this.tocAnchorLinkClass,
          tocCallback: (tocMarkdown, tocArray, tocHtml) => {
            if (tocHtml) {
              if (this.tocId && document.getElementById(this.tocId)) {
                document.getElementById(this.tocId).innerHTML = tocHtml
              }
            }
          }
        })
      } else if (this.tocId && document.getElementById(this.tocId)) {
        document.getElementById(this.tocId).innerHTML = ''
      }
      const outHtml = this.show ? md.render(this.source) : ''
      this.$el.innerHTML = outHtml
    }
  },
  mounted: function () {
    this.reload()
  }
}
</script>
