import * as m from 'mithril'
import db from '../../helpers/db'
import {Workout, ExercisePrescription} from '../../types/exercise'

interface EditTitleAttrs {
    title: string,
    workout: Workout,
    css: any,
    showOverlayContent: (boolean) => void,
    updateTitle: (string) => void,
    updatePrescriptions: ([]) => void,
    updateWorkout: (Workout) => void,
}
interface ComponentVnode {
    attrs: EditTitleAttrs
}

const EditTitleComponent = (vnode: ComponentVnode) => {
    let matchingWorkouts: Array<any> = []
    let title = vnode.attrs.title
    let workout = vnode.attrs.workout

    return {
        view: (vnode: ComponentVnode) => {
            return m('div', {
                class: vnode.attrs.css.fullScreenOverlay,
            }, m('div', {
                class: vnode.attrs.css.fullScreenOverlayContent,
            }, [
                m('h4', 'Change Workout Title'),
                m('input[type=text]', {
                    value: title,
                    oninput: m.withAttr('value', (value) => {
                        db.findWorkoutsByName(value, workout).then((results) => {
                            matchingWorkouts = results
                            m.redraw()
                        })
                        title = value
                    }),
                }),
                m('div', matchingWorkouts.map((result) => {
                    return m('div', {
                        onclick: () => {
                            //vnode.attrs.updatePrescriptions(result.workout.prescriptions)
                            vnode.attrs.updateWorkout(result.workout)
                            vnode.attrs.showOverlayContent(false)
                        }
                    }, [
                        m('p', result.workout.name),
                        m('ul', result.programs.map((program) => {
                            return m('li', program.name)
                        })),
                        m('ul', result.workout.prescriptions.map((prescription) => {
                            return m('li', prescription.exercise.name)
                        }))
                    ])
                })),
                m('div', [
                    m('button', {
                        onclick: () => {vnode.attrs.showOverlayContent(false)}
                    }, 'Cancel'),
                    m('button', {
                        onclick: () => {
                            vnode.attrs.updateTitle(title)
                            vnode.attrs.showOverlayContent(false)
                        }
                    }, 'Save'),
                ])
            ]))
        }
    }
}
export default (attrs: EditTitleAttrs) => {
    return m(EditTitleComponent, attrs)
}
