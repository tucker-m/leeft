import * as m from 'mithril'
import u from '../helpers/utils'
import {TopBarButton} from '../types/components'
import {NamedObject, Saveable} from '../types/exercise'

interface TopBarButtonAttrs {
    text: string,
    action: () => void,
    secondState?: {
        text: string,
        action: () => void,
    }
}

interface TopBarAttrs {
    buttons: Array<TopBarButtonAttrs>,
    subTitle?: {
	text: string,
	url?: string,
    },
    css: any,
    editButtonShowing?: boolean,
}

interface TopBarVnode {
    attrs: TopBarAttrs,
}

const TopBarComponent = (vnode: TopBarVnode) => {
    const css = vnode.attrs.css
    return {
        view: (vnode: TopBarVnode) => {
            const buttons = vnode.attrs.buttons.map((buttonAttr) => {
                let attrs = {
                    text: buttonAttr.text,
                    action: buttonAttr.action,
                    css: css,
                }
                if (buttonAttr.secondState) {
                    attrs['secondState'] = {
                        text: buttonAttr.secondState.text,
                        action: buttonAttr.secondState.action,
                    }
                }
                return TopBarButton(attrs)
            })

	    let subTitleElement
	    const subTitle = vnode.attrs.subTitle
	    const beingEdited = vnode.attrs.editButtonShowing
	    if (subTitle) {
		if (subTitle.url) {
		    subTitleElement = m('a', {
			href: subTitle.url,
			oncreate: m.route.link,
		    }, subTitle.text)
		}
		else {
		    subTitleElement = m('span', subTitle.text)
		}
	    }

	    return m('div', [
                m('div', {
                    class: u.c(
                        css.alignment,
			css.topBar,
                    ),
                }, [
		    subTitleElement ? m('div', {class: css.topBarSubTitle}, subTitleElement) : null,
		    m('div', {
			class: css.topBarHeadingContainer
		    }, [
			m('div', buttons),
		    ]),
		])
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
