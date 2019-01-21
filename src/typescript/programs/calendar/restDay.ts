import * as m from 'mithril'
import EditButtons from './editButtons'

interface RestDayAttrs {
    beingEdited: boolean,
    moveUp: () => void,
    moveDown: () => void,
    remove: () => void,
    css: any,
}
interface RestDayVnode {
    attrs: RestDayAttrs
}

const RestDayComponent = (vnode: RestDayVnode) => {
    return {
	view: (vnode: RestDayVnode) => {
	    return [
		m('div', m('span', {
		    class: vnode.attrs.css.workoutTitle
		}, 'Rest Day')),
		m('div', {class: vnode.attrs.css.workoutDescription},
		  vnode.attrs.beingEdited
		    ? EditButtons({
			moveUp: vnode.attrs.moveUp,
			moveDown: vnode.attrs.moveDown,
			remove: vnode.attrs.remove,
			css: vnode.attrs.css,
		    })
		    : null,
		 ),
	    ]
	}
    }
}
export default (attrs: RestDayAttrs) => {
    return m(RestDayComponent, attrs)
}
