import * as m from 'mithril'
import {TopBar, TopBarButtonAttrs} from './topBar'


type DisplayElement = null | m.Vnode<{}, {}> | Array<m.Vnode<{}, {}>>
interface PageAttrs {
    contents: Array<DisplayElement> | DisplayElement,
    topBarButtons: Array<TopBarButtonAttrs>,
    topBarColor?: string,
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
