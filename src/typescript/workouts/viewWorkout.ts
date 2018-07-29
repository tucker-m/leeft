import * as m from 'mithril';
import db from '../helpers/db';
import {Saveable, Saved, Puttable, Workout, Program, Exercise, ExercisePrescription} from '../types/exercise';
import WorkoutContent from './workoutContents'
import {observable, IObservableObject} from 'mobx';
import Page from '../ui/page'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../../styles'
import Overlay from '../ui/overlay'

jss.setup(preset())
const {classes} = jss.createStyleSheet(style).attach()

interface ViewWorkoutAttrs {
    id: string,
    day: string,
    edit?: string,
};
interface ViewWorkoutVnode {
    attrs: ViewWorkoutAttrs,
};

export default (vnode: ViewWorkoutVnode) => {
    let workout: (Workout) = {
        name: '',
        prescriptions: [],
        tag: 'workout',
    }
    const day = vnode.attrs.day
    let program: (Program & Puttable) | null = null
    db.fetchSaveableRecord<Program>(vnode.attrs.id).then((returnedProgram) => {
        program = returnedProgram
        const temp = <Workout>returnedProgram.schedule[parseInt(day)]
        workout = temp
        m.redraw()
    })

    let updateWorkout = (newWorkout: Workout) => {
        if (program) {
            program.schedule[parseInt(day)] = newWorkout
            workout = newWorkout
        }
    }

    let pageEditable = (!!vnode.attrs.edit && (vnode.attrs.edit == 'edit'))
    let overlay: {component: null | any, title: string} = {component: null, title: ''}
    let overlayBottomContent = null
    let overlayAttrs = {}

    const setOverlay = (overlayToShow, attrs, bottomContent = null) => {
        overlay = overlayToShow
        overlayAttrs = attrs
        overlayBottomContent = bottomContent
    }

    return {
        view: (vnode: ViewWorkoutVnode) => {
            let contentAttrs = {
                workout,
                pageEditable,
                css: classes,
                updateWorkout: updateWorkout,
                setOverlay: setOverlay,
            }
            if (program) {
                contentAttrs['program'] = program
            }
            const overlayComponent = overlay // you get a compiler error
                                           // if this isn't a constant.
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
                            text: !pageEditable ? 'Edit Workout' : 'Done Editing',
                            action: () => { pageEditable = !pageEditable },
                            secondState: {
                                text: pageEditable ? 'Edit Workout' : 'Done Editing',
                                action: () => { pageEditable = !pageEditable },
                            }
                        },
                    ],
                    contents: workout == null ? null : WorkoutContent(contentAttrs),
                })
            ])
        }
    };
};
