import * as m from 'mithril'
import {Exercise, ExercisePrescription} from '../../types/exercise'
import {toJS} from 'mobx'
import db from '../../helpers/db'

interface ExerciseAttrs {
    prescription: ExercisePrescription,
    updatePrescription: (newPrescription: ExercisePrescription) => void,
    hideOverlay: () => void,
    css: any,
}
interface ExerciseVnode {
    attrs: ExerciseAttrs
}

const title = 'Edit Exercise'

const ExerciseOverlay = (vnode: ExerciseVnode) => {
    const css = vnode.attrs.css
    let matchingExercises: Array<Exercise> = []

    const prescription = toJS(vnode.attrs.prescription)
    let exercise = prescription.exercise

    return {
        view: (vnode: ExerciseVnode) => {
            return [
                m('div', [
                    m('div', {class: css.labelOnTopGroup}, [
                        m('label', {class: css.label}, 'Title'),
                        m('input[type=text]', {
                            value: exercise.name,
                            placeholder: 'Unnamed Exercise',
                            oninput: m.withAttr('value', (value) => {
                                exercise.name = value
                                db.findExercisesByName(exercise.name).then((results) => {
                                    matchingExercises = results
                                    m.redraw()
                                })
                            }),
                            class: css.textInput,
                        }),
                    ]),
                    m('div', {class: css.labelOnTopGroup}, [
                        m('label', {class: css.label}, 'Sets & Reps'),
                        m('div', [
                            m('input[type=number]', {
                                class: css.textInput,
                                value: prescription.sets,
                                onchange: m.withAttr('value', (value: string) => {
                                    prescription.sets = parseInt(value)
                                })
                            }),
                            m('label', {class: css.label}, 'sets'),
                        ]),
                        m('div', [
                            m('input[type=number]', {
                                class: css.textInput,
                                value: prescription.amount,
                                onchange: m.withAttr('value', (value) => {
                                    prescription.amount = parseInt(value)
                                }),
                            }),
                            m('label', {class: css.label}, exercise.setUnits),
                        ]),
                    ]),
                    m('div', {class: css.labelOnLeftGroup}, [
                        m('label', {class: css.label}, 'Measured in'),
                        m('select', {
                            class: css.selectInput,
                            onchange: m.withAttr('value', (value) => {
                                exercise.setUnits = value
                            })
                        }, [
                            m('option', {
                                value: 'reps',
                                selected: exercise.setUnits == 'reps'
                            }, 'Reps'),
                            m('option', {
                                value: 'seconds',
                                selected: exercise.setUnits == 'seconds'
                            }, 'Seconds'),
                        ]),
                    ]),
                ]),
                m('div', [
                    m('button', {
                        class: css.hollowDangerButton,
                        onclick: vnode.attrs.hideOverlay
                    }, 'Cancel'),
                    m('button', {
                        class: css.button,
                        onclick: () => {
                            let newPrescription = Object.assign(prescription, {
                                exercise,
                            })
                            vnode.attrs.updatePrescription(newPrescription)
                            vnode.attrs.hideOverlay()
                        }
                    }, 'Save'),
                ]),
                matchingExercises.length > 0 ?
                    m('div', {
                        class: css.overlayResultsContainer
                    }, matchingExercises.map((matchingExercise) => {
                        return m('div', {
                            class: css.card,
                        }, [
                            m('h3', {class: css.h3}, matchingExercise.name),
                            m('button', {
                                class: css.button,
                                onclick: () => {
                                    exercise = matchingExercise
                                    // TODO: Re-run the search (as though there was
                                    // user input) at this point.
                                }
                            }, 'Use this exercise'),
                            m('p', {class: css.subTitle}, `Measured in ${matchingExercise.setUnits}`),
                        ])
                    }))
                    : null,
            ]
        }
    }
}

export default {
    component: ExerciseOverlay,
    title: title
}
