import * as m from 'mithril'

interface TopBarButtonAttrs {
    text: string,
    action: () => void,
    secondState?: {
        text: string,
        action: () => void,
        color: string,
    }
    setColor: (string) => void,
    css: any,
}

interface TopBarButtonVnode {
    attrs: TopBarButtonAttrs
}

const TopBarButtonComponent = (vnode: TopBarButtonVnode) => {
    let buttonStates = [{text: vnode.attrs.text, action: vnode.attrs.action, color: ''}]
    const secondState = vnode.attrs.secondState
    if (secondState) {
        buttonStates.push({text: secondState.text, action: secondState.action, color: secondState.color})
    }
    let currentBtnIdx = 0
    return {
        view: (vnode: TopBarButtonVnode) => {
            return m('button', {
                onclick: () => {
                    buttonStates[currentBtnIdx].action()
                    currentBtnIdx = (currentBtnIdx + 1) % buttonStates.length
                    vnode.attrs.setColor(buttonStates[currentBtnIdx].color)
                },
                class: vnode.attrs.css.button,
            }, buttonStates[currentBtnIdx].text)
        }
    }
}

const TopBarButton = (attrs: TopBarButtonAttrs) => {
    return m(TopBarButtonComponent, attrs)
}

export {
    TopBarButton,
    TopBarButtonAttrs,
}
