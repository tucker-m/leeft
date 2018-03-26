import * as m from 'mithril';
import db from '../helpers/db';
import {Saveable, Workout} from '../types/exercise';
import WorkoutLogs from '../workouts/workoutLogs';
import {observable, IObservableObject} from 'mobx';
import EditableH1 from '../ui/editableH1'
import WorkoutTable from '../ui/workoutTable'
import Page from '../ui/page'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../../styles'

jss.setup(preset())
const {classes: main} = jss.createStyleSheet(style.main).attach()

interface ViewWorkoutAttrs {
    id: string
};
interface ViewWorkoutVnode {
    attrs: ViewWorkoutAttrs,
};

export default (vnode: ViewWorkoutVnode) => {
    let workout: (Workout & Saveable) = {
        _id: '',
        name: '',
        prescriptions: [],
        tag: 'workout',
    }
    db.fetchSaveableRecord<Workout>(vnode.attrs.id).then((returnedWorkout) => {
        workout = returnedWorkout;
        m.redraw();
    })

    let pageEditable = false

    return {
        view: (vnode: ViewWorkoutVnode) => {
            return Page({
                topBarButtons: [
                    {
                        text: 'Edit Workout',
                        action: () => { pageEditable = true },
                        secondState: {
                            text: 'Done Editing',
                            action: () => { pageEditable = false },
                            color: '#1d70d6',
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
                topBarColor: '#831dd6',
                contents: [
                    EditableH1({
                        name: workout.name,
                        placeholder: 'Untitled Workout',
                        updateFunc: (newName: string) => { workout.name = newName },
                        showEditButton: pageEditable,
                    }),
                    WorkoutTable({
                        headers: ['Exercise', 'Amount'],
                        prescriptions: workout.prescriptions,
                        showEditButtons: pageEditable,
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
