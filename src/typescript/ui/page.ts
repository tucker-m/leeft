import * as m from 'mithril'
import {TopBar, TopBarButtonAttrs} from './topBar'


type DisplayElement = null | m.Vnode<{}, {}> | Array<m.Vnode<{}, {}>>
interface PageAttrs {
    contents: Array<DisplayElement> | DisplayElement,
    topBarButtons: Array<TopBarButtonAttrs>,
    topBarColor?: string,
    css: any,
    overlay?: DisplayElement | null,
    setOverlay?: (overlayContent) => void,
}

interface PageComponent {
    attrs: PageAttrs,
}

const PageComponent = (vnode: PageComponent) => {
    const css = vnode.attrs.css
    return {
        view: (vnode: PageComponent) => {
            return m('div', [
                vnode.attrs.overlay
                    ? m('div', {class: vnode.attrs.css.fullScreenOverlay}, [
                        vnode.attrs.overlay,
                        m('button', {
                            onclick: () => {
                                if (vnode.attrs.setOverlay) {
                                    vnode.attrs.setOverlay(null)
                                }
                            }
                        }, 'Done')
                    ])
                    : null,
                TopBar({buttons: vnode.attrs.topBarButtons, color: vnode.attrs.topBarColor, css: css}),
                m('div', {
                    class: css.constraint
                }, vnode.attrs.contents)
            ])
        }
    }
}

export default (attrs: PageAttrs) => {
    return m(PageComponent, attrs)
}
