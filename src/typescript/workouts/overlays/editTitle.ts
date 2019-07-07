import * as m from 'mithril'
import db from '../../helpers/db'
import {Workout} from '../../types/exercise'
import {toJS} from 'mobx'

interface EditTitleAttrs {
    workout: Workout,
    css: any,
    hideOverlay: () => void,
    updateWorkout: (Workout) => void,
}
interface ComponentVnode {
    attrs: EditTitleAttrs
}

const title = 'Edit Workout Name'

const EditTitleComponent = (vnode: ComponentVnode) => {
    let matchingWorkouts: Array<any> = []
    let workout = toJS(vnode.attrs.workout)
    let css = vnode.attrs.css

    return {
        view: (vnode: ComponentVnode) => {
            return m('div', [
                m('div', {class: css.labelOnTopGroup}, [
                    m('label', {class: css.label}, 'Title'),
                    m('div', {class: css.formRow}, [
                        m('input[type=text]', {
                            value: workout.name,
			    placeholder: 'Untitled Workout',
                            oninput: m.withAttr('value', (value) => {
                                workout.name = value
                                if (value.length == 0) {
                                    matchingWorkouts = []
                                }
                                else {
                                    db.findWorkoutsByName(value, workout).then((results) => {
                                        matchingWorkouts = results
                                        m.redraw()
                                    })
                                }
                            }),
                            class: css.textInput,
                        }),
                        m('div', [
                            m('button', {
                                onclick: () => {
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
                matchingWorkouts.length > 1 ?
                    m('div', {class: css.resultDescription}, m('p', 'copy an existing workout:'))
                    : null,
                m('div', matchingWorkouts.map((result) => {
                    return m('div', {
                        class: css.workoutResult,
                        onclick: () => {
                            vnode.attrs.updateWorkout(result.workout)
                            vnode.attrs.hideOverlay()
                        },
                    }, [
                        m('a', {
                            class: css.a,
                            onclick: (event) => {
                                event.preventDefault()
                                vnode.attrs.updateWorkout(result.workout)
                                vnode.attrs.hideOverlay()
                            },
                            href: '#',
                        }, result.workout.name),
                        m('span', {class: css.subTitle}, result.programs.map((program) => {
                            return program.name
                        }).join(', ')),
                        m('p', {
                            class: css.workoutResultSubtitle,
                        }, result.workout.prescriptions.map((prescription) => {
                            return prescription.exercise.name
}).join(', '))
                    ])
                })),
            ])
        }
    }
}
export default {
    component: EditTitleComponent,
    title: title
}
