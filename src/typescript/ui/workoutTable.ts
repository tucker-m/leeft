import * as m from 'mithril'
import {set as mobxSet} from 'mobx'
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
					    (index > 0)
						? m('button', {
						    class: css.upBtn,
						    onclick: () => {
							vnode.attrs.prescriptions.splice(index, 1)
							vnode.attrs.prescriptions.splice(index - 1, 0, setGroup)
						    }
						})
						: null,
					    (index < vnode.attrs.prescriptions.length - 1)
						? m('button', {
						    class: css.downBtn,
						    onclick: () => {
							vnode.attrs.prescriptions.splice(index, 1)
							vnode.attrs.prescriptions.splice(index + 1, 0, setGroup)
						    }
						})
						: null,
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
					(setGroup.sets.length == 0)
					    ? m('p', 'No sets specified.')
					    : [
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
								(index > 0)
								    ? m('button', {
									class: css.upBtnSmall,
									onclick: () => {
									    setGroup.sets.splice(index, 1)
									    setGroup.sets.splice(index - 1, 0, set)
									}
								    })
								    : null,
								(index < setGroup.sets.length - 1)
								    ? m('button', {
									class: css.downBtnSmall,
									onclick: () => {
									    setGroup.sets.splice(index, 1)
									    setGroup.sets.splice(index + 1, 0, set)
									}
								    })
								    : null,
							    ] : null,
							m('span', {class: css.setNumber}, index+1),
							(unitParts.length > 0)
							    ? unitParts
							    : m('span', 'No goals or units given for this set.'),
							showEditButtons
							    ? [
								m('button', {
								    class: `${css.hollowEditButton} ${css.small}`,
								    onclick: () => {
									vnode.attrs.setOverlay(AddSetOverlay, {
									    title: setGroup.exerciseName,
									    index,
									    set,
									    addSet: (changedSet: Set) => {
										setGroup.sets.splice(index, 1, changedSet)
									    },
									    hideOverlay: () => {
										vnode.attrs.setOverlay({component: null, title: ''}, {})
									    },
									    css,
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
						}))
					    ],
					(vnode.attrs.showEditButtons)
					    ? m('button', {
						class: css.hollowButton,
						onclick: () => {
						    let previousSet = setGroup.sets[setGroup.sets.length - 1] || {
							reps: false,
							weight: false,
							time: false,
						    }
						    vnode.attrs.setOverlay(AddSetOverlay, {
							title: setGroup.exerciseName,
							index: setGroup.sets.length,
							set: previousSet,
							addSet: (set: Set) => {
							    setGroup.sets.push(set)
							},
							hideOverlay: () => {
							    vnode.attrs.setOverlay({component: null, title: ''}, {})
							},
							css,
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
				    mobxSet(prescription, newPrescription)
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
