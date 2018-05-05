import * as m from 'mithril'
import EditableH1 from '../ui/editableH1'
import WorkoutTable from '../ui/workoutTable'
import WorkoutLogs from './workoutLogs'
import {Workout, Program, Puttable} from '../types/exercise'

interface ContentAttrs {
    workout: Workout,
    program?: Program & Puttable,
    pageEditable: boolean,
    css: any,
}
interface ContentVnode {
    attrs: ContentAttrs
}

const WorkoutContent = (vnode: ContentVnode) => {
    return {
        view: (vnode: ContentVnode) => {
            const workout = vnode.attrs.workout
            const pageEditable = vnode.attrs.pageEditable
            const classes = vnode.attrs.css
            return [
                EditableH1({
                    name: workout.name,
                    placeholder: 'Untitled Workout',
                    updateFunc: (newName: string) => { workout.name = newName },
                    showEditButton: pageEditable,
                    css: classes,
                }),
                vnode.attrs.program
                    ? m('a', {
                        href: `/programs/${vnode.attrs.program._id}`,
                        oncreate: m.route.link,
                    }, `Part of ${vnode.attrs.program.name}`)
                    : null,
                WorkoutTable({
                    prescriptions: workout.prescriptions,
                    showEditButtons: pageEditable,
                    css: classes,
                }),
                WorkoutLogs({
                    workout: workout
                })
            ]
        }
    }
}

export default (attrs: ContentAttrs) => m(WorkoutContent, attrs)
