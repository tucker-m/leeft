import * as m from 'mithril';
import db from '../helpers/db';
import {Saveable, Saved, Puttable, Workout, Program} from '../types/exercise';
import * as WorkoutContent from './workoutContents'
import {observable, IObservableObject, set} from 'mobx';
import {RenderPage} from '../ui/page'
import Overlay from '../ui/overlay'

interface ViewWorkoutAttrs {
    id: string,
    day: string,
    edit?: string,
};
interface ViewWorkoutVnode {
    attrs: ViewWorkoutAttrs,
};

export default (vnode: ViewWorkoutVnode) => {
    let workout: (Workout) | null = null
    const day = vnode.attrs.day
    let program: (Program & Puttable) | null = null
    db.fetchSaveableRecord<Program>(vnode.attrs.id).then((returnedProgram) => {
        program = returnedProgram
        const temp = <Workout>returnedProgram.schedule[parseInt(day)]
        workout = temp
        m.redraw()
    })

    let updateWorkout = (newWorkout: Workout) => {
        if (program) {
            program.schedule[parseInt(day)] = newWorkout
            if (workout) {
                set(workout, newWorkout)
            }
        }
    }

    let pageEditable = (!!vnode.attrs.edit && (vnode.attrs.edit == 'edit'))

    return {
        view: (vnode: ViewWorkoutVnode) => {
	    if (!workout) {
		return m('p', 'Loading')
	    }
	    else {
		return m('div', [
                    RenderPage({
			pageEditable,
			contents: {
			    component: WorkoutContent.component,
			    attrs: {
				workout,
				program,
				updateWorkout
			    }
			}
                    })
		])
	    }
        }
    }
}
