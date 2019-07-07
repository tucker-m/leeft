import * as m from 'mithril'
import {Saveable, Saved, Puttable, Workout, WorkoutLog } from '../types/exercise'
import db from '../helpers/db'
import utils from '../helpers/utils'

interface WorkoutLogAttrs {
    workout: Workout,
    css: any,
}
interface WorkoutLogVnode {
    attrs: WorkoutLogAttrs
}

let logs: Array<WorkoutLog & Saveable> = []

const WorkoutLogComponent = (vnode: WorkoutLogVnode) => {
    const css = vnode.attrs.css
    db.findLogsByWorkoutIdentifier(vnode.attrs.workout.identifier).then((results) => {
        logs = results
        m.redraw()
    })

    return {
        view: (vnode: WorkoutLogVnode) => {
            let reverseMe = JSON.parse(JSON.stringify(logs))
            return logs.length > 0
		? (m('div', [
                    m('h3', {class: css.workoutLogsHeader}, 'Past Workouts'),
                    reverseMe.reverse().map((log) => {
			return m('p', [
                            m('a', {
				class: css.aSecondary,
				href: '/logs/' + log._id,
				oncreate: m.route.link,
                            }, utils.formatDate(log.date)),
                            m('span', ' - ' + log.comments),
			])
                    })
		]))
		: m('p', "You haven't done this workout yet.")
        }
    }
}

export default (attrs: WorkoutLogAttrs) => {
    return m(WorkoutLogComponent, attrs)
}
