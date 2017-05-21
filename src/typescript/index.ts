import * as m from "mithril";
import * as pouchdb from "pouchdb";
import {Exercise, RecordType, RecordTypeNames} from "./exercise";
import ExerciseList from './exerciseList';

let db = new pouchdb('leeft');

let app = {
    view: function() {
        return m(exerciseAddForm);
    }
};
let newExercise: Exercise = {_id: '', name: '', type: RecordType.SetsAndReps};
let allExercises:Array<Exercise> = [];

db.allDocs({include_docs: true}).then(function(docs) {
    allExercises = docs.rows.map(function(row) {
        return row.doc;
    });
    m.redraw();
});

let exerciseAddForm = {
    view: function() {
        return m('div', [
            m('form', {
                onsubmit: function(event) {
                    event.preventDefault();
                    newExercise._id = Date.now().toString() + newExercise.name;
                    allExercises.push(newExercise);
                    db.put(newExercise);
                    newExercise = {_id: '', name: '', type: RecordType.SetsAndReps};
                }
            }, [
                m('input[type=text][placeholder="Exercise name"]', {
                    oninput: m.withAttr('value', function(value:string) {newExercise.name = value;}),
                    value: newExercise.name
                }),
                m('select', {
                    onchange: m.withAttr('value', function(value:string) {
                        let newValue = parseInt(value);
                        newExercise.type = newValue;
                    })
                }, Array.from(RecordTypeNames.entries()).map(function(tuple) {
                    return m('option[value=' + tuple[0] + ']', tuple[1]);
                })),
                m('button[type=submit]', 'Add'),
                m(ExerciseList, {allExercises: allExercises})
            ])
        ]);
    }
};

m.mount(document.getElementById('main'), app);

if (module.hot) {
    module.hot.accept();
}
