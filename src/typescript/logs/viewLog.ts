import * as m from 'mithril'
import {WorkoutLog, Puttable} from '../types/exercise'
import db from '../helpers/db'
import utils from '../helpers/utils'
import preventDefault from '../helpers/preventDefaultFunction'
import Page from '../ui/page'
import H1 from '../ui/h1'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../../styles'

jss.setup(preset())
const {classes} = jss.createStyleSheet(style).attach()

interface ViewLogAttrs {
    id: string
}
interface ViewLogVnode {
    attrs: ViewLogAttrs
}

export default (vnode: ViewLogVnode) => {
    let log: WorkoutLog & Puttable = {
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
        _id: '',
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
                css: classes,
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
                    H1({text: utils.formatDate(log.date), css: classes}),
                    m('h4', log.workout.name == '' ? 'Untitled' : log.workout.name),
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
