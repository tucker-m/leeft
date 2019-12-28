import * as m from 'mithril'
import {RenderPage} from '../ui/page'
import u from '../helpers/utils'

const component = (vnode) => {
    const {css} = vnode.attrs

    return {
	view: (vnode) => {
	    return m('div', [
		m('div', {class: css.headingLinks}, [
		    m('a', {class: css.headingLink}, 'Home'),
		    m('a', {class: css.headingLinkCurrent}, 'Workouts'),
		    m('a', {class: css.headingLink}, 'History'),
		    m('a', {class: css.headingLink}, 'Cycles'),
		]),
		m('div', [
		    m('h1', {class: css.pageTitle}, 'Hypertrophy Chest')
		]),
		m('p', {class: css.workoutDescription}, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ante ante, semper vitae ligula sed, euismod pharetra lectus. Proin sit amet diam non mauris finibus vulputate. Vestibulum metus purus, eleifend a placerat ut, blandit et neque. Nullam nec massa felis. In sit amet velit quis nisi consectetur venenatis ut in lacus.'),
		m('div', {class: css.exerciseList}, [
		    m('h1', {class: u.c(css.h1, css.exerciseName)}, 'DB Bench Press'),
		    m('div', {class: css.sets}, [
			m('span', {class: css.numberColumn}, '1'),
			m('span', {class: css.numberColumn}, '2'),
		    ])
		]),
	    ])
	}
    }
}

export default (vnode) => {
    return {
	view: (vnode) => {
	    return m('div', RenderPage({
		pageEditable: false,
		contents: {
		    component,
		    attrs: {}
		}
	    }))
	}
    }
}
