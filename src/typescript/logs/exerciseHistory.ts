import * as m from 'mithril'
import db from '../helpers/db'
import {WorkoutLog} from '../types/exercise'

export default (vnode) => {
    let priorTo = vnode.attrs.priorTo
    let exerciseName = vnode.attrs.exerciseName

    // Get the log history, and save it as a state of this component
    let history: Array<WorkoutLog> = []
    db.findLogsContainingExercise(exerciseName, priorTo).then(results => {
	history = results
	m.redraw()
    })
    
    return {
	view: (vnode) => {
	    debugger
	    if (history.length) {
		return m('div', [
		    history[0].sets.filter(set => {
			return set.exercise.name == exerciseName && set.log
		    }).map(set => {
			debugger
			if (set.log) {
			    return m('p', `${set.log.reps} at ${set.log.amount}`)
			}
			else {
			    return m('p', '')
			}
		    })
		])
	    }
	}
    }
}
