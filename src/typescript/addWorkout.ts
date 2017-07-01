import * as m from 'mithril';
import {Workout, Exercise, ExercisePrescription} from './exercise';

interface AddWorkoutAttrs {
    allExercises: Array<Exercise>
};

interface AddWorkoutVnode {
    attrs: AddWorkoutAttrs
};

let newWorkout: Workout = {
    _id: 'workout_' + Date.now(), // TODO: add a random number in here
    prescriptions: []
};

const getTableAndInput = function(prescriptions: Array<ExercisePrescription>, allExercises: Array<Exercise>) {
    const table = prescriptions.map(function(prescription) {
        return m('tr', [
            m('td', prescription.exercise.name),
            m('td', prescription.sets),
            m('td', prescription.amount)
        ]);
    });
    const inputRow = m('tr', [
        m('td', m('select', allExercises.map(function(exercise) {
            return m('option', exercise.name);
        }))),
        m('td', 'input here'),
        m('td', 'reps here')
    ]);
    return table.concat(inputRow);
}

const AddWorkout = {
    view: function(vnode: AddWorkoutVnode) {
        return m('div', [
            m('h1', 'New Workout'),
            m('table', [
                m('thead', [
                    m('tr', [
                        m('td', 'Exercise'),
                        m('td', 'Sets'),
                        m('td', 'Reps')
                    ])
                ]),
                m('tbody', getTableAndInput(newWorkout.prescriptions, vnode.attrs.allExercises))
            ])]);
    }
};

export {AddWorkout, AddWorkoutAttrs};
