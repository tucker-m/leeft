import * as m from 'mithril'
import db from '../helpers/db'
import {Saveable, Program, Settings, Puttable} from '../types/exercise'
import {RenderPage} from '../ui/page'
import * as ProgramContents from './programContents'

interface ViewProgramAttrs {
    id: string
}
interface ViewProgramVnode {
    attrs: ViewProgramAttrs,
}

export default (vnode: ViewProgramVnode) => {
    let pageEditable = false
    let program: (Program & Puttable) = {
        _id: 'fake',
        name: '',
        schedule: [],
        tag: 'program',
    }
    db.fetchSaveableRecord<Program>(vnode.attrs.id).then((returnedProgram) => {
        program = returnedProgram
        m.redraw()
    })

    return {
        view: (vnode: ViewProgramVnode) => {

            return m('div', [
                RenderPage({
                    pageEditable,
                    contents: {
			component: ProgramContents.component,
			attrs: {
                            program,
                            pageEditable,
			}
                    }
                })
            ])
        }
    };
};
