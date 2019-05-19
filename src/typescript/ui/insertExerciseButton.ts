import * as m from 'mithril'

interface Attrs {
    onclick: () => void,
    css: any,
}
interface Vnode {
    attrs: Attrs,
}

const InsertExerciseButton = (vnode: Vnode) => {
    return {
	view: (vnode: Vnode) => {
	    return m('div', {
		class: vnode.attrs.css.insertExerciseButtonContainer,
		onclick: vnode.attrs.onclick,
	    }, [
		m('button', {
		    class: vnode.attrs.css.roundButton,
		}, '+'),
		m('a', {
		    class: vnode.attrs.css.linkText,
		}, 'Insert new exercise'),
	    ])
	}
    }
}

export default (attrs: Attrs) => {
    return m(InsertExerciseButton, attrs)
}
