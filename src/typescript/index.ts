import * as m from "mithril";
import PouchDB from "pouchdb";
import {Exercise, Workout} from "./exercise";
import ExerciseList from './exerciseList';
import WorkoutList from './workoutList';

let db = new PouchDB('leeft');

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
            saveWorkout: function(workout, index) {
                allWorkouts[index] = workout;
            }
        };
        return m('div', [
            ExerciseList(exerciseListAttrs),
            WorkoutList(workoutListAttrs)
        ]);
    }
};

m.mount(document.getElementById('main'), app);
