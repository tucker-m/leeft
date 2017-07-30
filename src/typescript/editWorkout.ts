import * as m from 'mithril';
import PouchDB from 'pouchdb';
import {Workout, Exercise, ExercisePrescription} from './exercise';
import {AddPrescriptionView} from './addPrescriptionView';
import {AddExercise} from './addExercise';
import preventDefault from './preventDefaultFunction';

interface EditWorkoutAttrs {
    workout?: Workout,
    allExercises: Array<Exercise>,
    allWorkouts: Array<Workout>,
    submitFunction: (workout: Workout) => void,
    db: PouchDB.Database
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
    const submitFunction = function(newPrescription: ExercisePrescription) {
        workout.prescriptions.push(newPrescription);
    }
    const addPrescription = AddPrescriptionView({submitFunction, allExercises});
    return [table, addPrescription];
};

const EditWorkoutComponent = function(vnode: EditWorkoutVnode) {
    let workout: Workout = {
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
                m('h2', workout.name == '' ? 'New Workout' : workout.name),
                m('input[type=text]', {
                    onchange: m.withAttr('value', function(value) {
                        workout.name = value;
                    }),
                    value: workout.name
                }),
                m('button', {
                    onclick: preventDefault(function() {
                        addingExercise = true;
                    })
                }, 'Create new exercise'),
                addExerciseComponent,
                ...getTableAndInput(workout.prescriptions, vnode.attrs.allExercises, workout),
                m('button', {
                    onclick: preventDefault(function() {
                        vnode.attrs.submitFunction(workout);
                        workout = {
                            _id: '',
                            name: '',
                            prescriptions: []
                        };
                    })
                }, 'Save Workout')
            ]);
        }
    }
};

const EditWorkout = function(attrs: EditWorkoutAttrs) {
    return m(EditWorkoutComponent, attrs);
};

export {EditWorkout};
