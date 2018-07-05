import * as m from "mithril";
import {Saveable, Puttable, Exercise, Workout, Program, Settings} from "./types/exercise";
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
const {classes} = jss.createStyleSheet(styles).attach()
db.init();

let App = {
    view: function() {
        return m(componentList);
    }
};

let allPrograms: Array<Program & Puttable> = []
db.fetchSaveableCollection<Program>('program').then((collection) => {
    allPrograms = collection
    m.redraw()
})
let settings: Settings = {tag: 'settings', currentProgram: null, nextWorkoutIndex: 0}
db.getSettings().then(record => {
    settings = record
    m.redraw()
})
let componentList = {
    view: function() {
        const contents = [
            H1({text: 'Current Program', css: classes}),
            m('p', settings.currentProgram ? settings.currentProgram.name : 'none'),
            H1({text: 'All Programs', css: classes}),
            ProgramList({allPrograms, css: classes}),
        ]
        return Page({
            css: classes,
            topBarButtons: [
                {
                    text: '+ New Program',
                    action: () => {
                        db.promiseSaveableRecord<Program>({
                            name: '',
                            schedule: [],
                            tag: 'program',
                        }).then((program) => {
                            window.location.href = `#!/programs/${program._id}`
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
        '/logs/:id': ViewLog,
        '/programs/:id': ViewProgram,
        '/programs/:id/workouts/:day': ViewWorkout,
        '/programs/:id/workouts/:day/:edit': ViewWorkout,
    })
}
