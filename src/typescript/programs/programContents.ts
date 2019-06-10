import * as m from 'mithril'
import {Program, Workout, Puttable, WorkoutAndLog} from '../types/exercise'
import db from '../helpers/db'
import EditableHeading from '../ui/editableHeading'
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
    updateWorkoutName: (newName: string, index: number) => void,
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
	    const updateWorkoutName = vnode.attrs.updateWorkoutName

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
		    editButtonShowing: pageEditable,
		    css: css,
		}),
                m('div', {class: css.content}, [
		    m('div', {class: css.pageTitle},
		      EditableHeading({
			  level: 1,
			  name: program.name,
			  placeholder: 'Untitled Program',
			  css: css,
			  setOverlay: () => {
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
			  showEditButton: pageEditable,
		      }),
		     ),
		    Calendar({
			workouts: vnode.attrs.workoutsWithLogs,
			programUrl: `/programs/${program._id}`,
			beingEdited: pageEditable,
			setOverlay: vnode.attrs.setOverlay,
			moveUp,
			moveDown,
			remove,
			updateWorkoutName,
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
