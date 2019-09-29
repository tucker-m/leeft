import * as m from 'mithril'
import {set as mobxSet} from 'mobx'
import {Set, SetGroup} from '../types/exercise'
import AddSetOverlay from '../workouts/overlays/exercise/set'
import EnterSetOverlay from '../logs/overlays/enterSet'
import u from '../helpers/utils'

interface SetAttrs {
    setGroup: SetGroup,
    showEditButtons: boolean,
    showLogButton: boolean,
    setOverlay: (overlay: any, attrs: any) => void,
    css: any,
}
interface SetVnode {
    attrs: SetAttrs
}

export default {
    view: (vnode: SetVnode) => {
	const {setOverlay, setGroup, css, showEditButtons, showLogButton} = vnode.attrs

	return m('ul', {class: css.setUl}, setGroup.sets.map((set, index) => {
	    const setIsDone = (set.reps && set.reps.entered !== false) || (set.weight && set.weight.entered !== false) || (set.time && set.time.entered !== false)
	    let unitParts: any[] = []
	    if (set.reps && !setIsDone) {
		if (set.reps.prescribed) {
		    unitParts.push(m('span', {class: css.repPill}, `${set.reps.prescribed} reps`))
		}
		else {
		    unitParts.push(m('span', {class: css.repBlank}, '____ reps'))
		}
	    }
	    else if (set.reps && set.reps.entered){
		unitParts.push(m('span', {class: css.repDone}, `${set.reps.entered} reps`))
	    }
	    if (set.weight && !setIsDone) {
		if (set.weight.prescribed) {
		    unitParts.push(m('span', {class: css.weightPill}, `${set.weight.prescribed} pounds`))
		}
		else {
		    unitParts.push(m('span', {class: css.weightBlank}, '____ pounds'))
		}
	    }
	    else if (set.weight && set.weight.entered) {
		unitParts.push(m('span', {class: css.weightDone}, `${set.weight.entered} pounds`))
	    }
	    if (set.time && !setIsDone) {
		if (set.time.prescribed) {
		    unitParts.push(m('span', {class: css.timePill}, `${set.time.prescribed} seconds`))
		}
		else {
		    unitParts.push(m('span', {class: css.timeBlank}, '____ seconds'))
		}
	    }
	    else if (set.time && set.time.entered) {
		unitParts.push(m('span', {class: css.timeDone}, `${set.time.entered} seconds`))
	    }
	    return m('li', {class: css.setLi}, [
		showEditButtons
		    ? m('div', {class: css.upDownBtnGroup}, [
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
		    ]) : null,
		(showLogButton && !showEditButtons)
		    ? m('button', {
			class: u.c(css.enterLogButton),
			onclick: () => {
			    setOverlay(EnterSetOverlay, {
				title: setGroup.exerciseName,
				closeOverlay: () => {
				    setOverlay({component: null}, {})
				},
				css,
				updateSet: (newSet: Set) => {
				    mobxSet(set, newSet)
				},
				set
			    })
			}
		    })
		    : null,
		(setIsDone)
		    ? m('span', {class: css.setDone})
		    : m('span', {class: css.setNumber}, index+1),
		(unitParts.length > 0)
		    ? unitParts
		    : m('span', 'No goals or units given for this set.'),
		showEditButtons
		    ? [
			m('button', {
			    class: `${css.hollowEditButton} ${css.small}`,
			    onclick: () => {
				setOverlay(AddSetOverlay, {
				    title: setGroup.exerciseName,
				    index,
				    set,
				    addSet: (changedSet: Set) => {
					setGroup.sets.splice(index, 1, changedSet)
				    },
				    hideOverlay: () => {
					setOverlay({component: null, title: ''}, {})
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
			}, 'X'),
		    ] : null,
	    ])
	}))
    }
}
