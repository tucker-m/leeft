import * as m from 'mithril'
import ProgramList from './programs/programList'
import {Program, Saved} from './types/exercise'
import {PageDefaultAttrs} from './ui/page'
import {TopBar} from './ui/topBar'
import db from './helpers/db'
import u from './helpers/utils'

interface attrs {
    allPrograms: Array<Program & Saved>,
}
interface IndexVnode {
    attrs: attrs & PageDefaultAttrs
}

const component: m.FactoryComponent<any> = (vnode: IndexVnode) => {
    const css = vnode.attrs.css

    return {
	view: (vnode: IndexVnode) => {
	    return [
		m('div', {class: vnode.attrs.css.content}, [
		    m('div', {class: css.frontPageGroup}, [
			m('div', {class: css.frontPageRow}, [
			    m('h1', {class: u.c(css.h1, css.frontPageHeading)}, 'Workouts'),
			    m('div', {class: css.frontPageRowButtons}, [
				m('a', {
				    class: css.button,
				    href: '/workouts',
				    oncreate: m.route.link,
				}, 'View All Workouts'),
				m('button', {class: css.hollowButton}, '+ New Workout'),
			    ]),
			]),
			m('p', {class: css.frontPageRowSubtext}, 'Make a plan for your gym session'),
		    ]),
		    m('div', {class: css.frontPageGroup}, [
			m('div', {class: css.frontPageRow}, [
			    m('h1', {class: u.c(css.h1, css.frontPageHeading)}, 'History'),
			    m('div', {class: css.frontPageRowButtons}, [
				m('button', {class: css.button}, 'View All Logs'),
				m('button', {class: css.hollowButton}, '+ New Log'),
			    ]),
			]),
			m('p', {class: css.frontPageRowSubtext}, 'Record what you did at the gym'),
		    ]),
		    m('div', {class: css.frontPageGroup}, [
			m('div', {class: css.frontPageRow}, [
			    m('h1', {class: u.c(css.h1, css.frontPageHeading)}, 'Cycles'),
			    m('div', {class: css.frontPageRowButtons}, [
				m('button', {class: css.button}, 'View All Cycles'),
				m('button', {class: css.hollowButton}, '+ New Cycle'),
			    ]),
			]),
			m('p', {class: css.frontPageRowSubtext}, 'Group workouts together to make a schedule'),
		    ]),
		]),
            ]
	}
    }
}

export {
    component,
    attrs,
}
