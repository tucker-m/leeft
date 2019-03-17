import * as m from 'mithril'
import EditableHeading from '../ui/editableHeading'
import {TopBar} from '../ui/topBar'
import {Puttable, WorkoutLog, SetLogViewModel, GroupedSetLogVm} from '../types/exercise'
import utils from '../helpers/utils'
import {PageDefaultAttrs} from '../ui/page'
import LogOverlay from './overlays/log'

interface attrs {
    log: WorkoutLog & Puttable,
    updateLog: (logVms: Array<SetLogViewModel>) => void,
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
                TopBar({
		    buttons: [],
		    subTitle: {
			text: `< ${log.workout.name}`,
			url: `/`,
		    },
		    css: css,
		    editButtonShowing: false,
		}),
		m('div', {class: css.content}, [
                    EditableHeading({
			level: 1,
			name: utils.formatDate(log.date),
			placeholder: '',
			showEditButton: false,
			css: css,
		    }),
		    logViewModels.map((logViewModel, index) => {
			return m('div', [
			    m('div', [
				EditableHeading({
				    level: 2,
				    name: logViewModel.exercise.name,
				    placeholder: 'Untitled Exercise',
				    setOverlay: () => {
					let logVmString = JSON.stringify(logViewModel)
					let logVmClone = JSON.parse(logVmString)
					let hideOverlay = () => {
					    setOverlay({
						component: null,
						title: ''
					    }, {})
					}

					setOverlay(LogOverlay, {
					    title: logViewModel.exercise.name,
					    logViewModel: logVmClone,
					    priorTo: log._id,
					    hideOverlay,
					    updateSetLogs: (viewModel: GroupedSetLogVm) => {
						logViewModels[index] = viewModel
						log.sets = flattenViewModelsIntoWorkoutLog(logViewModels)
					    },
					    css,
					})
				    },
				    showEditButton: true,
				    css: css,
				}),
			    ]),
			    logViewModel.sets.map((set) => {
				if (set.log) {
				    return m('p', set.log.reps + ' at ' + set.log.amount)
				}
				else {
				    return null
				}
			    }),
			    m('button', {
				onclick: () => {
				    logViewModels.splice(index + 1, 0, {
					exercise: {
					    name: 'New Exercise',
					    setUnits: 'reps',
					    tag: 'exercise',
					},
					sets: [
					    {exercise: {
						name: 'New Exercise',
						setUnits: 'reps',
						tag: 'exercise'},
					     prescribedReps: 10,
					    }
					],
				    })
				    vnode.attrs.updateLog(flattenViewModelsIntoWorkoutLog(logViewModels))
				},
			    }, 'Insert new exercise'),
			])
                    }),
                    m('p', log.comments),
		]),
            ]
	}
    }
}

export {
    component,
    attrs,
}
