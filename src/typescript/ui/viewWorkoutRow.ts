import * as m from 'mithril';
import {Set} from '../types/exercise';
import db from '../helpers/db'
import ExerciseOverlay from '../workouts/overlays/exercise/exercise'
import {set} from 'mobx'

interface RowAttrs {
    prescription: Set,
    showEditButtons: boolean,
    deleteFunction: () => void,
    css: any,
    setOverlay: (overlay: any, attrs: any) => void,
    moveUp?: () => void,
    moveDown?: () => void,
}
interface RowVnode {
    attrs: RowAttrs
}

export default (vnode: RowVnode) => {
    const css = vnode.attrs.css
    const printUnits = (set: Set) => {
	let pieces:String[] = []
	if (!!set.reps && !!set.reps.prescribed) {
	    pieces.push(`${set.reps.prescribed} reps`)
	}
	if (set.weight && set.weight.prescribed) {
	    pieces.push(`${set.weight.prescribed} pounds`)
	}
	if (set.time && set.time.prescribed) {
	    pieces.push(`${set.time.prescribed} seconds`)
	}
	return pieces.join(', ')
    }
    return {
        view: (vnode: RowVnode) => {
            let prescription = vnode.attrs.prescription
            return m('tr', {
                class: css.tr,
            }, [
                vnode.attrs.showEditButtons
		    ? m('td', {class: `${css.td} ${css.workoutRowActions}`}, [
			vnode.attrs.moveUp
			    ? m('button', {
				onclick: vnode.attrs.moveUp,
				class: `${css.button} ${css.small}`,
			    }, 'Up')
			    : null,
			vnode.attrs.moveDown
			    ? m('button', {
				onclick: vnode.attrs.moveDown,
				class: `${css.button} ${css.small}`,
			    }, 'Down')
			    : null,
			m('button', {
                            class: `${css.hollowSecondaryButton} ${css.small}`,
                            onclick: () => {
				vnode.attrs.setOverlay(ExerciseOverlay, {
                                    prescription,
                                    updatePrescription: (newPrescription: Set) => {
					set(prescription, newPrescription)
                                    },
                                    hideOverlay: () => {
					vnode.attrs.setOverlay({component: null, title: ''}, {})
                                    },
                                    css: css,
				})
                            },
			}, 'Edit'),
		    ])
		    : null,
		m('td', {class: css.td}, prescription.exerciseName ?
                  prescription.exerciseName
                  : m('span', {class: css.empty}, 'Unnamed Exercise'),
		 ),
                m('td', {
                    class: css.td,
                }, printUnits(prescription)),
		vnode.attrs.showEditButtons
		    ? m('td', m('button', {
			class: `${css.small} ${css.hollowDangerButton}`,
			onclick: vnode.attrs.deleteFunction,
		    }, 'X'))
		    : null,
            ])
        }
    }
}
