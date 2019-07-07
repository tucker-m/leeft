import * as m from 'mithril'
import {Workout, Set} from '../../../types/exercise'
import {toJS} from 'mobx'
import db from '../../../helpers/db'
import DropDown from './components/search/dropdown'

interface ExerciseAttrs {
    prescription: Set,
    updatePrescription: (newPrescription: Set) => void,
    hideOverlay: () => void,
    deleteOnCancel?: () => void,
    css: any,
}
interface ExerciseVnode {
    attrs: ExerciseAttrs
}

const ExerciseOverlay = (vnode: ExerciseVnode) => {
    const css = vnode.attrs.css
    let matchingExercises: Array<Set> = []

    const prescription = toJS(vnode.attrs.prescription)
    let exercise = prescription
    let resultsShowing = false

    return {
        view: (vnode: ExerciseVnode) => {
	    const setResultsShowing = (show: boolean) => { resultsShowing = show }
            return [
                m('div', [
                    m('div', {class: css.labelOnTopGroup}, [
                        m('label', {class: css.label}, 'Title'),
                        m('input[type=text]', {
                            value: exercise.exerciseName,
                            placeholder: 'Unnamed Exercise',
                            oninput: m.withAttr('value', (value) => {
                                exercise.exerciseName = value
                                if (exercise.exerciseName.length == 0) {
                                    matchingExercises = []
                                }
                                else {
                                    db.findExercisesByName(exercise.exerciseName).then((results) => {
                                        matchingExercises = results.map(result => {
					    const reps = !result.reps ? false : {prescribed: 0, entered: 0}
					    const weight = !result.weight ? false : {prescribed: 0, entered: 0}
					    const time = !result.time ? false : {prescribed: 0, entered: 0}
					    const newSet: Set = {
						exerciseName: result.exerciseName,
						reps,
						weight,
						time,
					    }
					    return newSet
					})
                                        m.redraw()
                                    })
                                }
                            }),
                            class: css.textInput,
                        }),
                        exercise.exerciseName.length > 0 && matchingExercises.length > 0 ?
                            DropDown({
                                css: css,
                                updateExercise: (newExercise: Set) => {
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
			    // TODO: create UI for entering sets and reps
                        ]),
                        m('div', [
			    // TODO: create UI for entering sets and reps (or other unit type)
                        ]),
                    ]),
                    m('div', {class: css.labelOnLeftGroup}, [
                        m('label', {class: css.label}, 'Measured in'),
			// TODO: create UI for entering sets and reps (or other unit type)
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
}
