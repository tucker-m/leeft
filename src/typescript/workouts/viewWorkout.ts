import * as m from 'mithril';
import db from '../helpers/db';
import {Saveable, Saved, Puttable, Workout, Program} from '../types/exercise';
import WorkoutContent from './workoutContents'
import {observable, IObservableObject} from 'mobx';
import EditableH1 from '../ui/editableH1'
import WorkoutTable from '../ui/workoutTable'
import Page from '../ui/page'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../../styles'
import colors from '../../jss/variables/colors'

jss.setup(preset())
const {classes} = jss.createStyleSheet(style).attach()

interface ViewWorkoutAttrs {
    id: string,
    day?: string,
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
    if (day) {
        db.fetchSaveableRecord<Program>(vnode.attrs.id).then((returnedProgram) => {
            const temp = <Workout>returnedProgram.schedule[parseInt(day)]
            workout = temp
            m.redraw()
        })
    }
    else {
        db.fetchSaveableRecord<Workout>(vnode.attrs.id).then((returnedWorkout) => {
            workout = returnedWorkout;
            m.redraw();
        })
    }

    let pageEditable = false

    return {
        view: (vnode: ViewWorkoutVnode) => {
            return Page({
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
                    {
                        text: 'Delete Workout',
                        action: () => {
                            //db.deleteSaveableRecord(workout)
                            window.location.href = '#!'
                        },
                    }
                ],
                topBarColor: 'none',
                contents: workout == null ? null : WorkoutContent({
                    workout,
                    pageEditable,
                    css: classes
                }),
            })
        }
    };
};
