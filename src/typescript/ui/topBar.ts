import * as m from 'mithril'

interface TopBarAttrs {
    editButton?: {
        buttonText: string,
        changeEditMode: (on: boolean) => void,
    }
}

interface TopBarVnode {
    attrs: TopBarAttrs,
}

const TopBarComponent = (vnode: TopBarVnode) => {
    let editEnabled = false

    return {
        view: (vnode: TopBarVnode) => {
            let editButton = m('div')
            const editButtonAttr = vnode.attrs.editButton
            if (editButtonAttr) {
                editButton = m('button.button', {
                    onclick: () => {
                        editEnabled = !editEnabled
                        editButtonAttr.changeEditMode(editEnabled)
                    }
                }, editEnabled ? 'Done Editing' : `Edit ${editButtonAttr.buttonText}`)
            }
            return m('div', [
                m('a', {
                    href: '/',
                    oncreate: m.route.link,
                }, 'Home'),
                editButton
            ])
        }
    }
}

export default (attrs: TopBarAttrs) => {
    return m(TopBarComponent, attrs)
}
