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
    moveUp: (index: number) => void,
    moveDown: (index: number) => void,
    remove: (index: number) => void,
    addWorkout: () => void,
    addRestDay: () => void,
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
	    const moveUp = vnode.attrs.moveUp
	    const moveDown = vnode.attrs.moveDown
	    const remove = vnode.attrs.remove
	    const addWorkout = vnode.attrs.addWorkout
	    const addRestDay = vnode.attrs.addRestDay

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
		    subTitle: {
			text: '< All Programs',
			url: '#!/'
		    },
		    bottomButtons: [
			{
			    text: '+ Add Workout',
			    action: addWorkout,
			},
			{
			    text: '+ Add Rest Day',
			    action: addRestDay,
			},
		    ],
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
		    css: css,
		}),
                m('div', {class: css.content}, [
		    EditableH1({
			name: program.name,
			placeholder: 'Untitled Program',
			updateFunc: () => {},
			css: css,
			//setOverlay: vnode.attrs.setOverlay,
			showEditButton: pageEditable,
		    }),
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
