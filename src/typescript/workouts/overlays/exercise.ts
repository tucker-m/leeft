import * as m from 'mithril'
import {Exercise, ExercisePrescription} from '../../types/exercise'
import {toJS} from 'mobx'
import db from '../../helpers/db'

interface ExerciseAttrs {
    prescription: ExercisePrescription,
    updatePrescription: (newPrescription: ExercisePrescription) => void,
    closeOverlay: () => void,
    css: any,
}
interface ExerciseVnode {
    attrs: ExerciseAttrs
}

const ExerciseOverlay = (vnode: ExerciseVnode) => {
    const css = vnode.attrs.css
    let matchingExercises: Array<Exercise> = []

    const prescription = toJS(vnode.attrs.prescription)
    let exercise = prescription.exercise
    let sets = prescription.sets
    let units = exercise.setUnits
    let amount = prescription.amount

    return {
        view: (vnode: ExerciseVnode) => {
            return m('div', [
                m('input[type=text]', {
                    value: exercise.name,
                    oninput: m.withAttr('value', (value) => {
                        exercise.name = value
                        db.findExercisesByName(exercise.name).then((results) => {
                            matchingExercises = results
                            m.redraw()
                        })
                    })
                }),
                matchingExercises.map((matchingExercise) => {
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
                }),
                m('div', [
                    m('input[type=number]', {
                        value: sets,
                        onchange: m.withAttr('value', (value: string) => {
                            sets = parseInt(value)
                        })
                    }),
                    m('span', 'sets'),
                ]),
                m('input[type=number]', {
                    value: amount,
                    onchange: m.withAttr('value', (value) => {
                        amount = parseInt(value)
                    }),
                }),
                m('span', units),
                m('div', [
                    m('input[type=radio][name=setUnits]', {
                        value: 'reps',
                        checked: units == 'reps',
                        onclick: m.withAttr('value', (value) => {
                            units = value
                        })
                    }),
                    m('label', 'reps'),
                    m('input[type=radio][name=setUnits]', {
                        value: 'seconds',
                        checked: units == 'seconds',
                        onclick: m.withAttr('value', (value) => {
                            units = value
                        })
                    }),
                    m('label', 'seconds'),
                ]),
                m('button', {
                    onclick: vnode.attrs.closeOverlay
                }, 'Cancel'),
                m('button', {
                    onclick: () => {
                        let newPrescription = Object.assign(prescription, {
                            exercise,
                            sets,
                        })
                        newPrescription.exercise.setUnits = units
                        vnode.attrs.updatePrescription(newPrescription)
                        vnode.attrs.closeOverlay()
                    }
                }, 'Save'),
            ])
        }
    }
}

export default ExerciseOverlay
