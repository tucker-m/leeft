import * as m from 'mithril'
import {WorkoutLog} from './exercise'
import db from './db'
import utils from './utils'

interface ViewLogAttrs {
    id: string
}
interface ViewLogVnode {
    attrs: ViewLogAttrs
}

export default (vnode: ViewLogVnode) => {
    let log: WorkoutLog = null
    db.findLogById(vnode.attrs.id).then((logResult) => {
        log = logResult
        m.redraw()
    })
    return {
        view: (vnode: ViewLogVnode) => {
            if (log == null) {
                return m('p', 'Loading')
            }
            return m('div', [
                m('h3', log.workout.name),
                m('h4', utils.formatDate(log.date)),
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
                ])
            ])
        }
    }
}