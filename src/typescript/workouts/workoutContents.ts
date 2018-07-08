import * as m from 'mithril'
import EditableH1 from '../ui/editableH1'
import WorkoutTable from '../ui/workoutTable'
import WorkoutLogs from './workoutLogs'
import {Workout, Program, Puttable} from '../types/exercise'
import H1 from '../ui/h1'

interface ContentAttrs {
    workout: Workout,
    program?: Program & Puttable,
    pageEditable: boolean,
    css: any,
    setOverlay: (content: any) => void,
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
            const classes = vnode.attrs.css
            
            return [
                vnode.attrs.program
                    ? [m('a', {
                        href: `/programs/${vnode.attrs.program._id}`,
                        oncreate: m.route.link,
                    }, H1({
                        text: vnode.attrs.program.name,
                        css: classes,
                    })),
                       m('span', {class: classes.arrow}, '>')
                      ]
                : null,
                EditableH1({
                    name: workout.name,
                    placeholder: 'Untitled Workout',
                    updateFunc: (newName: string) => { workout.name = newName },
                    showEditButton: pageEditable,
                    css: classes,
                    setOverlay: () => {
                        vnode.attrs.setOverlay({
                            view: () => {
                                return m('div', 'asdf')
                            }
                        })
                    },
                }),
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
