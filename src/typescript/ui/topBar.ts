import * as m from 'mithril'
import style from '../../styles'
import jss from 'jss'
import preset from 'jss-preset-default'
import utils from '../helpers/utils'

interface TopBarAttrs {
    buttons: Array<any>,
}

interface TopBarVnode {
    attrs: TopBarAttrs,
}

jss.setup(preset())
const {classes} = jss.createStyleSheet(style.topBar).attach()
const {classes: main} = jss.createStyleSheet(style.main).attach()

const TopBarComponent = (vnode: TopBarVnode) => {
    let editEnabled = false
    let currentColor = ''

    return {
        view: (vnode: TopBarVnode) => {
            const buttons = m('div', vnode.attrs.buttons)

            return m('div', [
                m('div', {
                    class: classes.headerSection,
                }, m('a', {
                    href: '/',
                    oncreate: m.route.link,
                }, 'Home')),
                m('div', {
                    class: utils.combineStyles([
                        classes.alignment,
                        classes.main,
                        (editEnabled ? classes.beingEdited : ''),
                    ]),
                }, m('div', {
                    class: main.constraint,
                }, buttons))
            ])
        }
    }
}

export default (attrs: TopBarAttrs) => {
    return m(TopBarComponent, attrs)
}
