import * as m from "mithril";
import * as pouchdb from "pouchdb";
import {Exercise, SetUnits, RecordTypeNames, ExercisePrescription} from "./exercise";
import {ExerciseList, ExerciseListAttrs} from './exerciseList';
import {AddExercise, AddExerciseAttrs} from './addExercise';

let db = new pouchdb('leeft');

let app = {
    view: function() {
        return m(exerciseAddForm);
    }
};
let allExercises:Array<Exercise> = [];
let newPrescription: ExercisePrescription = {
    exercise: null,
    sets: 0,
    amount: 0
};
db.allDocs({startkey: 'exercise_', include_docs: true}).then(function(docs) {
    allExercises = docs.rows.map(function(row) {
        return row.doc;
    });
    m.redraw();
});

let exerciseAddForm = {
    view: function() {
        let label = '';
        if (newPrescription.exercise != null) {
            if (newPrescription.exercise.setUnits == SetUnits.Weight) { label = 'Reps' };
            if (newPrescription.exercise.setUnits == SetUnits.Time) { label = 'Time (seconds)' };
        }
        const exerciseListAttrs: ExerciseListAttrs = {
            allExercises,
            db
        };
        const addExerciseAttrs: AddExerciseAttrs = {
            allExercises,
            db
        };
        return m('div', [
            m('h1', 'Add Exercise'),
            m(AddExercise, addExerciseAttrs),
            m(ExerciseList, exerciseListAttrs),
            m('h1', 'Add Prescription'),
            m('form', {
                onsubmit: function(event) {
                    event.preventDefault();
                    
                }
            }, [
                m('div', [
                    m('label[for=select-exercise]', 'Exercise'),
                    m('select#select-exercise', {
                        onchange: function(event) {
                            let selectedIndex = event.target.selectedIndex;
                            let selectedExercise = allExercises[event.target.options[selectedIndex].value];
                            newPrescription.exercise = selectedExercise;
                        }
                    }, allExercises.map(function(exercise, index) {
                        return m('option[value=' + index + ']', exercise.name);
                    }))
                ]),
                m('div', [
                    m('label[for=select-exercise-sets]', 'Sets'),
                    m('input#select-exercise-sets[type=number]')
                ]),
                m('div', [
                    m('label[for=select-exercise-amount]', label),
                    m('input#select-exercise-amount[type=number]')
                ]),
                m('button[type=submit]', 'Add')
            ])
        ]);
    }
};

m.mount(document.getElementById('main'), app);

if (module.hot) {
    module.hot.accept();
}
