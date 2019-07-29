import * as m from 'mithril'
import {set} from 'mobx'
import {Set, SetGroup} from '../types/exercise'
import ViewWorkoutRow from './viewWorkoutRow'
import utils from '../helpers/utils'
import ExerciseOverlay from '../workouts/overlays/exercise/exercise'

interface TableAttributes {
    prescriptions: SetGroup[],
    showEditButtons: boolean,
    css: any,
    setOverlay: (overlay: any, attrs: any) => void,
    updatePrescriptions: (newPrescriptions: SetGroup[]) => void,
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
                            m('th', 'Sets'),
			    vnode.attrs.showEditButtons
				? m('th', '')
				: null,
                        ]),
                    ])
                    : m('p', 'This workout has no exercises added to it.'),
		vnode.attrs.showEditButtons ?
                    m('button', {
                        class: css.hollowButton,
                        onclick: () => {
                            const newLength = vnode.attrs.prescriptions.push({
                                exerciseName: '',
				sets: [],
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
            ])
        }
    }
}

export default (attrs: TableAttributes) => {
    return m(TableComponent, attrs)
}
