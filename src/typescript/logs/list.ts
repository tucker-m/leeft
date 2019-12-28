import * as m from 'mithril'
import {RenderPage} from '../ui/page'

const component = (vnode) => {
    const {css} = vnode.attrs

    return {
	view: (vnode) => {
	    return m('div', [
		m('h1', {class: css.pageTitle}, 'Workout History'),
		m('div', [
		    m('div', {class: css.frontPageRow}, [
			m('h2', {class: css.workoutTitle}, 'Friday'),
			m('button', {class: css.hollowButton}, 'View'),
		    ]),
		    m('span', {class: css.timeStamps}, 'Hypertrophy Chest')
		]),
		m('div', [
		    m('div', {class: css.frontPageRow}, [
			m('h2', {class: css.workoutTitle}, 'Thursday'),
			m('button', {class: css.hollowButton}, 'View'),
		    ]),
		    m('span', {class: css.timeStamps}, 'Heavy Back')
		]),
		m('div', [
		    m('div', {class: css.frontPageRow}, [
			m('h2', {class: css.workoutTitle}, 'Tuesday'),
			m('button', {class: css.hollowButton}, 'View'),
		    ]),
		    m('span', {class: css.timeStamps}, 'Shoulders + Triceps')
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
			attrs: {}
		    }
		})
	    ])
	}
    }
}
