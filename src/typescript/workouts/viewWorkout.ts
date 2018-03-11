import * as m from 'mithril';
import db from '../helpers/db';
import {Saveable, Workout} from '../types/exercise';
import ViewWorkoutRow from '../workouts/viewWorkoutRow';
import WorkoutLogs from '../workouts/workoutLogs';
import {observable, IObservableObject} from 'mobx';
import EditableH1 from '../ui/editableH1'
import TopBar from '../ui/topBar'
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
    dom?: any
};

export default (vnode: ViewWorkoutVnode) => {
    let workout: (Workout & Saveable & IObservableObject) = observable({
        _id: '',
        name: '',
        prescriptions: [],
    })
    db.fetchSaveableRecord<Workout>(vnode.attrs.id).then((returnedWorkout) => {
        workout = returnedWorkout;
        m.redraw();
    })

    let pageEditable = false

    return {
        view: (vnode: ViewWorkoutVnode) => {
            return m('div', [
                TopBar({
                    editButton: {
                        changeEditMode: (value) => {pageEditable = value},
                        buttonText: 'Workout',
                    }
                }),
                m('div', {
                    class: main.constraint
                }, [
                    EditableH1({
                        name: workout.name,
                        placeholder: 'Untitled Workout',
                        updateFunc: (newName: string) => { workout.name = newName },
                        showEditButton: pageEditable,
                    }),
                    m('table.table', [
                        m('thead', m('tr', [
                            m('td', 'Exercise'),
                            m('td', 'Amount'),
                            pageEditable ? m('td') : null,
                        ])),
                        m('tbody', workout.prescriptions.map((prescription, index) => {
                            return m(ViewWorkoutRow, {
                                prescription,
                                showEditButtons: pageEditable,
                                deleteFunction: () => {
                                    workout.prescriptions.splice(index, 1);
                                },
                            });
                        }))
                    ]),
                    pageEditable ?
                        m('button', {
                            onclick: () => {
                                workout.prescriptions.push({
                                    exercise: {
                                        name: '',
                                        setUnits: 'reps',
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
                ]),
            ]);
        }
    };
};
