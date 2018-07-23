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
    const css = vnode.attrs.css

    return {
        view: (vnode: ComponentVnode) => {
            return [
                m('div', {class: css.labelOnTopGroup}, [
                    m('label', {class: css.label}, 'Change Workout Title'),
                    m('div', {class: css.formRow}, [
                        m('input[type=text]', {
                            value: title,
                            oninput: m.withAttr('value', (value) => {
                                db.findWorkoutsByName(value).then((results) => {
                                    matchingWorkouts = results
                                    m.redraw()
                                })
                                title = value
                            }),
                            class: css.textInput,
                        }),
                        m('div', [
                            m('button', {
                                onclick: () => {vnode.attrs.hideOverlay()},
                                class: css.button,
                            }, 'Cancel'),
                            m('button', {
                                onclick: () => {
                                    vnode.attrs.updateTitle(title)
                                    vnode.attrs.hideOverlay()
                                },
                                class: css.hollowButton,
                            }, 'Save'),
                        ])
                    ]),
                ]),
                m('ul', matchingWorkouts.map((result) => {
                    return m('li', {
                        onclick: () => {
                            title = result.workout.name
                        }
                    }, `${result.program.name} > ${result.workout.name}`)
                })),
            ]
        }
    }
}
export default {
    component: EditTitleComponent,
    title: title
}
