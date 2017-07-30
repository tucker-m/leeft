import * as m from 'mithril';
import PouchDB from "pouchdb";
import {Workout, Exercise} from './exercise';
import WorkoutDisplay from './workoutDisplay';

interface WorkoutListAttrs {
    allWorkouts: Array<Workout>,
    allExercises: Array<Exercise>,
    db: PouchDB
};

interface WorkoutListVnode {
    attrs: WorkoutListAttrs
};

let WorkoutListComponent = function(vnode: WorkoutListVnode) {
    return {
        view: function(vnode: WorkoutListVnode) {
            return m('div', [
                m('h2', 'All Workouts'),
                vnode.attrs.allWorkouts.map(function(workout) {
                    const attrs = {
                        db: vnode.attrs.db,
                        workout: workout,
                        allExercises: vnode.attrs.allExercises,
                        allWorkouts: vnode.attrs.allWorkouts
                    };
                    return WorkoutDisplay(attrs);
                })
            ]);
        }
    }
};

const WorkoutList = function(attrs: WorkoutListAttrs) {
    return m(WorkoutListComponent, attrs);
};

export default WorkoutList;
