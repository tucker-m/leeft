import * as m from 'mithril';
import db from './db';
import {Saveable, Workout} from './exercise';
import ViewWorkoutMenu from './viewWorkoutMenu';
import ViewWorkoutRow from './viewWorkoutRow';
import WorkoutLogs from './workoutLogs';
import {observable, IObservableObject} from 'mobx';

interface ViewWorkoutAttrs {
    id: string
};
interface ViewWorkoutVnode {
    attrs: ViewWorkoutAttrs
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

    let showMenu = false;
    let showEditButtons = false;
    let titleBeingEdited = false;

    return {
        view: (vnode: ViewWorkoutVnode) => {
            return m('div', [
                m('div.grid-x.grid-margin-x.align-middle', [
                    titleBeingEdited
                        ? m('input[type=text].cell.auto', {
                            value: workout.name,
                            onchange: m.withAttr('value', (value) => {
                                workout.name = value;
                            }),
                        })
                    : m('h1.cell.auto', workout.name),
                    showEditButtons || titleBeingEdited
                        ? m('button.button.secondary', {
                            onclick: () => {
                                showEditButtons = false;
                                titleBeingEdited = false;
                            },
                        }, 'Done Editing')
                    : m('button.button.dropdown.secondary.hollow.cell.shrink', {
                        onclick: () => { showMenu = !showMenu; }
                    }, 'Edit'),
                ]),
                showMenu ? m(ViewWorkoutMenu, {
                    workout: workout,
                    showEditButtons: () => {
                        showEditButtons = true;
                        showMenu = false;
                    },
                    editNameFunction: () => {
                        showMenu = false;
                        titleBeingEdited = true;
                    }
                }) : null,
                m('table', [
                    m('thead', m('tr', [
                        m('td', 'Exercise'),
                        m('td', 'Amount'),
                        showEditButtons ? m('td') : null,
                    ])),
                    m('tbody', workout.prescriptions.map((prescription, index) => {
                        return m(ViewWorkoutRow, {
                            prescription,
                            showEditButtons,
                            deleteFunction: () => {
                                workout.prescriptions.splice(index, 1);
                            },
                        });
                    }))
                ]),
                showEditButtons
                    ? m('button.button.small', {
                        onclick: () => {
                            workout.prescriptions.push({
                                exercise: {
                                    name: 'New Exercise',
                                    setUnits: 'reps',
                                },
                                sets: 0,
                                amount: 0,
                            });
                        }
                    }, 'Add Exercise')
                : null,
                WorkoutLogs({
                    workout_id: workout._id
                })
            ]);
        }
    };
};
