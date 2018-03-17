import * as m from 'mithril'

interface TopBarButtonAttrs {
    text: string,
    action: () => void,
    secondState?: {
        text: string,
        action: () => void,
        activeColor: string,
    }
}

interface TopBarButtonVnode {
    attrs: TopBarButtonAttrs
}

const TopBarButtonComponent = (vnode: TopBarButtonVnode) => {
    let buttonStates = [{text: vnode.attrs.text, action: vnode.attrs.action}]
    if (vnode.attrs.secondState) {
        buttonStates.push({text: vnode.attrs.secondState.text, action: vnode.attrs.secondState.action})
    }
    let currentBtnIdx = 0
    return {
        view: (vnode: TopBarButtonVnode) => {
            return m('button', {
                onclick: () => {
                    buttonStates[currentBtnIdx].action()
                    currentBtnIdx = (currentBtnIdx + 1) % buttonStates.length
                }
            }, buttonStates[currentBtnIdx].text)
        }
    }
}

export default (attrs: TopBarButtonAttrs) => {
    return m(TopBarButtonComponent, attrs)
}
