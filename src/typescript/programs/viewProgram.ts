import * as m from 'mithril'
import db from '../helpers/db'
import {Saveable, Program, Settings, Puttable} from '../types/exercise'
import Page from '../ui/page'
import ProgramContents from './programContents'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../../styles'
import Overlay from '../ui/overlay'

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

    let overlay: {component: null | any, title: string} = {component: null, title: ''}
    let overlayBottomContent = null
    let overlayAttrs = {}

    const setOverlay = (overlayToShow, attrs, bottomContent = null) => {
        overlay = overlayToShow
        overlayAttrs = attrs
        overlayBottomContent = bottomContent
    }

    return {
        view: (vnode: ViewProgramVnode) => {
            const overlayComponent = overlay

            return m('div', [
                overlayComponent.component ?
                    Overlay({
                        content: m(overlayComponent.component, overlayAttrs),
                        title: overlayComponent.title,
                        bottomContent: overlayBottomContent,
                        css: classes,
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
                        setOverlay: setOverlay,
                    })
                })
            ])
        }
    };
};
