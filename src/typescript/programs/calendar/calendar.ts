import * as m from 'mithril'
import {Workout, Rest, WorkoutAndLog} from '../../types/exercise'
import u from '../../helpers/utils'
import CalendarItem from './calendarItem'

interface CalendarAttrs {
    workouts: Array<WorkoutAndLog>,
    programUrl: string,
    beingEdited: boolean,
    moveUp: (index: number) => void,
    moveDown: (index: number) => void,
    remove: (index: number) => void,
    addWorkout: () => void,
    addRestDay: () => void,
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
		vnode.attrs.beingEdited ? m('div', {class: css.addWorkoutContainer}, [
		    m('button', {
                        onclick: vnode.attrs.addWorkout,
			class: css.button,
		    }, '+ Add a new workout'),
		    m('button', {
                        onclick: vnode.attrs.addRestDay,
			class: css.button,
		    }, '+ Add a rest day'),
                ]) : null,

		workouts.map((workout, index) => {
		    const moveUp = vnode.attrs.moveUp.bind(this, index)
		    const moveDown = vnode.attrs.moveDown.bind(this, index)
		    const remove = vnode.attrs.remove.bind(this, index)

		    return m('div', {class: css.calendarSquare}, [
			m('div', {class: css.numberColumn}, (index+1).toString()),
			m('div', {class: css.descriptionColumn}, CalendarItem({
			    workout,
			    beingEdited: vnode.attrs.beingEdited,
			    workoutUrl: `${vnode.attrs.programUrl}/workouts/${index}`,
			    moveUp: (index > 0) ? moveUp : null,
			    moveDown: (index < workouts.length - 1) ? moveDown : null,
			    remove,
			    css,
			}))
		    ])
		})
	    ])
	}
    }
}

export default (attrs: CalendarAttrs) => {
    return m(CalendarComponent, attrs)
}
