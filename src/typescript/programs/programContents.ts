import * as m from 'mithril'
import {Program, Workout, Puttable} from '../types/exercise'
import db from '../helpers/db'
import EditableH1 from '../ui/editableH1'
import WorkoutTable from '../ui/workoutTable'

interface ContentAttrs {
    program: Program & Puttable,
    pageEditable: boolean,
    css: any,
}

interface ContentVnode {
    attrs: ContentAttrs
}

const ProgramContent = (vnode: ContentVnode) => {
    let selectedIndex = 0
    const css = vnode.attrs.css
    let workoutToAdd: Workout = {
        name: '',
        prescriptions: [],
        tag: 'workout',
    }
    return {
        view: (vnode: ContentVnode) => {
            const program = vnode.attrs.program
            const pageEditable = vnode.attrs.pageEditable
            return m('div', [
                EditableH1({
                    name: program.name,
                    placeholder: 'Untitled Program',
                    updateFunc: (newName) => {program.name = newName},
                    showEditButton: pageEditable,
                    css: css,
                }),
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
                                }, workout.name),
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
                pageEditable ? m('div', [
                    m('button', {
                        onclick: () => {program.schedule.push({tag: 'rest'})}
                    }, '+ Add a rest day'),
                    m('h3', {class: vnode.attrs.css.h3}, 'Add a workout to this program'),
                    m('label', 'Workout Name:'),
                    m('input[type=text]', {
                        placeholder: 'Untitled Workout',
                        value: workoutToAdd.name,
                        onchange: m.withAttr('value', value => workoutToAdd.name = value)
                    }),
                    m('button', {
                        onclick: () => {
                            program.schedule.push(workoutToAdd)
                        }
                    }, 'Add this workout to program ^'),
                    WorkoutTable({
                        prescriptions: workoutToAdd.prescriptions,
                        showEditButtons: true,
                        css: vnode.attrs.css,
                    }),
                ]) : null
            ])
        }
    }
}

export default (attrs: ContentAttrs) => {
    return m(ProgramContent, attrs)
}
