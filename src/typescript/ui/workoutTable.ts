import * as m from 'mithril'
import {set} from 'mobx'
import {Set} from '../types/exercise'
import ViewWorkoutRow from './viewWorkoutRow'
import utils from '../helpers/utils'
import ExerciseOverlay from '../workouts/overlays/exercise/exercise'

interface TableAttributes {
    prescriptions: Array<Set>,
    showEditButtons: boolean,
    css: any,
    setOverlay: (overlay: any, attrs: any) => void,
    updatePrescriptions: (newPrescriptions: Array<Set>) => void,
}

interface TableVnode {
    attrs: TableAttributes
}

const TableComponent = (vnode: TableVnode) => {
    const css = vnode.attrs.css
    return {
        view: (vnode: TableVnode) => {
	    const deleteFunction = (index: number) => {
                vnode.attrs.prescriptions.splice(index, 1)
	    }

            return m('div', {class: css.workoutTable}, [
                vnode.attrs.showEditButtons ?
                    m('button', {
                        class: css.hollowButton,
                        onclick: () => {
                            const newLength = vnode.attrs.prescriptions.push({
                                exerciseName: '',
				reps: false,
				weight: false,
				time: false,
                            })
			    const index = newLength - 1
			    const prescription = vnode.attrs.prescriptions[index]
			    vnode.attrs.setOverlay(ExerciseOverlay, {
				prescription,
				updatePrescription: (newPrescription: Set) => {
				    set(prescription, newPrescription)
				},
				hideOverlay: () => {
				    vnode.attrs.setOverlay({component: null, title: ''}, {})
				},
				deleteOnCancel: () => {deleteFunction(index)},
				css: css,
			    })
                        }
                    }, 'Add Exercise')
                    : null,
		vnode.attrs.prescriptions.length > 0 ?
                    m('table', {
                        class: css.table,
                    }, [
                        m('tr', {
                            class: css.tr,
                        }, [
                            vnode.attrs.showEditButtons
				? m('th', '')
				: null,
			    m('th', 'Exercise'),
                            m('th', 'Amount'),
			    vnode.attrs.showEditButtons
				? m('th', '')
				: null,
                        ]),
                        vnode.attrs.prescriptions.map((prescription, index) => {
			    let attributes: any = {
                                prescription,
                                showEditButtons: vnode.attrs.showEditButtons,
                                deleteFunction: () => {deleteFunction(index)},
                                css: css,
                                setOverlay: vnode.attrs.setOverlay,
			    }
			    if (index > 0) {
				attributes.moveUp = () => {
				    const p = vnode.attrs.prescriptions
				    let newArray = p.slice(0, index).concat(p.slice(index + 1, p.length))
				    newArray.splice(index - 1, 0, prescription)
				    vnode.attrs.updatePrescriptions(newArray)
				}
			    }
			    if (index < vnode.attrs.prescriptions.length - 1) {
				attributes.moveDown = () => {
				    const p = vnode.attrs.prescriptions
				    let newArray = p.slice(0, index).concat(p.slice(index + 1, p.length))
				    newArray.splice(index + 1, 0, prescription)
				    vnode.attrs.updatePrescriptions(newArray)
				}
			    }
                            return m(ViewWorkoutRow, attributes)
                        })
                    ])
                : m('p', 'This workout has no exercises added to it.'),
            ])
        }
    }
}

export default (attrs: TableAttributes) => {
    return m(TableComponent, attrs)
}
