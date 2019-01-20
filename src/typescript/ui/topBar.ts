import * as m from 'mithril'
import utils from '../helpers/utils'
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
    obj: NamedObject & Saveable,
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
            const buttons = m('div', vnode.attrs.buttons.map((buttonAttr) => {
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
            }))

	    const titleInfo = utils.getNameAndClasses(vnode.attrs.obj, css)

            return m('div', [
                m('div', {
                    class: utils.combineStyles([
                        css.alignment,
                        css.main,
			css.topBar,
                    ]),
                }, [
		    m('div', {
			class: css.topBarHeadingContainer
		    }, [
			m('h1', {class: titleInfo.classes + ' ' + css.topBarH1}, titleInfo.name),
			vnode.attrs.editOptions
			    ? (vnode.attrs.editOptions.editButtonShowing
			       ? m('button', {
				   onclick: vnode.attrs.editOptions.openModal,
				   class: `${css.topBarButton}`,
			       }, 'Edit Name')
			       : null)
			    : null,
		    ]),
		    m('div', buttons)
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
