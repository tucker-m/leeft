import * as m from 'mithril'
import EditableH1 from '../ui/editableH1'
import WorkoutTable from '../ui/workoutTable'
import WorkoutLogs from './workoutLogs'
import {Workout, WorkoutLog, ExercisePrescription, SetLogViewModel, Program, Puttable} from '../types/exercise'
import EditTitleOverlay from './overlays/editTitle'
import {TopBar} from '../ui/topBar'
import {PageDefaultAttrs} from '../ui/page'
import preventDefault from '../helpers/preventDefaultFunction'
import db from '../helpers/db'
import utils from '../helpers/utils'

interface ContentAttrs {
    workout: Workout & Puttable,
    program: Program & Puttable,
    updateWorkout: (newWorkout: Workout) => void,
}
interface ContentVnode {
    attrs: ContentAttrs & PageDefaultAttrs
}

const createSetLogViewModelsFromPrescriptions = (prescriptions: Array<ExercisePrescription>) => {
    let setLogVms: Array<SetLogViewModel> = []
    prescriptions.forEach((prescription) => {
	for (let i = 0; i < prescription.sets; i++) {
	    setLogVms.push({
		exercise: prescription.exercise,
		prescribedReps: prescription.amount,
	    })
	}
    })
    return setLogVms
}

const component: m.FactoryComponent<any> = (vnode: ContentVnode) => {
    let pageEditable = vnode.attrs.editButtonShowing
    let matchingWorkouts: Array<any> = []
    let logsShowing = false
    const topBarButtons = [
	{
            text: !pageEditable ? 'Edit Workout' : 'Done Editing',
            action: () => { pageEditable = !pageEditable },
            secondState: {
                text: pageEditable ? 'Edit Workout' : 'Done Editing',
                action: () => { pageEditable = !pageEditable },
            }
        },
    ]

    return {
        view: (vnode: ContentVnode) => {
            const workout = vnode.attrs.workout
            const css = vnode.attrs.css

            return [
		TopBar({
		    buttons: topBarButtons,
		    subTitle: {
			text: `< ${vnode.attrs.program.name}`,
			url: `/programs/${vnode.attrs.program._id}`,
		    },
		    css: css,
		    editButtonShowing: pageEditable,
		}),
		m('div', {
		    class: css.content,
		}, [
		    m('div', {class: css.infoBox}, [
			EditableH1({
			    name: workout.name,
			    placeholder: 'Untitled Workout',
			    setOverlay: () => {
				vnode.attrs.setOverlay(EditTitleOverlay, {
				    workout: workout,
				    css: css,
				    hideOverlay: () => {
					vnode.attrs.setOverlay({component: null, title: ''}, {})
				    },
				    updateWorkout: vnode.attrs.updateWorkout,
				})
			    },
			    css: css,
			    showEditButton: pageEditable,
			}),
			m('div', {class: css.infoBoxButtons}, [
			    m('button', {
				class: css.hollowButton,
				onclick: preventDefault(() => {
				    const workoutLog = db.promiseSaveableRecord<WorkoutLog>(
					{
					    workout: vnode.attrs.workout,
					    sets: createSetLogViewModelsFromPrescriptions(vnode.attrs.workout.prescriptions),
					    date: Date.now(),
					    comments: '',
					    tag: 'workoutlog',
					}
				    ).then((workoutLog: WorkoutLog & Puttable) => {
					window.location.href = `#!/logs/${workoutLog._id}`
				    })
				})
			    }, 'Start Workout'),
			    m('button', {
				class: css.whiteHollowButton,
				onclick: () => {logsShowing = !logsShowing}
			    }, logsShowing ? 'Hide Past Workouts' : 'Show Past Workouts'),
			]),
			logsShowing
			    ? WorkoutLogs({
				workout: workout,
				css: css,
			    })
			    : null,
		    ]),
                    WorkoutTable({
			prescriptions: workout.prescriptions,
			showEditButtons: pageEditable,
			css: css,
			setOverlay: vnode.attrs.setOverlay,
			updatePrescriptions: (newPrescriptions) => {
			    workout.prescriptions = newPrescriptions
			},
                    }),
                ])
            ]
        }
    }
}

export {
    component,
    ContentAttrs,
}
