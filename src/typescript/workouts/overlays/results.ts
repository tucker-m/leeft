import * as m from 'mithril'
import {Set} from '../../types/exercise'

interface ResultsAttrs {
    results: Array<Set>,
}
interface ComponentVnode {
    attrs: ResultsAttrs
}
export default (vnode: ComponentVnode) => {
    return {
        view: (vnode: ComponentVnode) => {
            return vnode.attrs.results.map((result) => {
                return m('p', result.exerciseName)
            })
        }
    }
}
