import * as m from 'mithril';
import db from '../helpers/db';
import {Saveable, Saved, Puttable, Workout, Program, Exercise, ExercisePrescription} from '../types/exercise';
import WorkoutContent from './workoutContents'
import {observable, IObservableObject} from 'mobx';
import Page from '../ui/page'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../../styles'
import colors from '../../jss/variables/colors'
import EditTitleOverlay from './overlays/editTitle'

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
    let overlayShowing = false
    let overlayResults: Array<Workout> = []
    const showOverlayContent = (show: boolean) => {
        overlayShowing = show
    }
    return {
        view: (vnode: ViewWorkoutVnode) => {
            let contentAttrs = {
                workout,
                pageEditable,
                css: classes,
                showOverlayContent: showOverlayContent,
            }
            if (program) {
                contentAttrs['program'] = program
            }
            return m('div', [
                overlayShowing ?
                    EditTitleOverlay({
                        title: workout.name,
                        workout: workout,
                        css: classes,
                        showOverlayContent: showOverlayContent,
                        updateWorkout: updateWorkout,
                        updateTitle: (newName: string) => {
                            workout.name = newName
                        },
                        updatePrescriptions: (prescriptions: Array<ExercisePrescription>) => {
                            workout.prescriptions = prescriptions
                        }
                    })
                    : null,
                Page({
                    css: classes,
                    topBarButtons: [
                        {
                            text: 'Edit Workout',
                            action: () => { pageEditable = true },
                            secondState: {
                                text: 'Done Editing',
                                action: () => { pageEditable = false },
                                color: colors.editable,
                            }
                        },
                    ],
                    topBarColor: 'none',
                    contents: workout == null ? null : WorkoutContent(contentAttrs),
                })
            ])
        }
    };
};
