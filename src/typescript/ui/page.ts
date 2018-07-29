import * as m from 'mithril'
import {TopBar, TopBarButtonAttrs} from './topBar'


type DisplayElement = null | m.Vnode<{}, {}> | Array<m.Vnode<{}, {}>>
interface PageAttrs {
    contents: Array<DisplayElement> | DisplayElement,
    topBarButtons: Array<TopBarButtonAttrs>,
    css: any,
}

interface PageComponent {
    attrs: PageAttrs,
}

const PageComponent = (vnode: PageComponent) => {
    const css = vnode.attrs.css
    return {
        view: (vnode: PageComponent) => {
            return m('div', [
                TopBar({buttons: vnode.attrs.topBarButtons, css: css}),
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
