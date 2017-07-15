import * as m from 'mithril';
import * as pouchdb from 'pouchdb';
import {Workout, Exercise, ExercisePrescription} from './exercise';
import {AddPrescription} from './addPrescription';

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
        _id: 'workout_' + Date.now(), // TODO: put this somewhere else
        name: '',
        prescriptions: []
    };
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
            const db = vnode.attrs.db;
            return m('div', [
                m('h1', 'New Workout'),
                m('input[type=text]', {
                    onchange: m.withAttr('value', function(value) {
                        workout.name = value;
                    }),
                    value: workout.name
                }),
                ...getTableAndInput(workout.prescriptions, vnode.attrs.allExercises, workout),
                m('button', {
                    onclick: function(event) {
                        event.preventDefault();
                        workout._id = 'workout_' + Date.now().toString() + workout.name;
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
