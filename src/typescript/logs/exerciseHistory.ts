import * as m from 'mithril'
import db from '../helpers/db'
import u from '../helpers/utils'
import {WorkoutLog, Saved} from '../types/exercise'
import Heading from '../ui/heading'

interface Attrs {
    priorTo: string,
    exerciseName: string,
    css: any,
}
interface HistoryVnode {
    attrs: Attrs
}
const HistoryComponent = (vnode: HistoryVnode) => {
    let priorTo = vnode.attrs.priorTo
    let exerciseName = vnode.attrs.exerciseName
    const css = vnode.attrs.css
    let showing = false

    // Get the log history, and save it as a state of this component
    let history: (WorkoutLog & Saved)[] = []
    db.findLogsContainingExercise(exerciseName, priorTo).then(results => {
	history = results
	m.redraw()
    })
    
    return {
	onbeforeupdate: (vnode: HistoryVnode) => {
	    if (vnode.attrs.priorTo != priorTo
		|| vnode.attrs.exerciseName != exerciseName) {

		priorTo = vnode.attrs.priorTo
		exerciseName = vnode.attrs.exerciseName
		db.findLogsContainingExercise(exerciseName, priorTo).then(results => {
		    history = results
		    m.redraw()
		})
	    }
	},
	view: (vnode: HistoryVnode) => {
	    if (history.length <= 0) {
		return null
	    }
	    if (!showing) {
		return m('a', {
		    class: `${css.a} ${css.showHideHistoryLink}`,
		    onclick: () => { showing = true }
		}, 'Show exercise history')
	    }
	    return m('div', [
		Heading({
		    text: 'Previous workouts',
		    level: 3,
		    css,
		}),
		m('a', {
		    onclick: () => { showing = false },
		    class: `${css.a} ${css.showHideHistoryLink}`,
		}, 'Hide history'),
		m('div', {
		    class: css.historyContainer
		}, history.map(log => {
	    	    // Show a log div for each item in the history
	    	    return m('div', {
	    		class: css.historyLog
	    	    }, [
	    		m('div', {class: css.historyLogHeading}, u.shortDate(log.date)),
	    		m('div', {
	    		    class: css.historyLogBody
	    		}, m('table', {class: css.historyTable},
			     [m('tr', {class: css.historyTableRow}, [
				 m('th', 'reps'),
				 m('th', 'amount'),
			     ])].concat(log.sets.map(set => {
	    			 return m('tr', {class: css.historyTableRow}, 'TODO: UI for showing log w/ different unit types')
			     }))
			    ))
	    	    ])
		}))
	    ])
	}
    }
}

export default HistoryComponent
