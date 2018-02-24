import * as m from 'mithril'

const EditableH1 = function(vnode: {
    attrs: {
        name: string,
        updateFunc: (newName: string) => void
    }
}) {
    let beingEdited = false
    return {
        view: function(vnode) {
            if (!beingEdited) {
                return m('div.cell.auto', [
                    m('h1', vnode.attrs.name),
                    m('button.button.secondary', {
                        onclick: () => { beingEdited = true }
                    }, 'Edit')
                ])
            }
            else {
                return m('div', [
                    m('input[type=text]', {
                        value: vnode.attrs.name,
                        onchange: m.withAttr('value', vnode.attrs.updateFunc),
                    }),
                    m('button.button', {
                        onclick: () => { beingEdited = false }
                    }, 'Done'),
                ])
            }
        }
    }
}

export default function(attrs) {
    return m(EditableH1, attrs)
}
