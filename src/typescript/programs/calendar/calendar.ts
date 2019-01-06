import * as m from 'mithril'
import {Workout, Rest} from '../../types/exercise'

interface CalendarAttrs {
    workouts: Array<Workout | Rest>,
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

	    return m('div', {class: css.calendar}, workouts.map((workout, index) => {
		const workoutDescription = workout.tag === 'rest' ? ''
                    : workout.prescriptions.map((prescription) => {
			return prescription.exercise.name
                    }).join(', ')

		return m('div', {class: css.calendarSquare}, [
		    m('div', {class: css.numberColumn}, (index+1).toString()),
		    m('div', {class: css.descriptionColumn}, [
			m('div',
			  m('a', {href: '#', class: css.workoutTitle},
			    workout.tag == 'workout'
			    ? (workout.name ? workout.name : 'Untitled Workout')
			    : 'Rest Day')),
			m('div', {class: css.workoutDescription}, m('div', [
			    m('p', workoutDescription),
			    m('p', {class: css.lastWorkout}, [
				'Last Workout: ',
				m('a', {class: css.dateLink, href: '#'}, 'Dec. 10, 2018'),
			    ]),
			]))
		    ]),
		])
	    }))
	}
    }
}

export default (attrs: CalendarAttrs) => {
    return m(CalendarComponent, attrs)
}
