import * as m from "mithril";
import {Exercise, Workout, SetUnits} from "./exercise";
import WorkoutList from './workoutList';
import ExerciseList from './exerciseList';
import db from './db';
import LogWorkout from './logWorkout';
import ViewWorkout from './viewWorkout';
import ViewLog from './viewLog'
import {observable} from 'mobx'

db.init();

let App = {
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

let someWorkout = observable({
    _id: 'initial',
    name: '',
    prescriptions: [],
})
db.getSomeWorkout().then((theWorkout) => {
    someWorkout = theWorkout
})

let componentList = {
    view: function() {
        const workoutListAttrs = {
            allWorkouts,
            allExercises,
            saveWorkout: function(workout: Workout, index: number) {
                allWorkouts[index] = workout; // TODO: does the index need to be here?
                db.put(workout).then((doc) => {
                    workout._rev = doc.rev;
                });
            },
            deleteWorkout: function(workout: Workout, index: number) {
                allWorkouts.splice(index, 1);
                db.remove(workout);
            },
            updateDefaultExercise: function(exerciseName: string, repType: SetUnits) {
                db.findByName(exerciseName).then((results) => {
                    let exercise: Exercise = null;
                    if (results.docs.length == 1) {
                        exercise = results.docs[0];
                        exercise.setUnits = repType;
                    }
                    else if (results.docs.length == 0) {
                        exercise = {
                            _id: 'exercise_' + Date.now().toString() + exerciseName,
                            name: exerciseName,
                            setUnits: repType,
                        };
                        allExercises.push(exercise);
                    }
                    db.put(exercise);
                });
            }
        };
        return m('div', [
            m('button', {
                value: someWorkout._id,
                onclick: m.withAttr('value', (value) => {
                    someWorkout._id = Date.now().toString()
                })
            }, 'click me'),
            WorkoutList(workoutListAttrs)
        ]);
    }
};

m.route(document.getElementById('main'), '/', {
    '/': App,
    '/log/:id': LogWorkout,
    '/workouts/:id': ViewWorkout,
    '/viewlog/:id': ViewLog,
});
