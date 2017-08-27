import * as m from 'mithril';
import PouchDB from "pouchdb";
import {Workout, Exercise} from './exercise';
import WorkoutDisplay from './workoutDisplay';
import preventDefault from './preventDefaultFunction';

interface WorkoutListAttrs {
    allWorkouts: Array<Workout>,
    allExercises: Array<Exercise>,
    db: PouchDB,
    saveWorkout: Function
};

interface WorkoutListVnode {
    attrs: WorkoutListAttrs
};

let WorkoutListComponent = function(vnode: WorkoutListVnode) {
    return {
        view: function(vnode: WorkoutListVnode) {
            return m('div', [
                m('h2', 'All Workouts'),
                m('button', {
                    onclick: preventDefault(() => {
                        let newWorkout = {
                            _id: 'workout_' + Date.now(), // TODO: add a random number here
                            name: '',
                            prescriptions: []
                        };
                        vnode.attrs.allWorkouts.push(newWorkout);
                    }),
                    class: 'button primary'
                }, 'Add New Workout'),
                vnode.attrs.allWorkouts.map(function(workout, index) {
                    const attrs = {
                        workout: workout,
                        allExercises: vnode.attrs.allExercises,
                        deleteFunction: () => {
                            vnode.attrs.allWorkouts.splice(index, 1);
                            vnode.attrs.db.remove(workout);
                        },
                        saveWorkoutFunction: (workout: Workout) => {
                            vnode.attrs.saveWorkout(workout, index);
                        }
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
