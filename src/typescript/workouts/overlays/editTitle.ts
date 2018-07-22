import * as m from 'mithril'
import db from '../../helpers/db'
import {Workout, ExercisePrescription} from '../../types/exercise'

interface EditTitleAttrs {
    title: string,
    workout: Workout,
    css: any,
    hideOverlay: () => void,
    updateWorkout: (Workout) => void,
}
interface ComponentVnode {
    attrs: EditTitleAttrs
}

const EditTitleComponent = (vnode: ComponentVnode) => {
    let matchingWorkouts: Array<any> = []
    let title = vnode.attrs.title
    let workout = vnode.attrs.workout
    let css = vnode.attrs.css

    return {
        view: (vnode: ComponentVnode) => {
            return m('div', [
                m('div', {class: css.labelOnTopGroup}, [
                    m('label', {class: css.label}, 'Title'),
                    m('div', {class: css.formRow}, [
                        m('input[type=text]', {
                            value: title,
                            oninput: m.withAttr('value', (value) => {
                                db.findWorkoutsByName(value, workout).then((results) => {
                                    matchingWorkouts = results
                                    m.redraw()
                                })
                                title = value
                            }),
                            class: css.textInput,
                        }),
                        m('div', [
                            m('button', {
                                onclick: () => {
                                    workout.name = title
                                    vnode.attrs.updateWorkout(workout)
                                    vnode.attrs.hideOverlay()
                                },
                                class: css.button,
                            }, 'Save'),
                            m('button', {
                                onclick: () => {vnode.attrs.hideOverlay()},
                                class: css.hollowButton,
                            }, 'Cancel'),
                        ]),
                    ]),
                ]),
                m('div', matchingWorkouts.map((result) => {
                    return m('div', {class: css.card}, [
                        m('p', result.workout.name),
                        m('button', {
                            class: css.button,
                            onclick: () => {
                                vnode.attrs.updateWorkout(result.workout)
                                vnode.attrs.hideOverlay()
                            }
                        }, 'Copy this workout'),
                        m('p', {class: css.subTitle}, 'from ' + result.programs.map((program) => {
                            return program.name
                        }).join(', ')),
                        m('ul', {class: css.list}, result.workout.prescriptions.map((prescription) => {
                            return m('li', {class: css.item}, prescription.exercise.name)
                        }))
                    ])
                })),
            ])
        }
    }
}
export default EditTitleComponent
