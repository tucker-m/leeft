import * as m from 'mithril'
import {Exercise, ExercisePrescription} from '../../types/exercise'
import {toJS} from 'mobx'

interface ExerciseAttrs {
    prescription: ExercisePrescription,
    updatePrescription: (newPrescription: ExercisePrescription) => void,
    closeOverlay: () => void,
}
interface ExerciseVnode {
    attrs: ExerciseAttrs
}

const ExerciseOverlay = (vnode: ExerciseVnode) => {
    const prescription = toJS(vnode.attrs.prescription)
    let exercise = prescription.exercise
    let exerciseName = exercise.name
    let sets = prescription.sets
    let units = exercise.setUnits
    let amount = prescription.amount

    return {
        view: (vnode: ExerciseVnode) => {
            return m('div', [
                m('input[type=text]', {
                    value: exerciseName,
                    oninput: m.withAttr('value', (value) => {
                        exerciseName = value
                    })
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
                        newPrescription.exercise.name = exerciseName
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
