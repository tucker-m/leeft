import * as m from 'mithril'
import utils from '../helpers/utils'
import H1 from './h1'

interface EditableVnode {
    attrs: {
        name: string,
        placeholder: string,
        showEditButton: boolean,
        css: any,
        setOverlay?: () => void,
    }
}

const EditableH1 = function(vnode: EditableVnode) {
    const css = vnode.attrs.css
    return {
        view: function(vnode: EditableVnode) {
            let name = vnode.attrs.name
            let className = css.editableH1
            if (!name) {
                name = vnode.attrs.placeholder
                className = css.placeholderEditableH1
            }
            return m('div', {
                class: css.editableH1
            }, [
                H1({text: name, classes: [className]}),
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
    return m(EditableH1, attrs)
}
