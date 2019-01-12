import * as m from 'mithril'
import {Program, Workout, Puttable, WorkoutAndLog} from '../types/exercise'
import db from '../helpers/db'
import EditableH1 from '../ui/editableH1'
import WorkoutTable from '../ui/workoutTable'
import EditTitleOverlay from './overlays/editTitle'
import {PageDefaultAttrs} from '../ui/page'
import {TopBar} from '../ui/topBar'
import Calendar from './calendar/calendar'

interface attrs {
    program: Program & Puttable,
    workoutsWithLogs: Array<WorkoutAndLog>,
}

interface ContentVnode {
    attrs: attrs & PageDefaultAttrs
}

const component = (vnode: ContentVnode) => {
    let selectedIndex = 0
    const css = vnode.attrs.css
    let pageEditable = vnode.attrs.editButtonShowing

    return {
        view: (vnode: ContentVnode) => {
            const program = vnode.attrs.program
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
		setTimeout(() => {
		    window.location.href = `#!/programs/${program._id}/workouts/${dayNum - 1}/edit`
		}, 400)
	    }
	    const addRestDay = () => {
		program.schedule.push({tag: 'rest'})
	    }

            return [
		TopBar({
		    buttons: [{
			text: 'Edit Program',
			action: () => { pageEditable = true },
			secondState: {
			    text: 'Done Editing',
			    action: () => { pageEditable = false },
			}
		    }],
		    editOptions: {
			editButtonShowing: pageEditable,
			openModal: () => {
			    vnode.attrs.setOverlay(EditTitleOverlay, {
				title: program.name,
				css: css,
				hideOverlay: () => {
                                    vnode.attrs.setOverlay({component: null, title: ''}, {})
				},
				updateTitle: (newTitle: string) => {
                                    program.name = newTitle
				}
			    })
			},
		    },
		    title: program.name,
		    placeholder: 'Untitled Program',
		    css: css,
		}),
                m('div', {class: css.content}, [
		    Calendar({
			workouts: vnode.attrs.workoutsWithLogs,
			programUrl: `/programs/${program._id}`,
			beingEdited: pageEditable,
			moveUp,
			moveDown,
			remove,
			addWorkout,
			addRestDay,
			css,
		    }),
		])
	    ]
	}
    }
}

export {
    component,
    attrs
}
