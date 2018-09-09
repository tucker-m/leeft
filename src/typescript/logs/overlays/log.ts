import * as m from 'mithril'
import {ExerciseSetLog, ExercisePrescription} from '../../types/exercise'

interface LogAttrs {
    exerciseSetLogs: any,
    hideOverlay: () => void,
    css: any,
}
interface LogVnode {
    attrs: LogAttrs
}

const title = 'Edit Set'

const LogOverlay = (vnode: LogVnode) => {
    const css = vnode.attrs.css
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
                        },
                        class: (currentSet == index) ?
                            css.activeSetButton : css.setButton,
                    }, index + 1)
                })),
                m('button', {
                    onclick: () => {
                        sets.splice(currentSet + 1, 0, {
                            exercise: exercise,
                            prescribedAmount: -1,
                        })
                        currentSet = currentSet + 1
                    }
                }, 'Insert another set'),
                sets[currentSet].prescribedAmount > 0
                    ? m('p', sets[currentSet].prescribedAmount) : null,
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
