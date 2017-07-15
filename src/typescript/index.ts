import * as m from "mithril";
import * as pouchdb from "pouchdb";
import {Exercise, SetUnits, RecordTypeNames, ExercisePrescription, Workout} from "./exercise";
import {ExerciseList, ExerciseListAttrs} from './exerciseList';
import {AddExercise, AddExerciseAttrs} from './addExercise';
import {AddPrescription} from './addPrescription';
import {EditWorkout, EditWorkoutAttrs} from './editWorkout';
import {WorkoutList, WorkoutListAttrs} from './workoutList';

let db = new pouchdb('leeft');

let app = {
    view: function() {
        return m(exerciseAddForm);
    }
};
let allExercises:Array<Exercise> = [];
db.allDocs({startkey: 'exercise_', endkey: 'exercise_\uffff', include_docs: true}).then(function(docs) {
    allExercises = docs.rows.map(function(row) {
        return row.doc;
    });
    m.redraw();
});
let allWorkouts:Array<Workout> = [];
db.allDocs({startkey: 'workout_', endkey: 'workout_\uffff', include_docs: true}).then(function(docs) {
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
        const editWorkoutAttrs: EditWorkoutAttrs = {
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
        const workoutListAttrs: WorkoutListAttrs = {
            allWorkouts,
            allExercises,
            db
        };
        return m('div', [
            m('h1', 'Add Exercise'),
            m(AddExercise, addExerciseAttrs),
            m(ExerciseList, exerciseListAttrs),
            m(EditWorkout, editWorkoutAttrs),
            m(WorkoutList, workoutListAttrs)
        ]);
    }
};

m.mount(document.getElementById('main'), app);

if (module.hot) {
    module.hot.accept();
}
