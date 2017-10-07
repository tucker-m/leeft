import * as m from 'mithril'
import {WorkoutLog} from './exercise'
import db from './db'

interface WorkoutLogAttrs {
    workout_id: string
}
interface WorkoutLogVnode {
    attrs: WorkoutLogAttrs
}

let logs: Array<WorkoutLog> = []

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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
                logs.map((log) => {
                    const date = new Date(log.date)
                    const month = months[date.getMonth()]
                    const day = date.getDate()
                    const year = date.getFullYear()
                    return m('p', month + ' ' + day + ', ' + year)
                })
            ])
        }
    }
}

export default (attrs: WorkoutLogAttrs) => {
    return m(WorkoutLogComponent, attrs)
}
