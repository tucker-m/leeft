import * as m from 'mithril'

interface EditButtonsAttrs {
    moveUp?: () => void,
    moveDown?: () => void,
    remove: () => void,
    css: any,
}

interface EditButtonsVnode {
    attrs: EditButtonsAttrs
}

const EditButtons = (vnode: EditButtonsVnode) => {
    const css = vnode.attrs.css
    
    return {
	view: (vnode: EditButtonsVnode) => {
	    return [
		vnode.attrs.moveUp
		    ? m('button', {
			onclick: vnode.attrs.moveUp,
			class: `${css.button} ${css.small}`,
		    }, 'Move Up')
		    : null,
		vnode.attrs.moveDown
		    ? m('button', {
			onclick: vnode.attrs.moveDown,
			class: `${css.button} ${css.small}`,
		    }, 'Move Down')
		    : null,
		m('button', {
		    onclick: vnode.attrs.remove,
		    class: `${css.dangerButton} ${css.small}`,
		}, 'Remove'),
	    ]
	}
    }
}

export default (attrs: EditButtonsAttrs) => {
    return m(EditButtons, attrs)
}
