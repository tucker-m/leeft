import * as m from 'mithril'
import {set} from 'mobx'
import {Set, SetGroup} from '../types/exercise'
import utils from '../helpers/utils'
import ExerciseOverlay from '../workouts/overlays/exercise/exercise'
import AddSetOverlay from '../workouts/overlays/exercise/set'

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
	    const {showEditButtons} = vnode.attrs

	    const deleteFunction = (index: number) => {
                vnode.attrs.prescriptions.splice(index, 1)
	    }

            return m('div', {class: css.workoutTable}, [
                vnode.attrs.prescriptions.length > 0 ?
                    m('div', [
			vnode.attrs.prescriptions.map((setGroup, index) => {
			    return m('div', {class: css.exerciseGroup}, [
				m('div', {class: css.exerciseHeadingRow}, [
				    showEditButtons
					? [
					    m('button', {class: css.upBtn}),
					    m('button', {class: css.downBtn}),
					] : null,
				    m('span', {class: css.exerciseName}, setGroup.exerciseName || 'Unnamed Exercise'),
				    showEditButtons
					? [
					    m('button', {
						class: `${css.hollowEditButton} ${css.small}`,
						onclick: () => {
						    vnode.attrs.setOverlay(ExerciseOverlay, {
							setGroup,
							updateSetGroup: (newSetGroup: SetGroup) => {
							    vnode.attrs.prescriptions.splice(index, 1, newSetGroup)
							},
							hideOverlay: () => {
							    vnode.attrs.setOverlay({component: null, title: ''}, {})
							},
							css,
						    })
						},
					    }, 'Edit'),
					    m('button', {
						class: `${css.hollowDangerButton} ${css.small}`,
						onclick: () => {
						    vnode.attrs.prescriptions.splice(index, 1)
						}
					    }, 'Delete'),
					] : null,
				]),
				m('div', {class: css.exerciseSets}, [
				    m('div', [
					m('ul', {class: css.setUl}, setGroup.sets.map((set, index) => {
					    let unitParts: any[] = []
					    if (set.reps) {
						if (set.reps.prescribed) {
						    unitParts.push(m('span', {class: css.repPill}, `${set.reps.prescribed} reps`))
						}
						else {
						    unitParts.push(m('span', {class: css.repBlank}, '____ reps'))
						}
					    }
					    if (set.weight) {
						if (set.weight.prescribed) {
						    unitParts.push(m('span', {class: css.weightPill}, `${set.weight.prescribed} pounds`))
						}
						else {
						    unitParts.push(m('span', {class: css.weightBlank}, '____ pounds'))
						}
					    }
					    if (set.time) {
						if (set.time.prescribed) {
						    unitParts.push(m('span', {class: css.timePill}, `${set.time.prescribed} seconds`))
						}
						else {
						    unitParts.push(m('span', {class: css.timeBlank}, '____ seconds'))
						}
					    }
					    return m('li', {class: css.setLi}, [
						showEditButtons
						? [
						    m('button', {class: css.upBtnSmall}),
						    m('button', {class: css.downBtnSmall}),
						] : null,
						m('span', {class: css.setNumber}, index+1),
						unitParts,
						showEditButtons
						? [
						    m('button', {
							class: `${css.hollowEditButton} ${css.small}`,
							onclick: () => {
							    vnode.attrs.setOverlay(AddSetOverlay, {
								exerciseName: setGroup.exerciseName,
								previousSet: set,
								addSet: (changedSet: Set) => {
								    setGroup.sets.splice(index, 1, changedSet)
								},
								hideOverlay: () => {
								    vnode.attrs.setOverlay({component: null, title: ''}, {})
								}
							    })
							}
						    }, 'Edit'),
						    m('button', {
							class: `${css.hollowDangerButton} ${css.small}`,
							onclick: () => {
							    setGroup.sets.splice(index, 1)
							}
						    }, 'Delete'),
						] : null,
					    ])
					})),
					(vnode.attrs.showEditButtons)
					    ? m('button', {
						class: css.hollowButton,
						onclick: () => {
						    let previousSet = setGroup.sets[setGroup.sets.length - 1] || false
						    vnode.attrs.setOverlay(AddSetOverlay, {
							exerciseName: setGroup.exerciseName,
							previousSet,
							addSet: (set: Set) => {
							    setGroup.sets.push(set)
							},
							hideOverlay: () => {
							    vnode.attrs.setOverlay({component: null, title: ''}, {})
							}
						    })
						}
					    }, 'Add set')
					    : null,
				    ])
				])
			    ])
			})
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
				setGroup: prescription,
				updateSetGroup: (newPrescription: SetGroup) => {
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
