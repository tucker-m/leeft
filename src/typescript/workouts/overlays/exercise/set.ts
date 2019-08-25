import * as m from 'mithril'
import {Set} from '../../../types/exercise'

interface SetAttrs {
    exerciseName: string,
    previousSet: Set | false,
    addSet: (set: Set) => void,
    hideOverlay: () => void,
}
interface SetVnode {
    attrs: SetAttrs
}

const AddSetOverlay = (vnode: SetVnode) => {
    let set: Set = {
	reps: false,
	weight: false,
	time: false,
    }
    const {previousSet} = vnode.attrs
    if (previousSet) { set = previousSet }
    
    return {
	view: (vnode: SetVnode) => {
	    return [
		m('h1', vnode.attrs.exerciseName),
		m('label', 'Set is measured in: (check all that apply)'),
		m('div', [
		    m('div', [
			m('input[type=checkbox]', {
			    onclick: () => {
				if (set.reps) {
				    set.reps = false
				}
				else {
				    set.reps = {
					prescribed: false,
					entered: false,
				    }
				}
			    },
			    checked: !!set.reps,
			}),
			m('label', 'reps'),
		    ]),
		    m('div', [
			m('input[type=checkbox]', {
			    onclick: () => {
				if (set.weight) {
				    set.weight = false
				}
				else {
				    set.weight = {
					prescribed: false,
					entered: false,
				    }
				}
			    },
			    checked: !!set.weight,
			}),
			m('label', 'pounds'),
		    ]),
		    m('div', [
			m('input[type=checkbox]', {
			    onclick: () => {
				if (set.time) {
				    set.time = false
				}
				else {
				    set.time = {
					prescribed: false,
					entered: false,
				    }
				}
			    },
			    checked: !!set.time,
			}),
			m('label', 'seconds'),
		    ]),
		]),
		m('div', [
		    (set.reps
		     ? m('div', [
			 m('input[type=text]', {
			     onchange: m.withAttr('value', (value) => {
				 if (set.reps) {
				     set.reps.prescribed = parseInt(value)
				 }
			     })
			 }),
			 m('label', 'reps'),
		     ])
		     : null),
		    (set.weight
		     ? m('div', [
			 m('input[type=text]', {
			     onchange: m.withAttr('value', (value) => {
				 if (set.weight) {
				     set.weight.prescribed = parseInt(value)
				 }
			     })
			 }),
			 m('label', 'pounds'),
		     ])
		     : null),
		    (set.time
		     ? m('div', [
			 m('input[type=text]', {
			     onchange: m.withAttr('value', (value) => {
				 if (set.time) {
				     set.time.prescribed = parseInt(value)
				 }
			     })
			 }),
			 m('label', 'seconds'),
		     ])
		     : null),
		]),
		m('div', [
		    m('button', {
			onclick: () => {vnode.attrs.hideOverlay()}
		    }, 'Cancel'),
		    m('button', {
			onclick: () => {
			    vnode.attrs.addSet(set)
			    vnode.attrs.hideOverlay()
			}
		    }, 'Save'),
		])
	    ]
	}
    }
}

export default {
    component: AddSetOverlay
}
