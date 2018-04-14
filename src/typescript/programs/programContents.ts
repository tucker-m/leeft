import * as m from 'mithril'
import {Program, Workout} from '../types/exercise'
import db from '../helpers/db'
import EditableH1 from '../ui/editableH1'

interface ContentAttrs {
    program: Program,
    pageEditable: boolean,
    css: any,
}

interface ContentVnode {
    attrs: ContentAttrs
}

const ProgramContent = (vnode: ContentVnode) => {
    let allWorkouts: Array<Workout> = []
    db.fetchSaveableCollection<Workout>('workout').then((workouts) => {
        allWorkouts = workouts
        m.redraw()
    })
    let selectedIndex = 0
    const css = vnode.attrs.css
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
                    const workoutText = workout.tag === 'rest' ? 'Rest' : workout.name
                    const workoutDescription = workout.tag === 'rest' ? ''
                        : workout.prescriptions.map((prescription) => {
                            return prescription.exercise.name
                        }).join(', ')
                    return m('tr', [
                        m('td', {class: css.td}, `Day ${index + 1}`),
                        m('td', {class: css.td}, [
                            m('p', {class: css.workoutNameInProgram}, workoutText),
                            m('p', {class: css.exerciseNamesInProgram}, workoutDescription),
                        ]),
                        pageEditable ? m('td', {class: css.td}, [
                            m('a', {
                                onclick: () => {
                                    let newArray = program.schedule.slice(0, index).concat(program.schedule.slice(index + 1, program.schedule.length))
                                    newArray.splice(index - 1, 0, workout)
                                    program.schedule = newArray
                                }
                            }, 'Move Up'),
                            m('span', ' / '),
                            m('a', {
                                onclick: () => {
                                    let newArray = program.schedule.slice(0, index).concat(program.schedule.slice(index + 1, program.schedule.length))
                                    newArray.splice(index + 1, 0, workout)
                                    program.schedule = newArray
                                }
                            }, 'Move Down'),
                            m('a', {
                                onclick: () => {
                                    program.schedule.splice(index, 1)
                                }
                            }, 'remove'),
                        ]) : null,
                    ])
                })),
                pageEditable ? m('div', [
                    m('label', 'Add workout to this program: '),
                    m('select', {
                        onchange: m.withAttr('value', (value: string) => {selectedIndex = parseInt(value)})
                    }, allWorkouts.map((workout, index) => {
                        return m('option', {value: index}, workout.name)
                    })),
                    m('button', {
                        onclick: () => {
                            program.schedule.push(allWorkouts[selectedIndex])
                        }
                    }, 'Add'),
                ]) : null
            ])
        }
    }
}

export default (attrs: ContentAttrs) => {
    return m(ProgramContent, attrs)
}
