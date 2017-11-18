import * as m from 'mithril'
import {WorkoutLog} from './exercise'
import db from './db'
import utils from './utils'

interface WorkoutLogAttrs {
    workout_id: string
}
interface WorkoutLogVnode {
    attrs: WorkoutLogAttrs
}

let logs: Array<WorkoutLog> = []

const WorkoutLogComponent = (vnode: WorkoutLogVnode) => {
    let currentWorkoutId = vnode.attrs.workout_id;
    return {
        onbeforeupdate: (vnode: WorkoutLogVnode) => {
            if (currentWorkoutId != vnode.attrs.workout_id) {
                db.findLogsByWorkoutId(vnode.attrs.workout_id).then((results) => {
                    logs = results.docs
                    m.redraw()
                })
                currentWorkoutId = vnode.attrs.workout_id
            }
        },
        view: (vnode: WorkoutLogVnode) => {
            return m('div', [
                m('div.grid-x.grid-margin-x.align-middle', [
                    m('h2.cell.auto', 'Log Entries'),
                    m('a.button.cell.shrink', {
                        href: '/log/' + vnode.attrs.workout_id,
                        oncreate: m.route.link,
                    }, 'New Log Entry')
                ]),
                logs.reverse().map((log) => {
                    return m('p', m('a', {
                        href: '/viewlog/' + log._id,
                        oncreate: m.route.link,
                    }, utils.formatDate(log.date)))
                })
            ])
        }
    }
}

export default (attrs: WorkoutLogAttrs) => {
    return m(WorkoutLogComponent, attrs)
}
