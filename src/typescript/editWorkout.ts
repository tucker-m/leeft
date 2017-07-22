import * as m from 'mithril';
import * as pouchdb from 'pouchdb';
import {Workout, Exercise, ExercisePrescription} from './exercise';
import {AddPrescription} from './addPrescription';
import {AddExercise} from './addExercise';

interface EditWorkoutAttrs {
    workout?: Workout,
    allExercises: Array<Exercise>,
    allWorkouts: Array<Workout>,
    submitFunction: (Workout) => void,
    db: pouchdb
};

interface EditWorkoutVnode{
    attrs: EditWorkoutAttrs
};

const getTableAndInput = function(prescriptions: Array<ExercisePrescription>, allExercises: Array<Exercise>, workout: Workout) {
    const tableRows = prescriptions.map(function(prescription) {
        return m('tr', [
            m('td', prescription.exercise.name),
            m('td', prescription.sets),
            m('td', prescription.amount)
        ]);
    });
    const tableBody = m('tbody', tableRows);
    const table = m('table', [
        m('thead', [
            m('tr', [
                m('td', 'Exercise'),
                m('td', 'Sets'),
                m('td', 'Reps')
            ])
        ]),
        tableBody
    ]);
    const submitFunction = function(newPrescription) {
        workout.prescriptions.push(newPrescription);
    }
    const addPrescription = AddPrescription(allExercises, submitFunction);
    return [table, addPrescription];
};

const EditWorkout = function(vnode: EditWorkoutVnode) {
    let workout = {
        _id: 'workout_' + Date.now(), // TODO: add a random number in here
        name: '',
        prescriptions: []
    };
    let addingExercise = false;
    return {
        oninit: function(vnode: EditWorkoutVnode) {
            if (vnode.attrs.workout) {
                workout = vnode.attrs.workout;
            }
        },
        onbeforeupdate: function(vnode: EditWorkoutVnode) {
            if (vnode.attrs.workout) {
                workout = vnode.attrs.workout;
            }
        },
        view: function(vnode: EditWorkoutVnode) {
            let addExerciseComponent = m('div');
            if (addingExercise) {
                const addExerciseAttrs = {
                    allExercises: vnode.attrs.allExercises,
                    submitFunction: function(newExercise: Exercise) {
                        const indexAdded = vnode.attrs.allExercises.push(newExercise) - 1;
                        vnode.attrs.db.put(newExercise).then(function(response) {
                            vnode.attrs.allExercises[indexAdded]._rev = response.rev;
                            m.redraw();
                            // TODO: set the current exercise in the option box to the
                            // newly-created one.
                        }.bind(this));
                        addingExercise = false;
                    }
                };
                addExerciseComponent = AddExercise(addExerciseAttrs);
            }
            const db = vnode.attrs.db;
            return m('div', [
                m('input[type=text]', {
                    onchange: m.withAttr('value', function(value) {
                        workout.name = value;
                    }),
                    value: workout.name
                }),
                m('button', {
                    onclick: function(event) {
                        event.preventDefault();
                        addingExercise = true;
                    }
                }, 'Create new exercise'),
                addExerciseComponent,
                ...getTableAndInput(workout.prescriptions, vnode.attrs.allExercises, workout),
                m('button', {
                    onclick: function(event) {
                        event.preventDefault();
                        vnode.attrs.submitFunction(workout);
                        workout = {
                            _id: '',
                            name: '',
                            prescriptions: []
                        };
                    }
                }, 'Save Workout')
            ]);
        }
    }
};

export {EditWorkout, EditWorkoutAttrs};
