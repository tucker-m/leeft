import * as m from 'mithril'
import {Saveable, Puttable, Saved, Program} from '../types/exercise'

interface ProgramListAttrs {
    allPrograms: Array<Program & Puttable>,
    css: any,
}
interface ProgramListVnode {
    attrs: ProgramListAttrs
}

const ProgramList = (vnode: ProgramListVnode) => {
    return {
        view: (vnode: ProgramListVnode) => {
            return m('div', vnode.attrs.allPrograms.map((program) => {
                return m('p', m('a', {
                    href: '/programs/' + program._id,
                    oncreate: m.route.link,
                    class: vnode.attrs.css.itemTitle,
                }, program.name))
            }))
        }
    }
}
export default (attrs: ProgramListAttrs) => {
    return m(ProgramList, attrs)
}
