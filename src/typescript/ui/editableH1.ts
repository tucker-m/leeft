import * as m from 'mithril'
import utils from '../helpers/utils'
import H1 from './h1'

interface EditableVnode {
    attrs: {
        name: string,
        placeholder: string,
        updateFunc: (newName: string) => void,
        showEditButton: boolean,
        css: any,
        showOverlayContent?: (show: boolean) => void,
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
                class: utils.combineStyles([
                    vnode.attrs.showEditButton ? 'editable-showing' : '',
                    css.editableH1,
                ])
            }, [
                H1({text: name, classes: [className], css: css}),
                vnode.attrs.showEditButton
                    ? m('button', {
                        onclick: () => {
                            if (vnode.attrs.showOverlayContent) {
                                vnode.attrs.showOverlayContent(true)
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
