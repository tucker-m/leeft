import * as m from 'mithril';
import * as pouchdb from 'pouchdb';
import {Workout, Exercise} from './exercise';
import {WorkoutDisplay, WorkoutDisplayAttrs} from './workoutDisplay';

interface WorkoutListAttrs {
    allWorkouts: Array<Workout>,
    allExercises: Array<Exercise>,
    db: pouchdb
};

interface WorkoutListVnode {
    attrs: WorkoutListAttrs
};

let WorkoutList = function(vnode: WorkoutListVnode) {
    return {
        view: function(vnode: WorkoutListVnode) {
            return m('div', [
                m('h2', 'All Workouts'),
                vnode.attrs.allWorkouts.map(function(workout) {
                    const attrs: WorkoutDisplayAttrs = {
                        db: vnode.attrs.db,
                        workout: workout,
                        allExercises: vnode.attrs.allExercises,
                        allWorkouts: vnode.attrs.allWorkouts
                    };
                    return m(WorkoutDisplay, attrs)
                })
            ]);
        }
    }
};

export {WorkoutListAttrs, WorkoutList};
