import * as m from 'mithril'
import {Exercise, Workout, ExercisePrescription} from '../../../types/exercise'
import {toJS} from 'mobx'
import db from '../../../helpers/db'
import DropDown from './components/search/dropdown'

interface ExerciseAttrs {
    prescription: ExercisePrescription,
    updatePrescription: (newPrescription: ExercisePrescription) => void,
    hideOverlay: () => void,
    deleteOnCancel?: () => void,
    css: any,
}
interface ExerciseVnode {
    attrs: ExerciseAttrs
}

const title = 'Edit Exercise'

const ExerciseOverlay = (vnode: ExerciseVnode) => {
    const css = vnode.attrs.css
    let matchingExercises: Array<{exercise: Exercise, workout: Workout}> = []

    const prescription = toJS(vnode.attrs.prescription)
    let exercise = prescription.exercise
    let resultsShowing = false

    return {
        view: (vnode: ExerciseVnode) => {
	    const setResultsShowing = (show: boolean) => { resultsShowing = show }
            return [
                m('div', [
                    m('div', {class: css.labelOnTopGroup}, [
                        m('label', {class: css.label}, 'Title'),
                        m('input[type=text]', {
                            value: exercise.name,
                            placeholder: 'Unnamed Exercise',
                            oninput: m.withAttr('value', (value) => {
                                exercise.name = value
                                if (exercise.name.length == 0) {
                                    matchingExercises = []
                                }
                                else {
                                    db.findExercisesByName(exercise.name).then((results) => {
                                        matchingExercises = results
                                        m.redraw()
                                    })
                                }
                            }),
                            class: css.textInput,
                        }),
                        exercise.name.length > 0 && matchingExercises.length > 0 ?
                            DropDown({
                                css: css,
                                updateExercise: (newExercise: Exercise) => {
                                    exercise = newExercise
                                    matchingExercises = []
                                },
                                matchingExercises,
				resultsShowing,
				setResultsShowing,
                            })
                            : null,
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
                m('div', {class: css.bottomButtons}, [
                    m('button', {
                        class: css.hollowButton,
                        onclick: () => {
			    if (vnode.attrs.deleteOnCancel) {
				vnode.attrs.deleteOnCancel()
			    }
			    vnode.attrs.hideOverlay()
			}
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
            ]
        }
    }
}

export default {
    component: ExerciseOverlay,
    title: title
}
