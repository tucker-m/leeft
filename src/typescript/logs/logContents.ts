import * as m from 'mithril'
import EditableHeading from '../ui/editableHeading'
import Heading from '../ui/heading'
import {TopBar} from '../ui/topBar'
import {Puttable, WorkoutLog, Set, SetGroup} from '../types/exercise'
import utils from '../helpers/utils'
import {PageDefaultAttrs} from '../ui/page'
import ExerciseOverlay from '../workouts/overlays/exercise/exercise'
import SetCount from './setCount'
import ExerciseHistory from './exerciseHistory'
import db from '../helpers/db'
import InsertExerciseButton from '../ui/insertExerciseButton'
import SetWithUnits from '../ui/setWithUnits'

interface attrs {
    log: WorkoutLog & Puttable,
    programUrl: string,
}
interface LogVnode {
    attrs: attrs & PageDefaultAttrs
}

const component: m.FactoryComponent<any> = (vnode: LogVnode) => {
    let log = vnode.attrs.log

    let pageEditable = false

    return {
	view: (vnode: LogVnode) => {
	    const css = vnode.attrs.css
	    const setOverlay = vnode.attrs.setOverlay
	    let log = vnode.attrs.log

	    return [
                TopBar({
		    buttons: [{
			text: !pageEditable ? 'Make Changes' : 'Done',
			action: () => { pageEditable = !pageEditable },
			secondState: {
			    text: pageEditable ? 'EditWorkout' : 'Done Editing',
			    action: () => { pageEditable = !pageEditable },
			}
		    }],
		    subTitle: {
			text: `< ${log.workout.name}`,
			url: vnode.attrs.programUrl,
		    },
		    css: css,
		    editButtonShowing: false,
		}),
		m('div', {class: css.content}, [
                    EditableHeading({
			level: 2,
			name: utils.formatDate(log.date),
			placeholder: '',
			showEditButton: false,
			css,
		    }),
		    log.sets.map((setGroup, index) => {
			return m('div', [
			    m('div', {class: css.exerciseLogContainer}, [
				Heading({
				    level: 1,
				    text: setGroup.exerciseName ? setGroup.exerciseName : 'Untitled Exercise',
				    css,
				}),
				setGroup.sets.length == 0
				    ? m('p', 'No sets added for this exercise.')
				    : m('div', [
					m(SetWithUnits, {
					    setGroup,
					    showLogButton: true,
					    showEditButtons: pageEditable,
					    setOverlay,
					    css,
					}),
					m(ExerciseHistory, {
					    exerciseName: setGroup.exerciseName,
					    priorTo: log._id,
					    css,
					}),
				]),
			    ]),
			    pageEditable
				? InsertExerciseButton({
				    css,
				    onclick: () => {
					const prescription = {
					    exercise: {
						name: '',
						setUnits: 'reps',
						tag: 'exercise',
					    },
					    sets: 0,
					    amount: 0,
					}
					vnode.attrs.setOverlay(ExerciseOverlay, {
					    title: 'Insert new exercise',
					    prescription,
					    updateWorkoutLog: (newSetGroup: SetGroup) => {
						log.sets.splice(index+1, 0, newSetGroup)
					    },
					    css,
					    hideOverlay: () => {
						vnode.attrs.setOverlay({component: null, title: ''}, {})
					    },
					})
				    }
				})
				: null,
			])
                    }),
                    m('p', log.comments),
		]),
            ]
	}
    }
}

export {
    component,
    attrs,
}
