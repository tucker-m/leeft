import * as m from 'mithril';
import db from '../helpers/db';
import {Saveable, Saved, Puttable, Workout} from '../types/exercise';
import WorkoutLogs from '../workouts/workoutLogs';
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
    id: string
};
interface ViewWorkoutVnode {
    attrs: ViewWorkoutAttrs,
};

export default (vnode: ViewWorkoutVnode) => {
    let workout: (Workout & Puttable) = {
        name: '',
        prescriptions: [],
        tag: 'workout',
        _id: 'fakeid',
    }
    db.fetchSaveableRecord<Workout>(vnode.attrs.id).then((returnedWorkout) => {
        workout = returnedWorkout;
        m.redraw();
    })

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
                            db.deleteSaveableRecord(workout)
                            window.location.href = '#!'
                        },
                    }
                ],
                topBarColor: 'none',
                contents: [
                    EditableH1({
                        name: workout.name,
                        placeholder: 'Untitled Workout',
                        updateFunc: (newName: string) => { workout.name = newName },
                        showEditButton: pageEditable,
                        css: classes,
                    }),
                    WorkoutTable({
                        headers: ['Exercise', 'Amount'],
                        prescriptions: workout.prescriptions,
                        showEditButtons: pageEditable,
                        css: classes,
                    }),
                    pageEditable ?
                        m('button', {
                            onclick: () => {
                                workout.prescriptions.push({
                                    exercise: {
                                        name: '',
                                        setUnits: 'reps',
                                        tag: 'exercise',
                                    },
                                    sets: 0,
                                    amount: 0,
                                });
                            }
                        }, 'Add Exercise')
                    : null,
                    WorkoutLogs({
                        workout: workout
                    })
                ],
            })
        }
    };
};
