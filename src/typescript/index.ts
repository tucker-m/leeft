import * as m from "mithril";
import {Saveable, Exercise, Workout, SetUnits} from "./types/exercise";
import WorkoutList from './workouts/workoutList';
import db from './helpers/db';
import ViewWorkout from './workouts/viewWorkout';
import ViewLog from './logs/viewLog'
import {observable, IObservableObject} from 'mobx'
import jss from 'jss'
import preset from 'jss-preset-default'
import styles from '../styles'
import Page from './ui/page'
import H1 from './ui/h1'

jss.setup(preset())
const {classes: typography} = jss.createStyleSheet(styles.typography).attach()

db.init();

let App = {
    view: function() {
        return m(componentList);
    }
};

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
        const contents = [
            H1({text: 'All Workouts'}),
            WorkoutList(workoutListAttrs)
        ]
        return Page({
            topBarButtons: [{
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
            }],
            contents: contents
        })
    }
}

const element = document.getElementById('main')
if (element != null) {
    m.route(element, '/', {
        '/': App,
        '/workouts/:id': ViewWorkout,
        '/logs/:id': ViewLog,
    })
}
