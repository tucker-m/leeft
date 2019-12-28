import * as m from "mithril";
import {Saveable, Puttable, Workout, Program} from "./types/exercise";
import db from './helpers/db';
import ViewWorkout from './workouts/viewWorkout';
import ViewLog from './logs/viewLog'
import ViewProgram from './programs/viewProgram'
import {observable, IObservableObject} from 'mobx'
import {RenderPage} from './ui/page'
import * as IndexContents from './indexContent'
import Workouts from './workouts/list'
import Logs from './logs/list'
import ViewWorkoutDemo from './workouts/demo'

db.init();

let App = {
    view: function() {
        return m(componentList);
    }
};

let allPrograms: (Program & Puttable)[] = []
db.fetchSaveableCollection<Program>('program').then((collection) => {
    allPrograms = collection
    m.redraw()
})
let componentList = {
    view: function() {
        return RenderPage({
            contents: {
		component: IndexContents.component,
		attrs: {
		    allPrograms,
		}
	    },
	    pageEditable: false,
        })
    }
}

const element = document.getElementById('main')
if (element != null) {
    m.route(element, '/', {
        '/': App,
	'/workouts': Workouts,
	'/logs': Logs,
        '/logs/:id': ViewLog,
        '/logs/:id/:edit': ViewLog,
        '/programs/:id': ViewProgram,
        '/programs/:id/workouts/:day': ViewWorkout,
        '/programs/:id/workouts/:day/:edit': ViewWorkout,
	'/workouts/demo': ViewWorkoutDemo,
    })
}
