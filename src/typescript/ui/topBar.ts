import * as m from 'mithril'
import style from '../../styles'
import jss from 'jss'
import preset from 'jss-preset-default'
import utils from '../helpers/utils'
import {TopBarButton, TopBarButtonAttrs} from '../types/components'

interface TopBarAttrs {
    buttons: Array<{
        text: string,
        action: () => void,
        secondState?: {
            text: string,
            action: () => void,
            color: string,
        }
    }>,
    color?: string,
}

interface TopBarVnode {
    attrs: TopBarAttrs,
}

jss.setup(preset())
const {classes} = jss.createStyleSheet(style.topBar).attach()
const {classes: main} = jss.createStyleSheet(style.main).attach()

const TopBarComponent = (vnode: TopBarVnode) => {
    let currentColor = ''
    let defaultColor = ''
    if (vnode.attrs.color) {
        currentColor= vnode.attrs.color
        defaultColor = vnode.attrs.color
    }

    return {
        view: (vnode: TopBarVnode) => {
            const buttons = m('div', vnode.attrs.buttons.map((buttonAttr) => {
                let attrs = {
                    text: buttonAttr.text,
                    action: buttonAttr.action,
                    setColor: (color: string) => {
                        currentColor = color ? color : defaultColor
                    }
                }
                if (buttonAttr.secondState) {
                    attrs['secondState'] = {
                        text: buttonAttr.secondState.text,
                        action: buttonAttr.secondState.action,
                        color: buttonAttr.secondState.color,
                    }
                }
                return TopBarButton(attrs)
            }))

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
                    ]),
                    style: currentColor ? `background-color: ${currentColor}` : '',
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
