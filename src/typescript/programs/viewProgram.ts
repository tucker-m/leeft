import * as m from 'mithril'
import db from '../helpers/db'
import {Saveable, Program} from '../types/exercise'
import EditableH1 from '../ui/editableH1'
import Page from '../ui/page'
import ProgramContents from './programContents'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../../styles'

jss.setup(preset())
const {classes: main} = jss.createStyleSheet(style.main).attach()

interface ViewProgramAttrs {
    id: string
}
interface ViewProgramVnode {
    attrs: ViewProgramAttrs,
}

export default (vnode: ViewProgramVnode) => {
    let pageEditable = false
    let program: Program | null = null
    db.fetchSaveableRecord<Program>(vnode.attrs.id).then((returnedProgram) => {
        console.log('here')
        console.log(returnedProgram)
        program = returnedProgram
        m.redraw()
    })
    return {
        view: (vnode: ViewProgramVnode) => {
            return Page({
                topBarButtons: [
                    {
                        text: 'Edit Program',
                        action: () => { pageEditable = true },
                        secondState: {
                            text: 'Done Editing',
                            action: () => { pageEditable = false },
                            color: '#1d70d6',
                        }
                    },
                ],
                topBarColor: '#831dd6',
                contents: program === null ? null : ProgramContents({program, pageEditable})
            })
        }
    };
};
