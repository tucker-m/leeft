import * as m from "mithril";
import * as pouchdb from "pouchdb";
import {Exercise, SetUnits, RecordTypeNames, ExercisePrescription, Workout} from "./exercise";
import {ExerciseList, ExerciseListAttrs} from './exerciseList';
import {AddExercise, AddExerciseAttrs} from './addExercise';
import {AddPrescription, AddPrescriptionAttrs} from './addPrescription';
import {AddWorkout, AddWorkoutAttrs} from './addWorkout';
import {WorkoutList, WorkoutListAttrs} from './workoutList';

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
let allWorkouts:Array<Workout> = [];
db.allDocs({startkey: 'workout_', include_docs: true}).then(function(docs) {
    allWorkouts = docs.rows.map(function(row) {
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
        const addWorkoutAttrs: AddWorkoutAttrs = {
            allExercises,
            allWorkouts,
            db
        };
        const workoutListAttrs: WorkoutListAttrs = {
            allWorkouts,
            db
        };
        return m('div', [
            m('h1', 'Add Exercise'),
            m(AddExercise, addExerciseAttrs),
            m(ExerciseList, exerciseListAttrs),
            m(AddWorkout, addWorkoutAttrs),
            m(WorkoutList, workoutListAttrs)
        ]);
    }
};

m.mount(document.getElementById('main'), app);

if (module.hot) {
    module.hot.accept();
}
