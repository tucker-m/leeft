import * as m from 'mithril'
import u from '../../helpers/utils'
import {WorkoutAndLog} from '../../types/exercise'
import EditButtons from './editButtons'

interface CalendarItemAttrs {
    workout: WorkoutAndLog,
    beingEdited: boolean,
    workoutUrl: string,
    moveUp?: () => void,
    moveDown?: () => void,
    remove: () => void,
    css: any,
}
interface CalendarItemVnode {
    attrs: CalendarItemAttrs
}

const CalendarItem = (vnode: CalendarItemVnode) => {
    const css = vnode.attrs.css

    return {
	view: (vnode: CalendarItemVnode) => {
	    const workout = vnode.attrs.workout
	    const workoutInfo = u.getNameAndClasses(workout, css)

	    return [
		m('div',
		  m('a', {
		      href: vnode.attrs.workoutUrl,
		      oncreate: m.route.link,
		      class: u.c(css.workoutTitle, workoutInfo.classes)
		  }, workoutInfo.name)
		 ),
		m('div', {class: css.workoutDescription}, m('div', [
		    m('p', workout.tag == 'workout' ? u.getWorkoutExercisesElement(workout, css) : ''),
		    m('p', {class: css.lastWorkout},
		      vnode.attrs.beingEdited
		      ? EditButtons({
			  moveUp: vnode.attrs.moveUp,
			  moveDown: vnode.attrs.moveDown,
			  remove: vnode.attrs.remove,
			  css,
		      })
		      : ['Last Workout: ',
			 m('a', {
			     class: css.dateLink,
			     href: `/logs/${workout.lastLog.id}`,
			     oncreate: m.route.link,
			 }, u.formatDate(workout.lastLog.date))],
		     ),
		]))
	    ]
	}
    }
}

export default (attrs: CalendarItemAttrs) => {
    return m(CalendarItem, attrs)
}
