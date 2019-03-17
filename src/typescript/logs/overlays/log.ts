import * as m from 'mithril'
import {SetLogViewModel, GroupedSetLogVm, ExercisePrescription} from '../../types/exercise'
import db from '../../helpers/db'

interface LogAttrs {
    title: string,
    logViewModel: GroupedSetLogVm,
    priorTo: string,
    hideOverlay: () => void,
    updateSetLogs: (viewModel: GroupedSetLogVm) => void,
    css: any,
}
interface LogVnode {
    attrs: LogAttrs
}

const LogOverlay = (vnode: LogVnode) => {
    const css = vnode.attrs.css
    let logViewModel = vnode.attrs.logViewModel
    let exercise = logViewModel.exercise
    let sets = logViewModel.sets
    let currentSet = 0
    let previousSets: Array<SetLogViewModel> = []
    db.findSetsContainingExercise(logViewModel.exercise.name, vnode.attrs.priorTo).then((setLogs) => {
	previousSets = setLogs
	m.redraw()
    })

    return {
        view: (vnode: LogVnode) => {
	    return m('div', [
		m('div', {class: css.setListContainer}, [
		    sets.map((set, index) => {
			return m('div', {class: css.setBox}, [
			    m('div', {class: css.setCircleColumn}, m('button', {
				onclick: () => {
				    currentSet = index
				},
				class: (currentSet == index) ?
				    css.activeSetButton : css.setButton,
			    }, index + 1)),
			    m('div', {class: css.setInfoColumn}, [
				sets[index].prescribedReps
				    ? m('div', {class: css.infoRow}, [
					m('label', {class: css.infoRowTitle}, 'Goal:'),
					m('span', {class: css.infoRowInfo}, `${sets[index].prescribedReps} reps`)
				    ])
				    : null,
				m('div', {class: css.infoRow}, [
				    m('label', {class: css.infoRowTitle}, 'This Workout:'),
				    m('div', {class: css.infoRowInfo}, [
					m('div', {class: css.setsAndReps}, [
					    m('div', {class: css.setsAndRepsGrouper}, [
						m('div', {class: css.setsAndRepsItem}, m('input[type=text]', {
						    value: set.log ? set.log.reps : '',
						    onchange: m.withAttr('value', (value) => {
							if (!set.log) {
							    set.log = {reps: 0, amount: 0}
							}
							set.log.reps = parseInt(value)
							vnode.attrs.updateSetLogs(logViewModel)
						    }),
						})),
						m('div', {class: css.setsAndRepsItem}, m('span', 'reps at')),
					    ]),
					    m('div', {class: css.setsAndRepsGrouper}, [
						m('div', {class: css.setsAndRepsItem}, m('input[type=text]', {
						    value: set.log ? set.log.amount : '',
						    onchange: m.withAttr('value', (value) => {
							if (!set.log) {
							    set.log = {reps: 0, amount: 0}
							}
							set.log.amount = parseInt(value)
							vnode.attrs.updateSetLogs(logViewModel)
						    })
						})),
						m('div', {class: css.setsAndRepsItem}, m('span', exercise.setUnits == 'reps' ?  'pounds' : 'seconds')),
					    ]),
					])
				    ])
				]),
				m('button', {
				    onclick: () => {
					sets.splice(index, 1)
					vnode.attrs.updateSetLogs(logViewModel)
				    },
				}, 'Delete set'),
				m('button', {
				    onclick: () => {
					sets.splice(index + 1, 0, {exercise: set.exercise})
					vnode.attrs.updateSetLogs(logViewModel)
				    },
				}, 'Add set'),
			    ]),
			])
		    }),
                ]),
                previousSets.length ? m('p', 'Last time:') : null,
		previousSets.map((previousSet) => {
		    return previousSet.log
			? m('p', `${previousSet.log.reps} at ${previousSet.log.amount} pounds`)
			: null
		}),
            ])
        }
    }
}

const Bottom = (vnode: LogVnode) => {
    return {
	view: (vnode: LogVnode) => {
	    return m('div', [
		m('button', {
                    onclick: vnode.attrs.hideOverlay,
		    class: vnode.attrs.css.hollowButton,
		}, 'Close'),
	    ])
	}
    }
}

export default {
    component: LogOverlay,
    bottom: Bottom,
}
