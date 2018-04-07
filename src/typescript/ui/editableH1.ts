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
    }
}

const EditableH1 = function(vnode: EditableVnode) {
    let beingEdited = false
    const css = vnode.attrs.css
    return {
        view: function(vnode: EditableVnode) {
            let name = vnode.attrs.name
            let className = css.editableH1
            if (!name) {
                name = vnode.attrs.placeholder
                className = css.placeholderEditableH1
            }
            return m('div.editable-h1', {
                class: utils.combineStyles([
                    beingEdited ? 'being-edited' : '',
                    vnode.attrs.showEditButton ? 'editable-showing' : '',
                ])
            }, [
                !beingEdited ?
                    m('div', [
                        H1({text: name, classes: [className], css: css}),
                        vnode.attrs.showEditButton
                            ? m('button', {
                                onclick: () => { beingEdited = true }
                            }, 'Edit')
                        : null
                    ])
                : m('div', [
                    m('input[type=text]', {
                        value: vnode.attrs.name,
                        onchange: m.withAttr('value', vnode.attrs.updateFunc),
                    }),
                    vnode.attrs.showEditButton
                        ? m('button', {
                            onclick: () => { beingEdited = false }
                        }, 'Done')
                    : null
                ])
            ])
        }
    }
}

export default function(attrs: EditableVnode['attrs']) {
    return m(EditableH1, attrs)
}
