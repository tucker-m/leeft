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
    let workoutsWithLogsState: Array<WorkoutAndLog> = []
    db.fetchSaveableRecord<Program>(vnode.attrs.id).then((returnedProgram) => {
        program = returnedProgram
	getWorkoutsWithLogs(program).then(workoutsWithLogs => {
	    workoutsWithLogsState = workoutsWithLogs
	    m.redraw()
	})
    })

    const moveUp = (index: number) => {
	let workout = program.schedule[index]
	let newArray = program.schedule.slice(0, index).
	    concat(
		program.schedule.slice(
		    index + 1, program.schedule.length
		)
	    )
        newArray.splice(index - 1, 0, workout)
        program.schedule = newArray
    }
    const moveDown = (index: number) => {
	let workout = program.schedule[index]
	let newArray = program.schedule.slice(0, index).
	    concat(
		program.schedule.slice(
		    index + 1, program.schedule.length
		)
	    )
        newArray.splice(index + 1, 0, workout)
        program.schedule = newArray
    }
    const remove = (index: number) => {
	program.schedule.splice(index, 1)
    }
    const addWorkout = () => {
	const dayNum = program.schedule.push({
            tag: 'workout',
	    identifier: Date.now().toString(),
            prescriptions: [],
            name: ''
	})
    }
    const addRestDay = () => {
	program.schedule.push({tag: 'rest'})
    }

    const getWorkoutsWithLogs = (program: Program) => {
	const workouts = program.schedule
	let workoutsWithLogs: Array<WorkoutAndLog> = []

	type logPromise = Promise<WorkoutAndLog>
	const workoutPromises: Array<logPromise> = workouts.map(workout => {
	    const identifier = (workout.tag == 'workout' && workout.identifier) ? workout.identifier : ''
	    return new Promise((resolve, reject) => {
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
		    const workoutAndLog: WorkoutAndLog = {
			...workout,
			lastLog
		    }
		    resolve(workoutAndLog)
		})
	    })
	})
	
	return Promise.all(workoutPromises)
    }

    return {
	onbeforeupdate: (vnode: ViewProgramVnode) => {
	    getWorkoutsWithLogs(program).then(workoutsWithLogs => {
		const old = JSON.stringify(workoutsWithLogsState)
		const newOne = JSON.stringify(workoutsWithLogs)
		if (old == newOne) {
		    return true
		}
		else{
		    workoutsWithLogsState = workoutsWithLogs
		    m.redraw()
		}
	    })

	},
        view: (vnode: ViewProgramVnode) => {
            return m('div', [
                RenderPage({
                    pageEditable,
                    contents: {
			component: ProgramContents.component,
			attrs: {
                            program,
			    workoutsWithLogs: workoutsWithLogsState,
                            pageEditable,
			    moveUp,
			    moveDown,
			    remove,
			    addWorkout,
			    addRestDay,
			}
                    }
                })
            ])
        }
    };
};
