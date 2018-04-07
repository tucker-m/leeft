import * as m from 'mithril'
import utils from '../helpers/utils'
import {TopBarButton} from '../types/components'

interface TopBarButtonAttrs {
    text: string,
    action: () => void,
    secondState?: {
        text: string,
        action: () => void,
        color: string,
    }
}

interface TopBarAttrs {
    buttons: Array<TopBarButtonAttrs>,
    color?: string,
    css: any,
}

interface TopBarVnode {
    attrs: TopBarAttrs,
}

const TopBarComponent = (vnode: TopBarVnode) => {
    let currentColor = ''
    let defaultColor = ''
    if (vnode.attrs.color) {
        currentColor= vnode.attrs.color
        defaultColor = vnode.attrs.color
    }
    const css = vnode.attrs.css
    return {
        view: (vnode: TopBarVnode) => {
            const buttons = m('div', vnode.attrs.buttons.map((buttonAttr) => {
                let attrs = {
                    text: buttonAttr.text,
                    action: buttonAttr.action,
                    setColor: (color: string) => {
                        currentColor = color ? color : defaultColor
                    },
                    css: css,
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
                    class: css.headerSection,
                }, m('a', {
                    href: '/',
                    oncreate: m.route.link,
                }, 'Home')),
                m('div', {
                    class: utils.combineStyles([
                        css.alignment,
                        css.main,
                    ]),
                    style: currentColor ? `background-color: ${currentColor}` : '',
                }, m('div', {
                    class: css.constraint,
                }, buttons))
            ])
        }
    }
}

const TopBar = (attrs: TopBarAttrs) => {
    return m(TopBarComponent, attrs)
}

export {
    TopBar,
    TopBarButtonAttrs,
}
