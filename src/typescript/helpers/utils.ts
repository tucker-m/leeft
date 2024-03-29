import * as m from 'mithril'
import {Workout, Rest, NamedObject, Saveable} from '../types/exercise'

const formatDate = (timestamp: number) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const date = new Date(timestamp)
    const month = months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    const hour = date.getHours() % 12
    const meridian = (date.getHours() / 12) <= 1 ? 'am' : 'pm'
    const minutes = date.getMinutes()
    return month + ' ' + day + ', ' + year + ' at ' + hour + ':' + minutes.toString().padStart(2, '0') + meridian
}

const shortDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const today = new Date()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    const currentYear = today.getFullYear()

    return `${month}/${day}${year == currentYear ? '' : '/' + year}`
}

const c = (...styles: Array<string>) => {
    return styles.join(' ')
}

const getName: (obj: (NamedObject | Rest) & Saveable) => string =
    (obj: NamedObject & Saveable) => {
	switch (obj.tag) {
	    case 'workout':
		return obj.name ? obj.name : 'Untitled Workout'
	    case 'rest':
		return 'Rest Day'
	    case 'program':
		return obj.name ? obj.name : 'Untitled Program'
	    default: return obj.name
	}
    }

const getNameAndClasses: (obj: (NamedObject | Rest) & Saveable, css: any) => {name: string, classes: string} = (obj: NamedObject & Saveable, css: any) => {
    const classes = obj.name ? '' : css.untitled
    return {
	name: getName(obj),
	classes
    }
}

const getWorkoutExercises = (workout: Workout) => {
    if (workout.prescriptions.length == 0) {
	return 'This workout has no exercises.'
    }
    else {
	return workout.prescriptions.map(prescription => {
	    return prescription.exerciseName
	}).join(', ')
    }
}

const getWorkoutExercisesElement = (workout: Workout, css: any, classes: Array<string> = []) => {
    const untitledClass = workout.prescriptions.length == 0 ? css.untitled : ''
    return m('span', {
	class: c(...classes, untitledClass)
    }, getWorkoutExercises(workout))
}

export default {
    formatDate,
    shortDate,
    c,
    getNameAndClasses,
    getWorkoutExercisesElement,
};
