import * as m from 'mithril'
import {Saveable, Workout, WorkoutLog} from '../types/exercise'
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
                            const workoutLog = db.createSaveableRecord<WorkoutLog>({
                                _id: 'workoutlog_' + Date.now(),
                                workout: vnode.attrs.workout,
                                sets: [],
                                date: Date.now(),
                                comments: '',
                            })
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
