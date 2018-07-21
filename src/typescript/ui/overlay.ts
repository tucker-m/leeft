import * as m from 'mithril'

interface OverlayAttrs {
    content: any,
    title: string,
    bottomContent?: any,
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
            }, [
                m('div', {
                    class: css.overlayTitleBar,
                }, m('h3', {
                    class: css.h3
                }, vnode.attrs.title)),
                m('div', {
                    class: css.overlayContentContainer,
                }, vnode.attrs.content),
                vnode.attrs.bottomContent ?
                    m('div', {
                        class: css.overlayBottomBar,
                    }, vnode.attrs.bottomContent)
                    :null,
            ]))
        }
    }
}

export default (attrs: OverlayAttrs) => {
    return m(OverlayComponent, attrs)
}
