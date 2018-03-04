import * as m from 'mithril'

interface EditableVnode {
    attrs: {
        name: string,
        updateFunc: (newName: string) => void,
        showEditButton: boolean,
    }
}

const EditableH1 = function(vnode: EditableVnode) {
    let beingEdited = false
    return {
        view: function(vnode: EditableVnode) {
            return m('div.editable-h1', {
                class: beingEdited ? 'being-edited' : '',
            }, [
                !beingEdited ?
                    m('div', [
                        m('h1', vnode.attrs.name),
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
