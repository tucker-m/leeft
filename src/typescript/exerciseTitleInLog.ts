import * as m from 'mithril'

export default (vnode) => {
    let beingEdited = false
    return {
        onbeforeupdate: (vnode) => {
            beingEdited = vnode.attrs.setLog.exercise.name == ''
        },
        view: (vnode) => {
            if (beingEdited) {
                return m('div', [
                    m('input[type=text]', {
                        value: vnode.attrs.setLog.exercise.name,
                        onchange: m.withAttr('value', (value) => {
                            vnode.attrs.setLog.exercise.name = value
                        })
                    }),
                    m('button.button', {
                        onclick: () => {beingEdited = false}
                    }, 'Done')
                ])
            }
            else {
                return m('h2', vnode.attrs.setLog.exercise.name)
            }
        }
    }
}
