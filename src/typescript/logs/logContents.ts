import * as m from 'mithril'
import H1 from '../ui/h1'
import {Puttable, WorkoutLog, SetLogViewModel, GroupedSetLogVm} from '../types/exercise'
import utils from '../helpers/utils'
import {PageDefaultAttrs} from '../ui/page'
import LogOverlay from './overlays/log'

interface attrs {
    log: WorkoutLog & Puttable,
}
interface LogVnode {
    attrs: attrs & PageDefaultAttrs
}

const component: m.FactoryComponent<any> = (vnode: LogVnode) => {
    let log = vnode.attrs.log

    const createGroupedViewModelsFromSetLogs = (log: WorkoutLog) => {
        // this should produce an array, with each
        // item in the array representing one exercise
	let groupedLogViewModels:Array<GroupedSetLogVm> = []
        log.sets.forEach((setLog) => {
	    let lastIndex = groupedLogViewModels.length - 1
            let last = groupedLogViewModels[lastIndex]
	    if (last && (JSON.stringify(setLog.exercise) == JSON.stringify(last.exercise))) {
		groupedLogViewModels[lastIndex].sets.push(setLog)
            }
            else {
		groupedLogViewModels.push({
		    exercise: setLog.exercise,
		    sets: [setLog]
		})
	    }
        })
        return groupedLogViewModels
    }
    const flattenViewModelsIntoWorkoutLog = (viewModels: Array<GroupedSetLogVm>) => {
	let flattenedViewModels: Array<SetLogViewModel> = []
	viewModels.forEach((groupedVm) => {
	    groupedVm.sets.forEach((set) => {
		flattenedViewModels = flattenedViewModels.concat(set)
	    })
	})
	return flattenedViewModels
    }

    return {
	view: (vnode: LogVnode) => {
	    const css = vnode.attrs.css
	    const setOverlay = vnode.attrs.setOverlay
	    let log = vnode.attrs.log
            let logViewModels = createGroupedViewModelsFromSetLogs(log)

	    return [
                m('h3', log.workout.name == '' ? 'Untitled' : log.workout.name),
                H1({text: utils.formatDate(log.date)}),
                logViewModels.map((logViewModel, index) => {
                    return m('div', [
			m('button', {
                            onclick: () => {
				let logVmString = JSON.stringify(logViewModel)
				let logVmClone = JSON.parse(logVmString)
				setOverlay(LogOverlay, {
                                    logViewModel: logVmClone,
				    priorTo: log._id,
                                    hideOverlay: () => {
					setOverlay({
					    component: null,
					    title: ''
					}, {})
                                    },
				    updateSetLogs: (viewModel: GroupedSetLogVm) => {
					logViewModels[index] = viewModel
					log.sets = flattenViewModelsIntoWorkoutLog(logViewModels)
				    },
                                    css,
				})
                            }
			}, logViewModel.exercise.name),
			logViewModel.sets.map((set) => {
			    if (set.log) {
				return m('p', set.log.reps + ' at ' + set.log.amount)
			    }
			    else {
				return null
			    }
			}),
		    ])
                }),
                m('p', log.comments),
            ]
	}
    }
}

export {
    component,
    attrs,
}
