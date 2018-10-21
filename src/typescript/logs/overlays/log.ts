import * as m from 'mithril'
import {SetLogViewModel, GroupedSetLogVm, ExercisePrescription} from '../../types/exercise'
import db from '../../helpers/db'

interface LogAttrs {
    logViewModel: GroupedSetLogVm,
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
    let logViewModel = vnode.attrs.logViewModel
    let exercise = logViewModel.exercise
    let sets = logViewModel.sets
    let currentSet = 0
    let previousSets: Array<SetLogViewModel> = []
    db.findSetsContainingExercise(logViewModel.exercise.name).then((setLogs) => {
	previousSets = setLogs
	m.redraw()
    })

    return {
        view: (vnode: LogVnode) => {
            let set = sets[currentSet]
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
                            })
                            currentSet = currentSet + 1
			    vnode.attrs.updateSetLogs(logViewModel)
			}
		    }, [
			m('button', {class: css.insertButton}, '+',),
			m('a', {class: css.a}, 'Insert another set'),
		    ]),
		]),
                sets[currentSet].prescribedReps
                    ? m('p', sets[currentSet].prescribedReps) : null,
		m('input[type=text]', {
		    value: set.log ? set.log.reps : '',
		    onchange: m.withAttr('value', (value) => {
			if (!set.log) {
			    set.log = {reps: 0, amount: 0}
			}
			set.log.reps = parseInt(value)
		    }),
		}),
		m('span', 'reps'),
		m('span', 'at'),
		m('input[type=text]', {
		    value: set.log ? set.log.amount : '',
		    onchange: m.withAttr('value', (value) => {
			if (!set.log) {
			    set.log = {reps: 0, amount: 0}
			}
			set.log.amount = parseInt(value)
		    })
		}),
		m('span', exercise.setUnits == 'reps' ?  'pounds' : 'seconds'),
		m('button', {
		    onclick: () => {
			vnode.attrs.updateSetLogs(logViewModel)
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
			vnode.attrs.updateSetLogs(logViewModel)
		    }
		}, 'Skip this set'),
		m('p', 'Last time:'),
		previousSets.map((previousSet) => {
		    return previousSet.log
			? m('p', `${previousSet.log.reps} at ${previousSet.log.amount} pounds`)
			: null
		}),
            ])
        }
    }
}

export default {
    component: LogOverlay,
    title: title
}
