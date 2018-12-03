import * as m from "mithril";
import {Saveable, Puttable, Exercise, Workout, Program} from "./types/exercise";
import db from './helpers/db';
import ViewWorkout from './workouts/viewWorkout';
import ViewLog from './logs/viewLog'
import ViewProgram from './programs/viewProgram'
import {observable, IObservableObject} from 'mobx'
import {RenderPage} from './ui/page'
import * as IndexContents from './indexContent'

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
let componentList = {
    view: function() {
        return RenderPage({
            // topBarButtons: [
            //     {
            //         text: '+ New Program',
            //         action: () => {
            //             db.promiseSaveableRecord<Program>({
            //                 name: '',
            //                 schedule: [],
            //                 tag: 'program',
            //             }).then((program) => {
            //                 window.location.href = `#!/programs/${program._id}`
            //             })
            //         }
            //     },
            // ],
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
        '/logs/:id': ViewLog,
        '/logs/:id/:edit': ViewLog,
        '/programs/:id': ViewProgram,
        '/programs/:id/workouts/:day': ViewWorkout,
        '/programs/:id/workouts/:day/:edit': ViewWorkout,
    })
}
