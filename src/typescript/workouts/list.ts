import * as m from 'mithril'
import {RenderPage} from '../ui/page'

const component = (vnode) => {
    const {css} = vnode.attrs

    return {
	view: (vnode) => {
	    return m('div', [
		m('h1', {class: css.pageTitle}, 'All Workouts'),
		m('label', {class: css.sortLabel}, 'Sort by'),
		m('select', [
		    m('option', 'Date created'),
		    m('option', 'Date last done'),
		    m('option', 'Alphabetical'),
		]),
		m('div', [
		    m('div', {class: css.frontPageRow}, [
			m('h2', {class: css.workoutTitle}, 'Hypertrophy Chest'),
			m('button', {class: css.hollowButton}, 'View/Edit'),
			m('button', {class: css.button}, 'Start'),
		    ]),
		    m('span', {class: css.timeStamps}, 'created January 10, 2019'),
		    m('span', {class: css.timeStamps}, 'last done October 25, 2019'),
		    m('p', 'DB bench press, Inline bench press, Dips, Cable flies')
		]),
		m('div', [
		    m('div', {class: css.frontPageRow}, [
			m('h2', {class: css.workoutTitle}, 'Heavy Back'),
			m('button', {class: css.hollowButton}, 'View/Edit'),
			m('button', {class: css.button}, 'Start'),
		    ]),
		    m('span', {class: css.timeStamps}, 'created February 1, 2019'),
		    m('span', {class: css.timeStamps}, 'last done Nov 2, 2019'),
		    m('p', 'Deadlifts, Pullups, DB rows, cable rows')
		]),
	    ])
	}
    }
}

export default (vnode) => {
    return {
	view: (vnode) => {
	    
	    return m('div', [
		RenderPage({
		    pageEditable: false,
		    contents: {
			component: component,
			attrs: {foo: 'bar'}
		    }
		})
	    ])
	}
    }
}
