import * as m from 'mithril'
import {ExerciseSetLog, ExercisePrescription} from '../../types/exercise'

interface LogAttrs {
    logViewModel: any,
    hideOverlay: () => void,
    updateSetLogs: (viewModel: any) => void,
    css: any,
}
interface LogVnode {
    attrs: LogAttrs
}

const title = 'Edit Set'

const LogOverlay = (vnode: LogVnode) => {
    const css = vnode.attrs.css
    let exercise = vnode.attrs.logViewModel.exercise
    let sets = vnode.attrs.logViewModel.sets
    let currentSet = 0
    return {
        view: (vnode: LogVnode) => {
            return m('div', [
                m('h3', exercise.name),
		m('div', {class: css.setRow}, [
		    m('div', sets.map((set, index) => {
			return m('button', {
                            onclick: () => {
				currentSet = index
                            },
                            class: (currentSet == index) ?
				css.activeSetButton : css.setButton,
			}, index + 1)
                    })),
                    m('div', {
			class: css.insertNew,
			onclick: () => {
                            sets.splice(currentSet + 1, 0, {
				exercise: exercise,
				reps: null,
				amount: null,
				prescribedAmount: -1,
                            })
                            currentSet = currentSet + 1
			    vnode.attrs.updateSetLogs(vnode.attrs.logViewModel)
			}
		    }, [
			m('button', {class: css.insertButton}, '+',),
			m('a', {class: css.a}, 'Insert another set'),
		    ]),
		]),
                sets[currentSet].prescribedAmount > 0
                    ? m('p', sets[currentSet].prescribedAmount) : null,
		m('input[type=text]', {
		    value: sets[currentSet].reps,
		    onchange: m.withAttr('value', (value) => {
			sets[currentSet].reps = parseInt(value)
		    }),
		}),
		m('span', 'reps'),
		m('span', 'at'),
		m('input[type=text]', {
		    value: sets[currentSet].amount,
		    onchange: m.withAttr('value', (value) => {
			sets[currentSet].amount = parseInt(value)
		    }),
		}),
		m('span', exercise.setUnits == 'reps' ?  'pounds' : 'seconds'),
		m('button', {
		    onclick: () => {
			vnode.attrs.updateSetLogs(vnode.attrs.logViewModel)
			if (currentSet == sets.length - 1) {
			    vnode.attrs.hideOverlay()
			}
			else {
			    currentSet++
			}
		    },
		}, 'Next'),
                m('button', {
                    onclick: vnode.attrs.hideOverlay
                }, 'Close'),
		m('button', {
		    onclick: () => {
			sets.splice(currentSet, 1)
			if (currentSet >= sets.length) {
			    currentSet--
			}
			vnode.attrs.updateSetLogs(vnode.attrs.logViewModel)
		    }
		}, 'Skip this set'),
            ])
        }
    }
}

export default {
    component: LogOverlay,
    title: title
}
