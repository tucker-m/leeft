import * as m from "mithril";
import {Exercise, Workout} from "./exercise";
import WorkoutList from './workoutList';
import ExerciseList from './exerciseList';
import db from './db';

db.init();


let app = {
    view: function() {
        return m(componentList);
    }
};

let allExercises:Array<Exercise> = [];
db.getAllExercises().then(function(docs) {
    allExercises = docs.rows.map(function(row) {
        return row.doc;
    });
    m.redraw();
});
// TODO: try having a "modifyAllWorkouts" method here instead of pushing to the
// vnode.attrs.allWorkouts array in sub-components. Also, then you wouldn't have to pass
// the DB object into components.
let allWorkouts:Array<Workout> = [];
db.getAllWorkouts().then((docs) => {
    allWorkouts = docs.rows.map((row) => {
        return row.doc;
    });
    m.redraw();
});

let componentList = {
    view: function() {
        const workoutListAttrs = {
            allWorkouts,
            allExercises,
            saveWorkout: function(workout: Workout, index: number) {
                allWorkouts[index] = workout; // TODO: does the index need to be here?
                db.put(workout);
            },
        };
        return m('div', [
            WorkoutList(workoutListAttrs)
        ]);
    }
};

m.mount(document.getElementById('main'), app);
