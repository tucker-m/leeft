import * as m from 'mithril'
import { Exercise, WorkoutLog, Puttable, SetLogViewModel, GroupedSetLogVm } from '../types/exercise'
import db from '../helpers/db'
import utils from '../helpers/utils'
import preventDefault from '../helpers/preventDefaultFunction'
import Page from '../ui/page'
import H1 from '../ui/h1'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../../styles'
import Overlay from '../ui/overlay'
import LogOverlay from './overlays/log'

jss.setup(preset())
const {classes: css} = jss.createStyleSheet(style).attach()

interface ViewLogAttrs {
    id: string,
    edit?: string,
}
interface ViewLogVnode {
    attrs: ViewLogAttrs
}

export default (vnode: ViewLogVnode) => {

    let overlay: {component: null | any, title: string} = {component: null, title: ''}
    let overlayBottomContent = null
    let overlayAttrs = {}

    const setOverlay = (overlayToShow, attrs, bottomContent = null) => {
        overlay = overlayToShow
        overlayAttrs = attrs
        overlayBottomContent = bottomContent
    }

    let log: WorkoutLog & Puttable = {
        workout: {
            _id: '',
            name: '',
            prescriptions: [],
            tag: 'workout',
        },
        sets: [],
        date: 0,
        comments: '',
        tag: 'workoutlog',
        _id: '',
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

    let pageEditable = (!!vnode.attrs.edit && vnode.attrs.edit == 'edit')

    db.fetchSaveableRecord<WorkoutLog>(vnode.attrs.id).then((logResult) => {
	log = logResult
        m.redraw()
    })
    return {
        view: (vnode: ViewLogVnode) => {

            if (log == null) {
                return m('p', 'Loading')
            }
            let logViewModels = createGroupedViewModelsFromSetLogs(log)
            const overlayComponent = overlay

            return m('div', [
                overlayComponent.component ?
                    Overlay({
                        content: m(overlayComponent.component, overlayAttrs),
                        title: overlayComponent.title,
                        bottomContent: overlayBottomContent,
                        css,
                    })
                    : null,

                Page({
                    css: css,
                    topBarButtons: [
                        {
                            text: 'Make Changes',
                            action: () => {
                                pageEditable = !pageEditable
                            }
                        },
                        {
                            text: 'Delete this log',
                            action: () => {
                                db.deleteSaveableRecord(log)
                                window.location.href = `#!/`
                            }
                        }
                    ],
                    contents: [
                        m('h3', log.workout.name == '' ? 'Untitled' : log.workout.name),
                        H1({text: utils.formatDate(log.date), css: css}),
                        logViewModels.map((logViewModel, index) => {
                            return m('div', [
				m('button', {
                                    onclick: () => {
					let logVmString = JSON.stringify(logViewModel)
					let logVmClone = JSON.parse(logVmString)
					setOverlay(LogOverlay, {
                                            logViewModel: logVmClone,
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
                })
            ])
        }
    }
}
