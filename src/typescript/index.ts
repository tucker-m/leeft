import * as m from "mithril";
import PouchDB from "pouchdb";
import {Exercise, SetUnits, RecordTypeNames, Workout} from "./exercise";
import {ExerciseList} from './exerciseList';
import {EditWorkout} from './editWorkout';
import {WorkoutList} from './workoutList';

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
        const editWorkoutAttrs = {
            allExercises: allExercises,
            allWorkouts: allWorkouts,
            db: db,
            submitFunction: function(workout: Workout) {
                const indexAdded = allWorkouts.push(workout) - 1;
                db.put(workout).then(function(response) {
                    allWorkouts[indexAdded]._rev = response.rev;
                    m.redraw();
                }).bind(this);
            }.bind(this)
        };
        const workoutListAttrs = {
            allWorkouts,
            allExercises,
            db
        };
        return m('div', [
            ExerciseList(exerciseListAttrs),
            EditWorkout(editWorkoutAttrs),
            WorkoutList(workoutListAttrs)
        ]);
    }
};

m.mount(document.getElementById('main'), app);
