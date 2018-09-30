import * as m from 'mithril'
import {Saveable, Saved, Puttable, Workout, WorkoutLog, ExerciseSetLog, ExercisePrescription} from '../types/exercise'
import db from '../helpers/db'
import utils from '../helpers/utils'
import preventDefault from '../helpers/preventDefaultFunction'

interface WorkoutLogAttrs {
    workout: Workout,
    css: any,
}
interface WorkoutLogVnode {
    attrs: WorkoutLogAttrs
}

let logs: Array<WorkoutLog & Saveable> = []

/* Create an array of set logs from an array of prescriptions */
const createEmptySetLogsFromPrescriptions = (prescriptions: Array<ExercisePrescription>) => {
    let setLogs: Array<ExerciseSetLog> = []
    prescriptions.forEach((prescription) => {
	for (let i = 0; i < prescription.sets; i++) {
	    setLogs.push({
		exercise: prescription.exercise,
		amount: -1,
		reps: -1,
		prescribedAmount: prescription.amount,
	    })
	}
    })
    return setLogs
}


const WorkoutLogComponent = (vnode: WorkoutLogVnode) => {
    const css = vnode.attrs.css
    db.findLogsByWorkoutName(vnode.attrs.workout.name).then((results) => {
        logs = results.docs
        m.redraw()
    })

    return {
        view: (vnode: WorkoutLogVnode) => {
            let reverseMe = JSON.parse(JSON.stringify(logs))
            return m('div', [
                m('div', [
                    m('h2', 'Log Entries'),
                    m('button', {
                        class: css.hollowButton,
                        onclick: preventDefault(() => {
                            const workoutLog = db.promiseSaveableRecord<WorkoutLog>(
                                {
				    workout: vnode.attrs.workout,
				    sets: createEmptySetLogsFromPrescriptions(vnode.attrs.workout.prescriptions),
				    date: Date.now(),
				    comments: '',
				    tag: 'workoutlog',
				}
                            ).then((workoutLog: WorkoutLog & Puttable) => {
                                window.location.href = `#!/logs/${workoutLog._id}`
                            })
                        })
                    }, '+ Log Entry')
                ]),
                reverseMe.reverse().map((log) => {
                    return m('p', [
                        m('a', {
                            href: '/logs/' + log._id,
                            oncreate: m.route.link,
                        }, utils.formatDate(log.date)),
                        m('span', ' - ' + log.comments),
                    ])
                })
            ])
        }
    }
}

export default (attrs: WorkoutLogAttrs) => {
    return m(WorkoutLogComponent, attrs)
}
