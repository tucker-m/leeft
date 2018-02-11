import * as m from "mithril";
import {Saveable, Exercise, Workout, SetUnits} from "./exercise";
import WorkoutList from './workoutList';
import db from './db';
import LogWorkout from './logWorkout';
import ViewWorkout from './viewWorkout';
import ViewLog from './viewLog'
import {observable, IObservableObject} from 'mobx'

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

let allWorkouts:Array<Workout & Saveable> = [];
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

let componentList = {
    view: function() {
        const workoutListAttrs = {
            allWorkouts,
            allExercises,
            saveWorkout: function(workout: Workout & Saveable & IObservableObject, index: number) {
                allWorkouts[index] = workout; // TODO: does the index need to be here?
            },
        };
        return m('div', [
            WorkoutList(workoutListAttrs)
        ]);
    }
};

m.route(document.getElementById('main'), '/', {
    '/': App,
    '/log/:id': LogWorkout,
    '/workouts/:id': ViewWorkout,
    '/logs/:id': ViewLog,
});
