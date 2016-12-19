const nodeList = []
const ctx = '@@clickoutsideContext'

document.addEventListener('click', e => {
  for (let node of nodeList) {
    node[ctx].documentHandler(e)
  }
})

export default {
  bind: function (el, binding, vnode) {
    const id = nodeList.push(el) - 1
    const documentHandler = function (e) {
      if (
        !vnode.context ||
        el.contains(e.target) ||
        (vnode.context.popperElm &&
         vnode.context.popperElm.contains(e.target))) {
        return
      }
      if (
        binding.expression &&
        el[ctx].methodName &&
        vnode.context[el[ctx].methodName]) {
        vnode.context[el[ctx].methodName]()
      } else {
        el[ctx].bindingFn && el[ctx].bindingFn()
      }
    }
    el[ctx] = {
      id,
      documentHandler,
      methodName: binding.expression,
      bindingFn: binding.value
    }
  },
  update: function (el, binding) {
    el[ctx].methodName = binding.expression
    el[ctx].bindingFn = binding.value
  },
  unbind: function (el, binding) {
    let len = nodeList.length
    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1)
        break
      }
    }
  }
}
