import * as m from 'mithril'
import {Workout, WorkoutAndLog} from '../../types/exercise'
import u from '../../helpers/utils'
import WorkoutDay from './workoutDay'
import RestDay from './restDay'
import WorkoutTitleOverlay from '../../workouts/overlays/editTitle'

interface CalendarAttrs {
    workouts: Array<WorkoutAndLog>,
    programUrl: string,
    beingEdited: boolean,
    setOverlay: (content: any, attrs: any) => void,
    moveUp: (index: number) => void,
    moveDown: (index: number) => void,
    remove: (index: number) => void,
    addWorkout: () => void,
    addRestDay: () => void,
    updateWorkout: (workout: Workout, index: number) => void,
    css: any,
}
interface CalendarVnode {
    attrs: CalendarAttrs
}

const CalendarComponent = (vnode: CalendarVnode) => {
    const css = vnode.attrs.css
    
    return {
	view: (vnode: CalendarVnode) => {
	    const workouts = vnode.attrs.workouts

	    return m('div', {class: css.calendar}, [
		workouts.map((workout, index) => {
		    const moveUp = vnode.attrs.moveUp.bind(this, index)
		    const moveDown = vnode.attrs.moveDown.bind(this, index)
		    const remove = vnode.attrs.remove.bind(this, index)

		    return m('div', {class: css.calendarSquare}, [
			m('div', {class: css.numberColumn}, (index+1).toString()),
			m('div', {class: css.descriptionColumn},
			  workout.tag == 'workout'
			  ? WorkoutDay({
			      workout,
			      beingEdited: vnode.attrs.beingEdited,
			      editTitleOverlay: () => {
				  vnode.attrs.setOverlay(WorkoutTitleOverlay, {
				      workout,
				      css,
				      hideOverlay: () => {
					  vnode.attrs.setOverlay({component: null, title: ''}, {})
				      },
				      updateWorkout: (newWorkout: Workout) => {
					  vnode.attrs.updateWorkout(newWorkout, index)
				      }
				  })
			      },
			      workoutUrl: `${vnode.attrs.programUrl}/workouts/${index}`,
			      moveUp: (index > 0) ? moveUp : null,
			      moveDown: (index < workouts.length - 1) ? moveDown : null,
			      remove,
			      css,
			  })
			  : RestDay({
			      beingEdited: vnode.attrs.beingEdited,
			      moveUp: (index > 0) ? moveUp : null,
			      moveDown: (index < workouts.length - 1) ? moveDown : null,
			      remove,
			      css,
			  })
			 )
		    ])
		})
	    ])
	}
    }
}

export default (attrs: CalendarAttrs) => {
    return m(CalendarComponent, attrs)
}
