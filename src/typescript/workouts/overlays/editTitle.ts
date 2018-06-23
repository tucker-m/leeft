import * as m from 'mithril'
import db from '../../helpers/db'
import {Exercise} from '../../types/exercise'
import Results from './results'

interface EditTitleAttrs {
    name: string,
}
interface ComponentVnode {
    attrs: EditTitleAttrs
}

const EditTitleComponent = (vnode: ComponentVnode) => {
    let matchingExercises: Array<any> = [{name: 'one'}, {name: 'two'}]
    let title = vnode.attrs.name
    let handler = (value) => {
        title = value
    }
    return {
        view: (vnode: ComponentVnode) => {
            return m('div', [
                m('input[type=text]', {
                    value: title,
                    onchange: m.withAttr('value', handler)
                }),
                m('p', title)
            ])
        }
    }
}
export default (attrs: EditTitleAttrs) => {
    return m(EditTitleComponent, attrs)
}
