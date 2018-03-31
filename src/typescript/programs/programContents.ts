import * as m from 'mithril'
import {Program, Workout} from '../types/exercise'
import db from '../helpers/db'
import EditableH1 from '../ui/editableH1'

interface ContentAttrs {
    program: Program,
    pageEditable: boolean,
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
    return {
        view: (vnode: ContentVnode) => {
            const program = vnode.attrs.program
            const pageEditable = vnode.attrs.pageEditable
            return m('div', [
                EditableH1({
                    name: program.name,
                    placeholder: 'Untitled Program',
                    updateFunc: (newName) => {program.name = newName},
                    showEditButton: pageEditable
                }),
                program.schedule.map((workout, index) => {
                    const workoutText = workout.tag === 'rest' ? 'Rest' : workout.name
                    const workoutDescription = workout.tag === 'rest' ? ''
                        : workout.prescriptions.map((prescription) => {
                            return prescription.exercise.name
                        }).join(', ')
                    return m('div', [
                        m('h3', `Day ${index + 1}: ${workoutText}`),
                        m('p', workoutDescription)
                    ])
                }),
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
