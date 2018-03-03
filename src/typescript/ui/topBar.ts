import * as m from 'mithril'

interface TopBarAttrs {
    editToggleFunc: (on: boolean) => void,
    defaultEditState?: boolean,
}

interface TopBarVnode {
    attrs: TopBarAttrs,
}

const TopBarComponent = (vnode: TopBarVnode) => {
    let editState = false

    return {
        view: (vnode) => {
            console.log(editState)
            return m('div', [
                m('a', {
                    href: '/',
                    oncreate: m.route.link,
                }, 'Home'),
                m('button.button', {
                    onclick: () => {
                        editState = !editState
                        vnode.attrs.editToggleFunc(editState)
                    }
                }, editState ? 'Done Editing' : 'Top Bar Edit')
            ])
        }
    }
}

export default (attrs: TopBarAttrs) => {
    return m(TopBarComponent, attrs)
}
