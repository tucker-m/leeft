import * as m from 'mithril'
import Overlay from '../ui/overlay'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../../styles'

interface PageDefaultAttrs {
    css: any,
    editButtonShowing: boolean,
    setOverlay: (content: any, attrs: any) => void,
}

interface PageAttrs {
    contents: {
	component: m.FactoryComponent<any>,
	attrs: any,
    },
    pageEditable: boolean,
}

interface PageComponent {
    attrs: PageAttrs,
}

const PageComponent = (vnode: PageComponent) => {
    jss.setup(preset())
    const {classes: css} = jss.createStyleSheet(style).attach()

    let editButtonShowing = !!vnode.attrs.pageEditable || false 

    const showEditButton = show => {
	editButtonShowing = show
    }

    let overlay: {component: null | any, title: string} = {component: null, title: ''}
    let overlayAttrs = {}

    const setOverlay = (overlayToShow, attrs) => {
        overlay = overlayToShow
        overlayAttrs = attrs
    }

    return {
        view: (vnode: PageComponent) => {
	    const overlayComponent = overlay
	    let combinedContents = vnode.attrs.contents.attrs
	    combinedContents['css'] = css
	    combinedContents['editButtonShowing'] = editButtonShowing

            return m('div', [
		overlayComponent.component ?
                    Overlay({
                        content: m(overlayComponent.component, overlayAttrs),
                        title: overlayComponent.title,
                        css,
                    })
                    : null,
                m('div', {
                    class: `${css.constraint}`
                }, m(vnode.attrs.contents.component, combinedContents))
            ])
        }
    }
}

const RenderPage = (attrs: PageAttrs) => {
    return m(PageComponent, attrs)
}

export {
    RenderPage,
    PageDefaultAttrs
}
