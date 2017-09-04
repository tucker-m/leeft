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
            return m('div.grid-container.fluid', [
                m('div.grid-x.align-justify.align-middle', [
                    m('h1.cell.shrink', 'All Workouts'),
                    m('button.cell.shrink', {
                        onclick: preventDefault(() => {
                            let newWorkout: Workout = {
                                _id: 'workout_' + Date.now(), // TODO: add a random number here
                                name: '',
                                prescriptions: []
                            };
                            vnode.attrs.allWorkouts.push(newWorkout);
                            vnode.attrs.db.put(newWorkout).then((result) => {
                                newWorkout._rev = result.rev;
                            }); // TODO: catch error
                        }),
                        class: 'button primary'
                    }, 'Add New Workout'),
                ]),
                m('div.grid-x.grid-margin-x', [
                    vnode.attrs.allWorkouts.map(function(workout, index) {
                        const attrs = {
                            key: workout._id,
                            workout: workout,
                            allExercises: vnode.attrs.allExercises,
                            deleteFunction: () => {
                                vnode.attrs.allWorkouts.splice(index, 1);
                                vnode.attrs.db.remove(workout);
                            },
                            saveWorkoutFunction: (workout: Workout) => {
                                vnode.attrs.saveWorkout(workout, index);
                            },
                            updateDefaultExercise: (exercise: Exercise) => {
                                // If the exercise name doesn't match an existing one,
                                // create a new exercise. If it does but the rep type
                                // has changed, update that.
                                let e = exercise;
                                const db = vnode.attrs.db;
                                db.find({
                                    selector: {name: e.name }
                                }).then((results) => {
                                    // TODO: make sure only one result is
                                    // returned, if any. Exercise names should be unique.
                                    if (results.docs.length == 1) {
                                        e._id = results.docs[0]._id;
                                        e._rev = results.docs[0]._rev;
                                    }
                                    else if (results.docs.length == 0) {
                                        e._id = 'exercise_' + Date.now().toString() + e.name;
                                        // TODO: push to vnode.attrs.allExercises and do a redraw. We're inside of a callback, so it won't be redrawn automatically.
                                        delete e._rev;
                                    }
                                    db.put(e); // TODO: catch errors.
                                    // can't just m.redraw() here, the allExercises
                                    // array needs to be updated. How can we do that?
                                    // TODO ^ that.
                                });
                            },
                        };
                        return WorkoutDisplay(attrs);
                    })
                ])
            ])
        }
    }
};

const WorkoutList = function(attrs: WorkoutListAttrs) {
    return m(WorkoutListComponent, attrs);
};

export default WorkoutList;
