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
		m('div', {class: css.setRow}, [
		    m('div', sets.map((set, index) => {
			return m('button', {
                            onclick: () => {
				currentSet = index
                            },
                            class: (currentSet == index) ?
				css.activeSetButton : css.setButton,
			}, index + 1)
                    })),
                    m('div', {
			class: css.insertNew,
			onclick: () => {
                            sets.splice(currentSet + 1, 0, {
				exercise: exercise,
				setLog: {reps: null, amount: null},
				prescribedAmount: -1,
                            })
                            currentSet = currentSet + 1
			}
		    }, [
			m('button', {class: css.insertButton}, '+',),
			m('a', {class: css.a}, 'Insert another set'),
		    ]),
		]),
                sets[currentSet].prescribedAmount > 0
                    ? m('p', sets[currentSet].prescribedAmount) : null,
		m('input[type=text]', {
		    value: sets[currentSet].setLog.reps,
		    onchange: m.withAttr('value', (value) => {
			sets[currentSet].setLog.reps = parseInt(value)
		    }),
		}),
		m('span', 'reps'),
		m('span', 'at'),
		m('input[type=text]', {
		    value: sets[currentSet].setLog.amount,
		    onchange: m.withAttr('value', (value) => {
			sets[currentSet].setLog.amount = parseInt(value)
		    }),
		}),
		m('span', exercise.setUnits),
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
