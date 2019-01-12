import * as m from 'mithril'
import db from '../helpers/db'
import {Saveable, Program, Settings, Puttable, WorkoutAndLog, WorkoutLog} from '../types/exercise'
import {RenderPage} from '../ui/page'
import * as ProgramContents from './programContents'

interface ViewProgramAttrs {
    id: string
}
interface ViewProgramVnode {
    attrs: ViewProgramAttrs,
}
export default (vnode: ViewProgramVnode) => {
    let pageEditable = false
    let program: (Program & Puttable) = {
        _id: 'fake',
        name: '',
        schedule: [],
        tag: 'program',
    }
    let workoutsWithLogs: Array<WorkoutAndLog> = []
    db.fetchSaveableRecord<Program>(vnode.attrs.id).then((returnedProgram) => {
        program = returnedProgram
	const workouts = program.schedule
	workoutsWithLogs = []
	workouts.forEach(workout => {
	    const identifier = (workout.tag == 'workout' && workout.identifier) ? workout.identifier : ''
	    db.findLogsByWorkoutIdentifier(identifier).then(logs => {
		const workoutLogs = logs as Array<WorkoutLog & Puttable>
		const log = workoutLogs[workoutLogs.length - 1]
		let lastLog = {
		    date: 0,
		    id: '',
		}
		if (log) {
		    lastLog.date = log.date
		    lastLog.id = log._id
		}
		workoutsWithLogs.push({
		    ...workout,
		    lastLog
		})
		m.redraw() // TODO: Can we group this instead of
		           //       doing n redraws?
	    })
	})
    })

    return {
        view: (vnode: ViewProgramVnode) => {

            return m('div', [
                RenderPage({
                    pageEditable,
                    contents: {
			component: ProgramContents.component,
			attrs: {
                            program,
			    workoutsWithLogs,
                            pageEditable,
			}
                    }
                })
            ])
        }
    };
};
