import * as m from "mithril";
import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import {Exercise, Workout} from "./exercise";
import WorkoutList from './workoutList';
import ExerciseList from './exerciseList';

PouchDB.plugin(PouchDBFind);

let db = new PouchDB('leeft');

db.createIndex({
    index: {
        fields: ['name'],
    }
}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});
// TODO: wait until callback finishes?

let app = {
    view: function() {
        return m(componentList);
    }
};

let allExercises:Array<Exercise> = [];
db.allDocs({startkey: 'exercise_', endkey: 'exercise_\uffff', include_docs: true})
    .then(function(docs: PouchDB.Core.AllDocsResponse<Exercise>) {
        allExercises = docs.rows.map(function(row) {
            return row.doc;
        });
        m.redraw();
    });
// TODO: try having a "modifyAllWorkouts" method here instead of pushing to the
// vnode.attrs.allWorkouts array in sub-components. Also, then you wouldn't have to pass
// the DB object into components.
let allWorkouts:Array<Workout> = [];
db.allDocs({startkey: 'workout_', endkey: 'workout_\uffff', include_docs: true})
    .then(function(docs: PouchDB.Core.AllDocsResponse<Workout>) {
        allWorkouts = docs.rows.map(function(row) {
            return row.doc;
        });
        m.redraw();
    });

let componentList = {
    view: function() {
        const exerciseListAttrs = {
            allExercises,
            db
        };
        const workoutListAttrs = {
            allWorkouts,
            allExercises,
            db,
            saveWorkout: function(workout: Workout, index: number) {
                allWorkouts[index] = workout; // TODO: does the index need to be here?
                db.put(workout).then((result) => {
                    console.log(result);
                    workout._rev = result.rev;
                }).catch((error) => {
                    console.log(error);
                });
            }
        };
        return m('div', [
            ExerciseList(exerciseListAttrs),
            WorkoutList(workoutListAttrs)
        ]);
    }
};

m.mount(document.getElementById('main'), app);
