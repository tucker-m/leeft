import * as m from 'mithril'

interface OverlayAttrs {
    content: any,
    css: any,
}
interface OverlayComponentVnode {
    attrs: OverlayAttrs
}

const OverlayComponent = (vnode: OverlayComponentVnode) => {
    const css = vnode.attrs.css
    return {
        view: (vnode: OverlayComponentVnode) => {
            return m('div', {
                class: css.fullScreenOverlay,
            }, m('div', {
                class: css.fullScreenOverlayContent,
            }, vnode.attrs.content))
        }
    }
}

export default (attrs: OverlayAttrs) => {
    return m(OverlayComponent, attrs)
}
