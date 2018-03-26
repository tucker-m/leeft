import * as m from "mithril";
import {Saveable, Exercise, Workout, Program} from "./types/exercise";
import WorkoutList from './workouts/workoutList';
import ProgramList from './programs/programList'
import db from './helpers/db';
import ViewWorkout from './workouts/viewWorkout';
import ViewLog from './logs/viewLog'
import ViewProgram from './programs/viewProgram'
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
db.getAllItems('workout').then((docs) => {
    allWorkouts = docs.rows.map((row) => {
        return row.doc;
    });
    m.redraw();
});

let allPrograms: Array<Program & Saveable> = []
db.getAllItems('program').then((docs) => {
    allPrograms = docs.rows.map((row) => {
        return row.doc
    })
    m.redraw()
})

let componentList = {
    view: function() {
        const contents = [
            H1({text: 'All Programs'}),
            ProgramList({allPrograms}),
            H1({text: 'All Workouts'}),
            WorkoutList({allWorkouts})
        ]
        return Page({
            topBarButtons: [
                {
                    text: '+ Workout',
                    action: () => {
                        db.promiseSaveableRecord<Workout>({
                            _id: 'workout_' + Date.now(),
                            name: '',
                            prescriptions: [],
                            tag: 'workout',
                        }).then((workout) => {
                            window.location.href = `#!/workouts/${workout._id}`
                        })
                    }
                },
            ],
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
        '/programs/:id': ViewProgram,
    })
}
