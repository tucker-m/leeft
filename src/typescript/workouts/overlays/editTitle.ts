import * as m from 'mithril'
import db from '../../helpers/db'
import {Workout} from '../../types/exercise'

interface EditTitleAttrs {
    name: string,
    css: any,
    showOverlayContent: (boolean) => void,
    updateTitle: (string) => void,
}
interface ComponentVnode {
    attrs: EditTitleAttrs
}

const EditTitleComponent = (vnode: ComponentVnode) => {
    let matchingWorkouts: Array<Workout> = []
    let title = vnode.attrs.name

    return {
        view: (vnode: ComponentVnode) => {
            return m('div', {
                class: vnode.attrs.css.fullScreenOverlay,
            }, [
                m('h2', 'Change Workout Title'),
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
                matchingWorkouts.map((result) => {
                    return m('p', result.name)
                }),
                m('button', {
                    onclick: () => {vnode.attrs.showOverlayContent(false)}
                }, 'Cancel'),
                m('button', {
                    onclick: () => {
                        vnode.attrs.updateTitle(title)
                        vnode.attrs.showOverlayContent(false)
                    }
                }, 'Save'),
            ])
        }
    }
}
export default (attrs: EditTitleAttrs) => {
    return m(EditTitleComponent, attrs)
}
