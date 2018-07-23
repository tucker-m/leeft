import * as m from 'mithril'
import db from '../../helpers/db'
import {Workout} from '../../types/exercise'

interface EditTitleAttrs {
    title: string,
    css: any,
    hideOverlay: () => void,
    updateTitle: (string) => void,
}
interface ComponentVnode {
    attrs: EditTitleAttrs
}

const title = 'Edit Program'

const EditTitleComponent = (vnode: ComponentVnode) => {
    let matchingWorkouts: Array<any> = []
    let title = vnode.attrs.title

    return {
        view: (vnode: ComponentVnode) => {
            return [
                m('h4', 'Change Workout Title'),
                m('input[type=text]', {
                    value: title,
                    oninput: m.withAttr('value', (value) => {
                        db.findWorkoutsByName(value).then((results) => {
                            matchingWorkouts = results
                            m.redraw()
                        })
                        title = value
                    }),
                }),
                m('ul', matchingWorkouts.map((result) => {
                    return m('li', {
                        onclick: () => {
                            title = result.workout.name
                        }
                    }, `${result.program.name} > ${result.workout.name}`)
                })),
                m('div', [
                    m('button', {
                        onclick: () => {vnode.attrs.hideOverlay()}
                    }, 'Cancel'),
                    m('button', {
                        onclick: () => {
                            vnode.attrs.updateTitle(title)
                            vnode.attrs.hideOverlay()
                        }
                    }, 'Save'),
                ])
            ]
        }
    }
}
export default {
    component: EditTitleComponent,
    title: title
}
