import * as m from 'mithril'
import {TopBar, TopBarButtonAttrs} from './topBar'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../../styles'

jss.setup(preset())
const {classes} = jss.createStyleSheet(style.main).attach()

interface PageAttrs {
    contents: Array<m.Vnode<{}, {}>>,
    topBarButtons: Array<TopBarButtonAttrs>,
}
interface PageComponent {
    attrs: PageAttrs,
}

const PageComponent = (vnode: PageComponent) => {
    return {
        view: (vnode: PageComponent) => {
            return m('div', [
                TopBar({buttons: vnode.attrs.topBarButtons}),
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
