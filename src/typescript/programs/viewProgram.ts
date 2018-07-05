import * as m from 'mithril'
import db from '../helpers/db'
import {Saveable, Program, Settings, Puttable} from '../types/exercise'
import EditableH1 from '../ui/editableH1'
import Page from '../ui/page'
import ProgramContents from './programContents'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../../styles'
import EditTitleOverlay from './overlays/editTitle'

jss.setup(preset())
const {classes} = jss.createStyleSheet(style).attach()

interface ViewProgramAttrs {
    id: string
}
interface ViewProgramVnode {
    attrs: ViewProgramAttrs,
}

export default (vnode: ViewProgramVnode) => {
    let pageEditable = false
    let settings: Settings = {tag: 'settings', currentProgram: null, nextWorkoutIndex: 0}
    db.getSettings().then(record => {
        settings = record
        m.redraw()
    })
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
    let overlayShowing = false
    const showOverlayContent = (show: boolean) => {
        overlayShowing = show
    }
    return {
        view: (vnode: ViewProgramVnode) => {
            return m('div', [
                overlayShowing ?
                    EditTitleOverlay({
                        title: program.name ? program.name : '',
                        css: classes,
                        showOverlayContent: showOverlayContent,
                        updateTitle: (newName: string) => {
                            program.name = newName
                        },
                    })
                    : null,
                Page({
                    css: classes,
                    topBarButtons: [
                        {
                            text: 'Set as Current Program',
                            action: () => {settings.currentProgram = program}
                        },
                        {
                            text: 'Edit Program',
                            action: () => { pageEditable = true },
                            secondState: {
                                text: 'Done Editing',
                                action: () => { pageEditable = false },
                                color: 'none',
                            }
                        },
                    ],
                    topBarColor: 'none',
                    contents: program === null ? null : ProgramContents({
                        program,
                        pageEditable,
                        css: classes,
                        showOverlayContent: showOverlayContent,
                    })
                })
            ])
        }
    };
};
