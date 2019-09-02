import * as m from 'mithril'
import {Set} from '../../../types/exercise'
import u from '../../../helpers/utils'

interface SetAttrs {
    index: number,
    set: Set,
    addSet: (set: Set) => void,
    hideOverlay: () => void,
    css: any,
}
interface SetVnode {
    attrs: SetAttrs
}

const AddSetOverlay = (vnode: SetVnode) => {
    let set = JSON.parse(JSON.stringify(vnode.attrs.set))
    const {css} = vnode.attrs

    return {
	view: (vnode: SetVnode) => {
	    return [
		m('div', {class: css.labelOnTopGroup}, [
		    m('div', {class: css.setOverlayHeading}, [
			'Set ',
			m('span', {
			    class: u.c(css.setNumber, css.setOverlayHeadingNumber)
			}, vnode.attrs.index + 1),
		    ]),
		    m('label', {class: css.label}, 'Set is measured in: (check all that apply)'),
		    m('div', [
			m('div', {class: css.formRow}, [
			    m('input[type=checkbox]', {
				class: css.checkbox,
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
			m('div', {class: css.formRow}, [
			    m('input[type=checkbox]', {
				class: css.checkbox,
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
				class: css.checkbox,
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
		]),
		m('div', {class: css.labelOnTopGroup}, [
		    m('label', {class: css.label}, 'Goal values (leave blank to fill in values at the gym)'),
		    (set.reps
		     ? m('div', {class: css.formRow}, [
			 m('input[type=text]', {
			     class: css.textInput,
			     onchange: m.withAttr('value', (value) => {
				 if (set.reps) {
				     set.reps.prescribed = parseInt(value)
				 }
			     }),
			     value: set.reps.prescribed ? set.reps.prescribed : '',
			 }),
			 m('label', 'reps'),
		     ])
		     : null),
		    (set.weight
		     ? m('div', {class: css.formRow}, [
			 m('input[type=text]', {
			     class: css.textInput,
			     onchange: m.withAttr('value', (value) => {
				 if (set.weight) {
				     set.weight.prescribed = parseInt(value)
				 }
			     }),
			     value: set.weight.prescribed ? set.weight.prescribed : '',
			 }),
			 m('label', 'pounds'),
		     ])
		     : null),
		    (set.time
		     ? m('div', {class: css.formRow}, [
			 m('input[type=text]', {
			     class: css.textInput,
			     onchange: m.withAttr('value', (value) => {
				 if (set.time) {
				     set.time.prescribed = parseInt(value)
				 }
			     }),
			     value: set.time.prescribed ? set.time.prescribed : '',
			 }),
			 m('label', 'seconds'),
		     ])
		     : null),
		]),
		m('div', [
		    m('button', {
			class: css.hollowDangerButton,
			onclick: () => {vnode.attrs.hideOverlay()}
		    }, 'Cancel'),
		    m('button', {
			class: css.button,
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
