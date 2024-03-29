import * as m from 'mithril'
import {Set} from '../../types/exercise'

interface ComponentAttrs {
    set: Set
    updateSet: (set: Set) => void,
    css: any,
    closeOverlay: () => void,
}
interface ComponentVnode {
    attrs: ComponentAttrs
}

const EnterSetComponent = (vnode: ComponentVnode) => {
    const {css, closeOverlay} = vnode.attrs
    const set = JSON.parse(JSON.stringify(vnode.attrs.set))

    return {
	view: (vnode: ComponentVnode) => {
	    return m('div', [
		m('div', [
		    set.reps && set.reps.prescribed
			? m('span', {class: css.repPill}, `${set.reps.prescribed} reps`)
			: null,
		    set.weight && set.weight.prescribed
			? m('span', {class: css.weightPill}, `${set.weight.prescribed} pounds`)
			: null,
		    set.time && set.time.prescribed
			? m('span', {class: css.timePill}, `${set.time.prescribed} seconds`)
			: null,
		]),
		m('div', [
		    m('span', 'Measured in'),
		    m('input[type=checkbox]', {
			checked: !!set.reps,
			onclick: () => {
			    if (set.reps) {
				set.reps = false
			    }
			    else {
				set.reps = {
				    entered: false,
				    prescribed: false
				}
			    }
			}
		    }),
		    m('label', 'reps'),
		    m('input[type=checkbox]', {
			checked: !!set.weight,
			onclick: () => {
			    if (set.weight) {
				set.weight = false
			    }
			    else {
				set.weight = {
				    entered: false,
				    prescribed: false
				}
			    }
			}
		    }),
		    m('label', 'weight'),
		    m('input[type=checkbox]', {
			checked: !!set.time,
			onclick: () => {
			    if (set.time) {
				set.time = false
			    }
			    else {
				set.time = {
				    entered: false,
				    prescribed: false
				}
			    }
			}
		    }),
		    m('label', 'time'),
		]),
		m('div', [
		    set.reps
			? m('div', [
			    m('input[type=number]', {
				value: set.reps.entered,
				onchange: m.withAttr('value', (value: string) => {
				    if (!set.reps) {
					set.reps = {
					    prescribed: false,
					    entered: 0
					}
				    }
				    if (value === '') {
					set.reps.entered = false
				    }
				    else {
					set.reps.entered = parseInt(value)
				    }
				})
			    }),
			    m('label', 'reps')
			])
			: null,
		    set.weight
			? m('div', [
			    m('input[type=number]', {
				value: set.weight.entered,
				onchange: m.withAttr('value', (value: string) => {
				    if (!set.weight) {
					set.weight = {
					    prescribed: false,
					    entered: 0
					}
				    }
				    if (value === '') {
					set.weight.entered = false
				    }
				    else {
					set.weight.entered = parseInt(value)
				    }
				})
			    }),
			    m('label', 'pounds')
			])
			: null,
		    set.time
			? m('div', [
			    m('input[type=number]', {
				value: set.time.entered,
				onchange: m.withAttr('value', (value: string) => {
				    if (!set.time) {
					set.time = {
					    prescribed: false,
					    entered: 0
					}
				    }
				    if (value === '') {
					set.time.entered = false
				    }
				    else {
					set.time.entered = parseInt(value)
				    }
				})
			    }),
			    m('label', 'seconds')
			])
			: null,
		]),
		m('button', {
		    class: css.hollowDangerButton,
		    onclick: closeOverlay
		}, 'Close'),
		m('button', {
		    class: css.button,
		    onclick: () => {
			vnode.attrs.updateSet(set)
			closeOverlay()
		    },
		}, 'Save')
	    ])
	}
    }
}

export default {
    component: EnterSetComponent,
}
