import * as m from 'mithril'
import {WorkoutLog} from './exercise'
import db from './db'
import utils from './utils'
import preventDefault from './preventDefaultFunction'

interface ViewLogAttrs {
    id: string
}
interface ViewLogVnode {
    attrs: ViewLogAttrs
}

export default (vnode: ViewLogVnode) => {
    let log: WorkoutLog = null
    db.fetchSaveableRecord<WorkoutLog>(vnode.attrs.id).then((logResult) => {
        log = logResult
        m.redraw()
    })
    return {
        view: (vnode: ViewLogVnode) => {
            if (log == null) {
                return m('p', 'Loading')
            }
            return m('div', [
                m('h3', log.workout.name == '' ? 'Untitled' : log.workout.name),
                m('h4', utils.formatDate(log.date)),
                m('a', {
                    onclick: preventDefault(() => {
                        log._deleted = true
                        window.location.href = `#!/workouts/${log.workout._id}`
                    })
                }, 'Delete'),
                m('table', [
                    m('thead', [
                        m('tr', [
                            m('td', 'Exercise'),
                            m('td', 'Sets'),
                            m('td', 'Amount')
                        ])
                    ]),
                    m('tbody', log.sets.map((set) => {
                        return m('tr', [
                            m('td', set.exercise.name),
                            m('td', set.reps),
                            m('td', set.amount)
                        ])
                    }))
                ]),
                m('p', log.comments),
            ])
        }
    }
}
