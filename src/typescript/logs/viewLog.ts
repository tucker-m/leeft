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
            tag: 'workout',
        },
        sets: [],
        date: 0,
        comments: '',
        tag: 'workoutlog',
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
                topBarButtons: [
                    {
                        text: 'Delete this log',
                        action: () => {
                            db.deleteSaveableRecord(log)
                            window.location.href = `#!/workouts/${log.workout._id}`
                        }
                    }
                ],
                contents: [
                    m('h1', log.workout.name == '' ? 'Untitled' : log.workout.name),
                    m('h4', utils.formatDate(log.date)),
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
