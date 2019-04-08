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
	    const tag = 'h' + vnode.attrs.level
            let name = vnode.attrs.name
            let className = css.editableH1
            if (!name) {
                name = vnode.attrs.placeholder
                className = css.placeholderEditableH1
            }
            return m('span', {
                class: `${css[tag]}`
            }, [
                Heading({level: vnode.attrs.level, text: name, classes: [className]}),
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
