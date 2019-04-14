import * as m from 'mithril'
import Heading from './heading'

interface EditableVnode {
    attrs: {
	level: number,
        name: string,
        placeholder: string,
        showEditButton: boolean,
        css: any,
        setOverlay?: () => void,
    }
}

const EditableHeading = function(vnode: EditableVnode) {
    const css = vnode.attrs.css
    return {
        view: function(vnode: EditableVnode) {
            let name = vnode.attrs.name
            if (!name) {
                name = vnode.attrs.placeholder
            }
            return m('span', {
                class: css.editableHeading
            }, [
                Heading({
		    level: vnode.attrs.level,
		    text: name,
		    css,
		    classes: !vnode.attrs.name ? [css.placeholderHeading] : []
		}),
                vnode.attrs.showEditButton
                    ? m('button', {
                        class: `${css.hollowButton} ${css.small}`,
                        onclick: () => {
                            if (vnode.attrs.setOverlay) {
                                vnode.attrs.setOverlay()
                            }
                        }
                    }, 'Edit')
                    : null
                ],
            )
        }
    }
}

export default function(attrs: EditableVnode['attrs']) {
    return m(EditableHeading, attrs)
}
