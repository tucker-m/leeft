import * as m from 'mithril';
import * as pouchdb from 'pouchdb';
import {Workout, Exercise, ExercisePrescription} from './exercise';
import {AddPrescription} from './addPrescription';

interface AddWorkoutAttrs {
    allExercises: Array<Exercise>,
    allWorkouts: Array<Workout>,
    db: pouchdb
};

interface AddWorkoutVnode {
    attrs: AddWorkoutAttrs
};

let newWorkout: Workout = {
    _id: 'workout_' + Date.now(), // TODO: add a random number in here
    name: '',
    prescriptions: []
};

const getTableAndInput = function(prescriptions: Array<ExercisePrescription>, allExercises: Array<Exercise>) {
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
        newWorkout.prescriptions.push(newPrescription);
    }
    const addPrescription = AddPrescription(allExercises, submitFunction);
    return [table, addPrescription];
};

const AddWorkout = {
    view: function(vnode: AddWorkoutVnode) {
        const db = vnode.attrs.db;
        return m('div', [
            m('h1', 'New Workout'),
            m('input[type=text]', {
                onchange: m.withAttr('value', function(value) {
                    newWorkout.name = value;
                }),
                value: newWorkout.name
            }),
            ...getTableAndInput(newWorkout.prescriptions, vnode.attrs.allExercises),
            m('button', {
                onclick: function(event) {
                    event.preventDefault();
                    newWorkout._id = 'workout_' + Date.now().toString() + newWorkout.name;
                    const indexAdded = vnode.attrs.allWorkouts.push(newWorkout) - 1;
                    db.put(newWorkout).then(function(response) {
                        vnode.attrs.allWorkouts[indexAdded]._rev = response.rev;
                        m.redraw();
                    }.bind(this));

                    newWorkout = {
                        _id: '',
                        name: '',
                        prescriptions: []
                    };
                }
            }, 'Save Workout')
        ]);
    }
};

export {AddWorkout, AddWorkoutAttrs};
