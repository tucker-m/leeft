import * as m from 'mithril'
import {Saveable, Program} from '../types/exercise'

interface ProgramListAttrs {
    allPrograms: Array<Program & Saveable>,
}
interface ProgramListVnode {
    attrs: ProgramListAttrs
}

const ProgramList = (vnode: ProgramListVnode) => {
    return {
        view: (vnode: ProgramListVnode) => {
            return m('div', vnode.attrs.allPrograms.map((program) => {
                return m('a', {
                    href: '/programs/' + program._id,
                    oncreate: m.route.link,
                }, program.name)
            }))
        }
    }
}
export default (attrs: ProgramListAttrs) => {
    return m(ProgramList, attrs)
}
