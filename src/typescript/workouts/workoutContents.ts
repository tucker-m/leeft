import * as m from 'mithril'
import EditableHeading from '../ui/editableHeading'
import WorkoutTable from '../ui/workoutTable'
import WorkoutLogs from './workoutLogs'
import {Workout, WorkoutLog, SetLog, SetPrescription, Program, Puttable} from '../types/exercise'
import EditTitleOverlay from './overlays/editTitle'
import {TopBar} from '../ui/topBar'
import {PageDefaultAttrs} from '../ui/page'
import preventDefault from '../helpers/preventDefaultFunction'
import db from '../helpers/db'
import utils from '../helpers/utils'

interface ContentAttrs {
    workout: Workout,
    program: Program & Puttable,
    updateWorkout: (newWorkout: Workout) => void,
}
interface ContentVnode {
    attrs: ContentAttrs & PageDefaultAttrs
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
	    const program = vnode.attrs.program

            return [
		TopBar({
		    buttons: topBarButtons,
		    subTitle: {
			text: `< ${program.name}`,
			url: `/programs/${program._id}`,
		    },
		    css: css,
		    editButtonShowing: pageEditable,
		}),
		m('div', {
		    class: css.content,
		}, [
		    m('div', {class: css.infoBox}, [
			EditableHeading({
			    level: 1,
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
				    const createSetLogsFromPrescriptions = (prescriptions: SetPrescription[]) => {
					const logs: SetLog[] = prescriptions.map(prescription => {
					    const log: SetLog = {
						exerciseName: prescription.exerciseName,
						reps: !prescription.reps ? false : 0,
						weight: !prescription.weight ? false : 0,
						time: !prescription.time ? false : 0,
					    }
					    return log
					})
					return logs
				    }

				    const workoutLog = db.promiseSaveableRecord<WorkoutLog>(
					{
					    workout: vnode.attrs.workout,
					    sets: createSetLogsFromPrescriptions(vnode.attrs.workout.prescriptions),
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
