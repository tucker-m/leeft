import * as m from 'mithril'
import {ExerciseSetLog, ExercisePrescription} from '../../types/exercise'

interface LogAttrs {
    exerciseSetLogs: any,
    hideOverlay: () => void,
}
interface LogVnode {
    attrs: LogAttrs
}

const title = 'Edit Set'

const LogOverlay = (vnode: LogVnode) => {
    let exercise = vnode.attrs.exerciseSetLogs.exercise
    let sets = vnode.attrs.exerciseSetLogs.sets
    let currentSet = 0
    return {
        view: (vnode: LogVnode) => {
            return m('div', [
                m('h3', exercise.name),
                m('div', sets.map((set, index) => {
                    return m('button', {
                        onclick: () => {
                            currentSet = index
                            debugger
                        }
                    }, index + 1)
                })),
                m('p', sets[currentSet].prescribedAmount),
                m('button', {
                    onclick: vnode.attrs.hideOverlay
                }, 'Cancel'),
            ])
        }
    }
}

export default {
    component: LogOverlay,
    title: title
}
