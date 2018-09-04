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
import Overlay from '../ui/overlay'
import LogOverlay from './overlays/log'

jss.setup(preset())
const {classes: css} = jss.createStyleSheet(style).attach()

interface ViewLogAttrs {
    id: string,
    edit?: string,
}
interface ViewLogVnode {
    attrs: ViewLogAttrs
}

export default (vnode: ViewLogVnode) => {

    let overlay: {component: null | any, title: string} = {component: null, title: ''}
    let overlayBottomContent = null
    let overlayAttrs = {}

    const setOverlay = (overlayToShow, attrs, bottomContent = null) => {
        overlay = overlayToShow
        overlayAttrs = attrs
        overlayBottomContent = bottomContent
    }

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

    const createViewModel = (log: WorkoutLog) => {
        // this should produce an array, with each
        // item in the array representing one exercise
        let groupedPrescriptions:Array<any> = []
        log.workout.prescriptions.forEach((prescription) => {
            let last = groupedPrescriptions[groupedPrescriptions.length - 1]
            if (JSON.stringify(prescription.exercise) == JSON.stringify(last)) {
                let sets: Array<any> = []
                for (let i = 0; i < prescription.sets; i++) {
                    sets.push({setLog: {}, prescribedAmount: prescription.amount})
                }
                last.sets.append(sets)
            }
            else {
                let sets: Array<any> = []
                for (let i = 0; i < prescription.sets; i++) {
                    sets.push({setLog: {}, prescribedAmount: prescription.amount})
                }
                groupedPrescriptions.push({
                    exercise: prescription.exercise,
                    sets: sets
                })
            }
        })
        return groupedPrescriptions
    }

    let pageEditable = (!!vnode.attrs.edit && vnode.attrs.edit == 'edit')

    db.fetchSaveableRecord<WorkoutLog>(vnode.attrs.id).then((logResult) => {
        log = logResult
        m.redraw()
    })
    return {
        view: (vnode: ViewLogVnode) => {

            if (log == null) {
                return m('p', 'Loading')
            }

            const groupedPrescriptions = createViewModel(log)
            const overlayComponent = overlay

            return m('div', [
                overlayComponent.component ?
                    Overlay({
                        content: m(overlayComponent.component, overlayAttrs),
                        title: overlayComponent.title,
                        bottomContent: overlayBottomContent,
                        css,
                    })
                    : null,

                Page({
                    css: css,
                    topBarButtons: [
                        {
                            text: 'Make Changes',
                            action: () => {
                                pageEditable = !pageEditable
                            }
                        },
                        {
                            text: 'Delete this log',
                            action: () => {
                                db.deleteSaveableRecord(log)
                                window.location.href = `#!/`
                            }
                        }
                    ],
                    contents: [
                        m('h3', log.workout.name == '' ? 'Untitled' : log.workout.name),
                        H1({text: utils.formatDate(log.date), css: css}),
                        groupedPrescriptions.map((prescription) => {
                            return m('button', {
                                onclick: () => {
                                    setOverlay(LogOverlay, {
                                        exerciseSetLogs: prescription,
                                        hideOverlay: () => {
                                            setOverlay({component: null, title: ''}, {})
                                        }
                                    })
                                }
                            }, prescription.exercise.name)
                        }),
                        m('p', log.comments),
                    ]
                })
            ])
        }
    }
}
