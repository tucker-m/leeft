import * as m from 'mithril'
import {Workout, Set, SetGroup} from '../../../types/exercise'
import {toJS} from 'mobx'
import db from '../../../helpers/db'
import DropDown from './components/search/dropdown'

interface ExerciseAttrs {
    setGroup: SetGroup,
    updateSetGroup: (newSetGroup: SetGroup) => void,
    hideOverlay: () => void,
    deleteOnCancel?: () => void,
    css: any,
}
interface ExerciseVnode {
    attrs: ExerciseAttrs
}

const ExerciseOverlay = (vnode: ExerciseVnode) => {
    const css = vnode.attrs.css
    let matchingExercises: string[] = []

    const setGroup = toJS(vnode.attrs.setGroup)
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
                            value: setGroup.exerciseName,
                            placeholder: 'Unnamed Exercise',
                            oninput: m.withAttr('value', (value) => {
                                setGroup.exerciseName = value
                                if (setGroup.exerciseName.length == 0) {
                                    matchingExercises = []
                                }
                                else {
                                    db.findExercisesByName(setGroup.exerciseName).then((results) => {
                                        matchingExercises = results
                                        m.redraw()
                                    })
                                }
                            }),
                            class: css.textInput,
                        }),
                        setGroup.exerciseName.length > 0 && matchingExercises.length > 0 ?
                            DropDown({
                                css: css,
                                updateExercise: (newName: string) => {
                                    setGroup.exerciseName = newName
                                    matchingExercises = []
                                },
                                matchingExercises,
				resultsShowing,
				setResultsShowing,
                            })
                            : null,
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
				vnode.attrs.updateSetGroup(setGroup)
				vnode.attrs.hideOverlay()
                            }
			}, 'Save'),
                    ]),
		])
	    ]
        }
    }
}

export default {
    component: ExerciseOverlay,
}
