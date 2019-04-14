import * as m from 'mithril'
import db from '../helpers/db'
import u from '../helpers/utils'
import {WorkoutLog, Saved} from '../types/exercise'

export default (vnode) => {
    let priorTo = vnode.attrs.priorTo
    let exerciseName = vnode.attrs.exerciseName

    // Get the log history, and save it as a state of this component
    let history: Array<WorkoutLog & Saved> = []
    db.findLogsContainingExercise(exerciseName, priorTo).then(results => {
	history = results
	m.redraw()
    })
    
    return {
	view: (vnode) => {
	    if (history.length) {
		const log = history[0]
		return m('div', [
		    m('p', m('span', [
			'On ',
			m('a', {
			    href: `/logs/${log._id}`,
			    oncreate: m.route.link,
			}, u.formatDate(log.date))
		    ])),
		    log.sets.filter(set => {
			return set.exercise.name == exerciseName && set.log
		    }).map(set => {
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
