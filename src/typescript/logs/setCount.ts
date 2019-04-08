import * as m from 'mithril'

export default (vnode) => {
    let previousSets = vnode.attrs.sets
    const css = vnode.attrs.css
    return {
	view: (vnode) => {
	    let flash = vnode.attrs.sets != previousSets ? css.flash : ''
	    previousSets = vnode.attrs.sets
	    return m('span', {
		class: flash,
	    }, `${vnode.attrs.sets} sets`)
	}
    }
}
