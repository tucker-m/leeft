import * as m from 'mithril'
import {Set} from '../../types/exercise'

interface ComponentAttrs {
    set: Set
    css: any,
    closeOverlay: () => void,
}
interface ComponentVnode {
    attrs: ComponentAttrs
}

const EnterSetComponent = (vnode: ComponentVnode) => {
    const {set, css, closeOverlay} = vnode.attrs

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
				    set.reps.entered = parseInt(value)
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
				    set.weight.entered = parseInt(value)
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
				    set.time.entered = parseInt(value)
				})
			    }),
			    m('label', 'seconds')
			])
			: null,
		]),
		m('button', {
		    onclick: closeOverlay
		}, 'Close'),
	    ])
	}
    }
}

export default {
    component: EnterSetComponent,
}
