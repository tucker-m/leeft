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

    const toggleUnits = (unitObject) => {
	interface UnitObject {
	    prescribed: false | number,
	    entered: false | number
	}
	if (unitObject) {
	    return false
	}
	else {
	    const obj: UnitObject = {
		prescribed: false,
		entered: false,
	    }
	    return obj
	}
    }

    const setAssignedValue = (unitObject, value) => {
	return Object.assign({}, {
	    prescribed: value,
	    entered: unitObject.entered || false,
	})
    }

    const getValue = (unitObject) => {
	return (unitObject && unitObject.prescribed)
	    ? unitObject.prescribed
	    : ''
    }

    return {
        view: (vnode: ExerciseVnode) => {
	    const setResultsShowing = (show: boolean) => { resultsShowing = show }
            return [
                m('div', [
                    m('div', {class: css.labelOnTopGroup}, [
                        m('label', {class: css.label}, 'Exercise name'),
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
                    m('div', {class: css.labelOnLeftGroup}, [
                        m('label', {class: css.label}, 'Measured in'),
			m('div', {class: css.formRow}, [
			    m('input[type=checkbox]', {
				class: css.checkbox,
				onclick: () => {exercise.reps = toggleUnits(exercise.reps)},
				checked: !!exercise.reps
			    }),
			    m('label', {
				class: css.label,
			    }, 'Reps'),
			    m('input[type=text]', {
				class: css.textInput,
				onchange: m.withAttr('value', value => {
				    exercise.reps = setAssignedValue(exercise.reps, value)
				}),
				disabled: !exercise.reps,
				value: getValue(exercise.reps),
				placeholder: '(optional) assigned reps'
			    }),
			]),
			m('div', {class: css.formRow}, [
			    m('input[type=checkbox]', {
				class: css.checkbox,
				onclick: () => {exercise.weight = toggleUnits(exercise.weight)},
				checked: !!exercise.weight
			    }),
			    m('label', {
				class: css.label,
			    }, 'Pounds'),
			    m('input[type=text]', {
				class: css.textInput,
				onchange: m.withAttr('value', value => {
				    exercise.weight = setAssignedValue(exercise.weight, value)
				}),
				disabled: !exercise.weight,
				value: getValue(exercise.weight),
				placeholder: '(optional) assigned pounds'
			    })
			]),
			m('div', {class: css.formRow}, [
			    m('input[type=checkbox]', {
				class: css.checkbox,
				onclick: () => {exercise.time = toggleUnits(exercise.time)},
				checked: !!exercise.time,
			    }),
			    m('label', {
				class: css.label,
			    }, 'Time'),
			    m('input[type=text]', {
				class: css.textInput,
				onchange: m.withAttr('value', value => {
				    exercise.time = setAssignedValue(exercise.time, value)
				}),
				value: getValue(exercise.time),
				disabled: !exercise.time,
				placeholder: '(optional) assigned seconds'
			    })
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
                            vnode.attrs.updatePrescription(exercise)
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
