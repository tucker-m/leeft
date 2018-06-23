import * as m from 'mithril'
import {Exercise} from '../../types/exercise'

interface ResultsAttrs {
    results: Array<Exercise>,
}
interface ComponentVnode {
    attrs: ResultsAttrs
}
export default (vnode: ComponentVnode) => {
    return {
        view: (vnode: ComponentVnode) => {
            return vnode.attrs.results.map((result) => {
                return m('p', result.name)
            })
        }
    }
}
