import * as m from 'mithril'
import {TopBar, TopBarButtonAttrs} from './topBar'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../../styles'

jss.setup(preset())
const {classes} = jss.createStyleSheet(style.main).attach()

type DisplayElement = null | m.Vnode<{}, {}> | Array<m.Vnode<{}, {}>>
interface PageAttrs {
    contents: Array<DisplayElement>,
    topBarButtons: Array<TopBarButtonAttrs>,
    topBarColor?: string,
}
interface PageComponent {
    attrs: PageAttrs,
}

const PageComponent = (vnode: PageComponent) => {
    return {
        view: (vnode: PageComponent) => {
            return m('div', [
                TopBar({buttons: vnode.attrs.topBarButtons, color: vnode.attrs.topBarColor}),
                m('div', {
                    class: classes.constraint
                }, vnode.attrs.contents)
            ])
        }
    }
}

export default (attrs: PageAttrs) => {
    return m(PageComponent, attrs)
}
