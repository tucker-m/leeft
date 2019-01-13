import * as m from 'mithril'
import {Workout} from '../types/exercise'

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

const combineStyles = (styles: Array<string>) => {
    return styles.join(' ')
}

const getWorkoutName = (workout: Workout) => {
    return workout.name ? workout.name : 'Untitled Workout'
}

const getWorkoutNameElement = (workout: Workout, css: any) => {
    const className = workout.name ? '' : css.untitled
    return m('span', {class: className}, getWorkoutName(workout))
}

const getWorkoutExercises = (workout: Workout) => {
    if (workout.prescriptions.length == 0) {
	return 'This workout has no exercises.'
    }
    else {
	return workout.prescriptions.map(prescription => {
	    return prescription.exercise.name
	}).join(', ')
    }
}

const getWorkoutExercisesElement = (workout: Workout, css: any, classes: Array<string> = []) => {
    const untitledClass = workout.prescriptions.length == 0 ? css.untitled : ''
    return m('span', {
	class: combineStyles([...classes, untitledClass])
    }, getWorkoutExercises(workout))
}

export default {
    formatDate,
    combineStyles,
    getWorkoutNameElement,
    getWorkoutExercisesElement,
};
