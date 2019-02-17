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
    bottomButtons?: Array<TopBarButtonAttrs>,
    css: any,
    editOptions?: {
	editButtonShowing: boolean,
	openModal: () => void,
    }
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

	    let bottomButtons
	    if (vnode.attrs.bottomButtons) {
		bottomButtons = vnode.attrs.bottomButtons.map((buttonAttr) => {
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
		    return m('button', {
			class: `${css.hollowButton} ${css.small}`,
			onclick: attrs.action,
		    }, attrs.text)
		})
	    }

	    let subTitleElement
	    const subTitle = vnode.attrs.subTitle
	    const beingEdited = vnode.attrs.editOptions && vnode.attrs.editOptions.editButtonShowing
	    if (!beingEdited && subTitle) {
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
                        css.main,
			css.topBar,
                    ),
                }, [
		    subTitleElement ? m('div', {class: css.topBarSubTitle}, subTitleElement) : null,
		    bottomButtons && beingEdited
			? m('div', {class: css.bottomButtons}, bottomButtons)
			: null,
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
