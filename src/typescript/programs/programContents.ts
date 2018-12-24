import * as m from 'mithril'
import {Program, Workout, Puttable} from '../types/exercise'
import db from '../helpers/db'
import EditableH1 from '../ui/editableH1'
import WorkoutTable from '../ui/workoutTable'
import EditTitleOverlay from './overlays/editTitle'
import {PageDefaultAttrs} from '../ui/page'
import {TopBar} from '../ui/topBar'

interface attrs {
    program: Program & Puttable,
}

interface ContentVnode {
    attrs: attrs & PageDefaultAttrs
}

const component = (vnode: ContentVnode) => {
    let selectedIndex = 0
    const css = vnode.attrs.css
    let pageEditable = vnode.attrs.editButtonShowing

    return {
        view: (vnode: ContentVnode) => {
            const program = vnode.attrs.program

            return [
		TopBar({
		    buttons: [{
			text: 'Edit Program',
			action: () => { pageEditable = true },
			secondState: {
			    text: 'Done Editing',
			    action: () => { pageEditable = false },
			}
		    }],
		    editOptions: {
			editButtonShowing: pageEditable,
			openModal: () => {
			    vnode.attrs.setOverlay(EditTitleOverlay, {
				title: program.name,
				css: css,
				hideOverlay: () => {
                                    vnode.attrs.setOverlay({component: null, title: ''}, {})
				},
				updateTitle: (newTitle: string) => {
                                    program.name = newTitle
				}
			    })
			},
		    },
		    title: program.name,
		    placeholder: 'Untitled Program',
		    css: css,
		}),
                m('div', {class: css.content}, [
		    pageEditable ? m('div', [
			m('button', {
                            onclick: () => {
				const dayNum = program.schedule.push({
                                    tag: 'workout',
                                    prescriptions: [],
                                    name: ''
				})
				setTimeout(() => {
				    window.location.href = `#!/programs/${program._id}/workouts/${dayNum - 1}/edit`
				}, 400)
                            }
			}, '+ Add a new workout'),
			m('button', {
                            onclick: () => {program.schedule.push({tag: 'rest'})}
			}, '+ Add a rest day'),
                    ]) : null,
		    m('table', {
			class: css.table,
                    }, program.schedule.map((workout, index) => {
			const workoutDescription = workout.tag === 'rest' ? ''
                            : workout.prescriptions.map((prescription) => {
				return prescription.exercise.name
                            }).join(', ')
			return m('tr', {class: css.tr}, [
                            m('td', {class: css.td}, `Day ${index + 1}`),
                            m('td', {class: css.td}, [
				workout.tag == 'rest'
                                    ? m('p', 'Rest')
                                    : m('a', {
					class: css.workoutNameInProgram,
					href: `/programs/${program._id}/workouts/${index}`,
					oncreate: m.route.link,
                                    }, workout.name ? workout.name : 'Untitled Workout'),
				m('p', {class: css.exerciseNamesInProgram}, workoutDescription),
                            ]),
                            pageEditable ? m('td', {class: css.td}, [
				index != 0
                                    ? m('a', {
					onclick: () => {
                                            let newArray = program.schedule.slice(0, index).concat(program.schedule.slice(index + 1, program.schedule.length))
                                            newArray.splice(index - 1, 0, workout)
                                            program.schedule = newArray
					}
                                    }, 'Move Up')
				    : null,
				index != program.schedule.length - 1
                                    ? m('a', {
					onclick: () => {
                                            let newArray = program.schedule.slice(0, index).concat(program.schedule.slice(index + 1, program.schedule.length))
                                            newArray.splice(index + 1, 0, workout)
                                            program.schedule = newArray
					}
                                    }, 'Move Down')
				    : null,
				m('a', {
                                    onclick: () => {
					program.schedule.splice(index, 1)
                                    }
				}, 'remove'),
                            ]) : null,
			])
                    })),
		])
	    ]
	}
    }
}

export {
    component,
    attrs
}
