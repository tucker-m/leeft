import * as m from 'mithril'
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
			class: u.c(css.hollowButton, css.small),
			onclick: () => {
			    setOverlay(EnterSetOverlay, {
				title: setGroup.exerciseName,
				closeOverlay: () => {
				    setOverlay({component: null}, {})
				},
				css,
				set
			    })
			}
		    }, 'Enter log')
		    : null,
		m('span', {class: css.setNumber}, index+1),
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
			}, 'Delete'),
		    ] : null,
	    ])
	}))
    }
}
