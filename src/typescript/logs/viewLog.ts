import * as m from 'mithril'
import {WorkoutLog} from '../types/exercise'
import db from '../helpers/db'
import utils from '../helpers/utils'
import preventDefault from '../helpers/preventDefaultFunction'
import Page from '../ui/page'

interface ViewLogAttrs {
    id: string
}
interface ViewLogVnode {
    attrs: ViewLogAttrs
}

export default (vnode: ViewLogVnode) => {
    let log: WorkoutLog = {
        workout: {
            _id: '',
            name: '',
            prescriptions: [],
        },
        sets: [],
        date: 0,
        comments: '',
    }
    db.fetchSaveableRecord<WorkoutLog>(vnode.attrs.id).then((logResult) => {
        log = logResult
        m.redraw()
    })
    return {
        view: (vnode: ViewLogVnode) => {
            if (log == null) {
                return m('p', 'Loading')
            }
            return Page({
                topBarButtons: [],
                contents: [
                    m('h1', log.workout.name == '' ? 'Untitled' : log.workout.name),
                    m('h4', utils.formatDate(log.date)),
                    m('a', {
                        onclick: preventDefault(() => {
                            log._deleted = true
                            window.location.href = `#!/workouts/${log.workout._id}`
                        })
                    }, 'Delete this log'),
                    m('table', [
                        m('thead', [
                            m('tr', [
                                m('td', 'Exercise'),
                                m('td', 'Reps'),
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
                ]
            })
        }
    }
}
