import * as m from "mithril";
import * as pouchdb from "pouchdb";
import {Exercise, SetUnits, RecordTypeNames, ExercisePrescription} from "./exercise";
import {ExerciseList, ExerciseListAttrs} from './exerciseList';
import {AddExercise, AddExerciseAttrs} from './addExercise';
import {AddPrescription, AddPrescriptionAttrs} from './addPrescription';

let db = new pouchdb('leeft');

let app = {
    view: function() {
        return m(exerciseAddForm);
    }
};
let allExercises:Array<Exercise> = [];
db.allDocs({startkey: 'exercise_', include_docs: true}).then(function(docs) {
    allExercises = docs.rows.map(function(row) {
        return row.doc;
    });
    m.redraw();
});

let exerciseAddForm = {
    view: function() {
        const exerciseListAttrs: ExerciseListAttrs = {
            allExercises,
            db
        };
        const addExerciseAttrs: AddExerciseAttrs = {
            allExercises,
            db
        };
        const addPrescriptionAttrs: AddPrescriptionAttrs = {
            allExercises
        };
        return m('div', [
            m('h1', 'Add Exercise'),
            m(AddExercise, addExerciseAttrs),
            m(ExerciseList, exerciseListAttrs),
            m(AddPrescription, addPrescriptionAttrs)
        ]);
    }
};

m.mount(document.getElementById('main'), app);

if (module.hot) {
    module.hot.accept();
}
