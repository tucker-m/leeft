import * as m from "mithril";
import {Saveable, Exercise, Workout, SetUnits} from "./types/exercise";
import WorkoutList from './workouts/workoutList';
import db from './helpers/db';
import LogWorkout from './logs/logWorkout';
import ViewWorkout from './workouts/viewWorkout';
import ViewLog from './logs/viewLog'
import {observable, IObservableObject} from 'mobx'
import TopBar from './ui/topBar'
import jss from 'jss'
import preset from 'jss-preset-default'
import styles from '../styles'

jss.setup(preset())
const {classes: typography} = jss.createStyleSheet(styles.typography).attach()

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
        }
        return m('div', [
            TopBar({
                buttons: [{
                    text: '+ New Workout',
                    action: () => {
                        db.promiseSaveableRecord({
                            _id: 'workout_' + Date.now(),
                            name: '',
                            prescriptions: [],
                        }).then((workout) => {
                            window.location.href = `#!/workouts/${workout._id}`
                        })
                    }
                }]
            }),
            m('h1', {
                class: typography.h1,
            }, 'All Workouts'),
            WorkoutList(workoutListAttrs)
        ])
    }
}

const element = document.getElementById('main')
if (element != null) {
    m.route(element, '/', {
        '/': App,
        '/log/:id': LogWorkout,
        '/workouts/:id': ViewWorkout,
        '/logs/:id': ViewLog,
    })
}
