import * as m from 'mithril'
import {Saveable, Workout, WorkoutLog, ExerciseSetLog, ExercisePrescription} from '../types/exercise'
import db from '../helpers/db'
import utils from '../helpers/utils'
import preventDefault from '../helpers/preventDefaultFunction'

interface WorkoutLogAttrs {
    workout: Workout & Saveable
}
interface WorkoutLogVnode {
    attrs: WorkoutLogAttrs
}

let logs: Array<WorkoutLog & Saveable> = []

const getEmptyLogForWorkout = (workout: Workout & Saveable) => {
    let setLogs: Array<ExerciseSetLog> = []
    workout.prescriptions.forEach((prescription: ExercisePrescription) => {
        const emptySet: ExerciseSetLog = {
            exercise: prescription.exercise,
            amount: 0,
            reps: 0,
        }
        const filledSetLogs: Array<ExerciseSetLog> = new Array(prescription.sets).fill(emptySet)
        setLogs = setLogs.concat(filledSetLogs)
    })

    let log: WorkoutLog & Saveable = {
        _id: 'workoutlog_' + Date.now(),
        workout: workout,
        sets: setLogs,
        date: Date.now(),
        comments: '',
    }
    return log
}

const WorkoutLogComponent = (vnode: WorkoutLogVnode) => {
    let currentWorkoutId = vnode.attrs.workout._id;
    return {
        onbeforeupdate: (vnode: WorkoutLogVnode) => {
            if (currentWorkoutId != vnode.attrs.workout._id) {
                db.findLogsByWorkoutId(vnode.attrs.workout._id).then((results) => {
                    logs = results.docs
                    m.redraw()
                })
                currentWorkoutId = vnode.attrs.workout._id
            }
        },
        view: (vnode: WorkoutLogVnode) => {
            let reverseMe = JSON.parse(JSON.stringify(logs))
            return m('div', [
                m('div.grid-x.grid-margin-x.align-middle', [
                    m('h2.cell.auto', 'Log Entries'),
                    m('a.button.cell.shrink', {
                        onclick: preventDefault(() => {
                            const workoutLog = db.createSaveableRecord<WorkoutLog>(
                                getEmptyLogForWorkout(vnode.attrs.workout)
                            )
                            window.location.href = `#!/logs/${workoutLog._id}`
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
