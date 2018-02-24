import * as m from 'mithril';
import db from '../helpers/db';
import {Saveable, Workout} from '../types/exercise';
import ViewWorkoutMenu from '../workouts/viewWorkoutMenu';
import ViewWorkoutRow from '../workouts/viewWorkoutRow';
import WorkoutLogs from '../workouts/workoutLogs';
import {observable, IObservableObject} from 'mobx';
import EditableH1 from '../ui/editableH1'

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

    let showMenu = false;
    let showEditButtons = false;
    let titleBeingEdited = false;

    return {
        onupdate: (vnode: ViewWorkoutVnode) => {
            if (titleBeingEdited) {
                vnode.dom.querySelector('input.title').focus()
            }
        },
        view: (vnode: ViewWorkoutVnode) => {
            return m('div', [
                m('div.grid-x.grid-margin-x.align-middle', [
                    titleBeingEdited
                        ? m('input[type=text].cell.auto.title', {
                            value: workout.name,
                            onchange: m.withAttr('value', (value) => {
                                workout.name = value;
                            }),
                            placeholder: "New Workout Name...",
                        })
                    : EditableH1({
                        name: workout.name,
                        updateFunc: (newName: string) => { workout.name = newName },
                        showEditButton: false,
                    }),
                    showEditButtons || titleBeingEdited
                        ? m('button.button.secondary', {
                            onclick: () => {
                                showEditButtons = false;
                                titleBeingEdited = false;
                            },
                        }, 'Done')
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
                m('button.button.small', {
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
                }, 'Add Exercise'),
                WorkoutLogs({
                    workout: workout
                })
            ]);
        }
    };
};
