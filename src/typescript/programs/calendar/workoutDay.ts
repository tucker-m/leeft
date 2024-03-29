import * as m from 'mithril'
import u from '../../helpers/utils'
import {WorkoutAndLog} from '../../types/exercise'
import EditButtons from './editButtons'

interface CalendarItemAttrs {
    workout: WorkoutAndLog,
    beingEdited: boolean,
    workoutUrl: string,
    editTitleOverlay: () => void,
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
	    const beingEdited = vnode.attrs.beingEdited
	    const href = vnode.attrs.workoutUrl + (beingEdited ? '/edit' : '')
	    return [
		m('div',
		  m('a', {
		      href,
		      oncreate: m.route.link,
		      class: u.c(css.workoutTitle, workoutInfo.classes)
		  }, workoutInfo.name),
		  vnode.attrs.beingEdited
		  ? [
		      m('a', {
			  class: u.c(css.button, css.small),
			  onclick: vnode.attrs.editTitleOverlay,
		      }, 'Rename'),
		      m('a', {
			  class: u.c(css.button, css.small),
			  oncreate: m.route.link,
			  href,
		      }, 'Edit')
		  ]
		  : null,
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
		      : (workout.lastLog.id
			 ? ['Last Workout: ',
			    m('a', {
				class: css.dateLink,
				href: `/logs/${workout.lastLog.id}`,
				oncreate: m.route.link,
			    }, u.formatDate(workout.lastLog.date))]
			 : null),
		     ),
		]))
	    ]
	}
    }
}

export default (attrs: CalendarItemAttrs) => {
    return m(CalendarItem, attrs)
}
