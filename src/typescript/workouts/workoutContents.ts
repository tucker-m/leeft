import * as m from 'mithril'
import EditableH1 from '../ui/editableH1'
import WorkoutTable from '../ui/workoutTable'
import WorkoutLogs from './workoutLogs'
import {Workout, Program, Puttable} from '../types/exercise'
import H1 from '../ui/h1'
import EditTitleOverlay from './overlays/editTitle'

interface ContentAttrs {
    workout: Workout,
    program?: Program & Puttable,
    pageEditable: boolean,
    css: any,
    updateWorkout: (newWorkout: Workout) => void,
    setOverlay: (content: any, attrs: any) => void,
}
interface ContentVnode {
    attrs: ContentAttrs
}

const WorkoutContent = (vnode: ContentVnode) => {
    let matchingWorkouts: Array<any> = []

    return {
        view: (vnode: ContentVnode) => {
            const workout = vnode.attrs.workout
            const pageEditable = vnode.attrs.pageEditable
            const css = vnode.attrs.css

            return [
                vnode.attrs.program
                    ? [m('a', {
                        href: `/programs/${vnode.attrs.program._id}`,
                        oncreate: m.route.link,
                    }, H1({
                        text: vnode.attrs.program.name,
                        css: css,
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
                }),
                WorkoutLogs({
                    workout: workout,
                    css: css,
                })
            ]
        }
    }
}

export default (attrs: ContentAttrs) => m(WorkoutContent, attrs)
