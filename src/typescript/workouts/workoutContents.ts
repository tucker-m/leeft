import * as m from 'mithril'
import EditableH1 from '../ui/editableH1'
import WorkoutTable from '../ui/workoutTable'
import WorkoutLogs from './workoutLogs'
import {Workout, Program, Puttable} from '../types/exercise'
import H1 from '../ui/h1'
import EditTitleOverlay from './overlays/editTitle'
import {TopBar, TopBarButtonAttrs} from '../ui/topBar'
import {PageDefaultAttrs} from '../ui/page'

interface ContentAttrs {
    workout: Workout,
    program?: Program & Puttable,
    updateWorkout: (newWorkout: Workout) => void,
}
interface ContentVnode {
    attrs: ContentAttrs & PageDefaultAttrs
}

const component: m.FactoryComponent<any> = (vnode: ContentVnode) => {
    let pageEditable = vnode.attrs.editButtonShowing
    let matchingWorkouts: Array<any> = []
    const topBarButtons = [
	{
            text: !pageEditable ? 'Edit Workout' : 'Done Editing',
            action: () => { pageEditable = !pageEditable },
            secondState: {
                text: pageEditable ? 'Edit Workout' : 'Done Editing',
                action: () => { pageEditable = !pageEditable },
            }
        },
    ]

    return {
        view: (vnode: ContentVnode) => {
            const workout = vnode.attrs.workout
            const css = vnode.attrs.css

            return [
		TopBar({
		    buttons: topBarButtons,
		    css: css,
		    title: workout.name,
		    editOptions: {
			editButtonShowing: pageEditable,
			openModal: () => {
			}
		    }
		}),
		m('div', {class: css.infoBox}, 'Some div'),
                vnode.attrs.program
                    ? [m('a', {
                        href: `/programs/${vnode.attrs.program._id}`,
                        oncreate: m.route.link,
                        class: css.a,
                    }, H1({
                        text: vnode.attrs.program.name,
                    })),
                       m('span', {class: css.arrow}, '>')
                      ]
                : null,
                EditableH1({
                    name: workout.name,
                    placeholder: 'Untitled Workout',
                    updateFunc: (newName: string) => { workout.name = newName },
                    showEditButton: pageEditable,
                    css: css,
                    setOverlay: () => {
                        vnode.attrs.setOverlay(EditTitleOverlay, {
                            title: workout.name,
                            workout: workout,
                            css: css,
                            hideOverlay: () => {
                                vnode.attrs.setOverlay({component: null, title: ''}, {})
                            },
                            updateWorkout: vnode.attrs.updateWorkout,
                        })
                    },
                }),
                WorkoutTable({
                    prescriptions: workout.prescriptions,
                    showEditButtons: pageEditable,
                    css: css,
                    setOverlay: vnode.attrs.setOverlay,
		    updatePrescriptions: (newPrescriptions) => {
			workout.prescriptions = newPrescriptions
		    },
                }),
                WorkoutLogs({
                    workout: workout,
                    css: css,
                })
            ]
        }
    }
}

export {
    component,
    ContentAttrs,
}
