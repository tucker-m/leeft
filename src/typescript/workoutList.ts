import * as m from 'mithril';
import PouchDB from "pouchdb";
import {Workout, Exercise} from './exercise';
import preventDefault from './preventDefaultFunction';
import workoutDisplayList from './workoutDisplayList';

interface WorkoutListAttrs {
    allWorkouts: Array<Workout>,
    allExercises: Array<Exercise>,
    db: PouchDB,
    saveWorkout: (w: Workout, i: number) => void,
};

interface WorkoutListVnode {
    attrs: WorkoutListAttrs
};

let WorkoutListComponent = function(vnode: WorkoutListVnode) {
    return {
        view: function(vnode: WorkoutListVnode) {
            let elements = [
                m('div.cell.grid-x.align-justify.align-middle.shrink', [
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
                    }, 'Add Workout'),
                ]),
                m('div.cell.grid-x.grid-margin-x', workoutDisplayList(vnode.attrs.db, vnode.attrs.allWorkouts, vnode.attrs.allExercises, vnode.attrs.saveWorkout))
            ];
            if (vnode.attrs.allWorkouts.length == 0) {
                elements.push(m('div.callout',
                                'You haven\'t created any workouts yet.'));
            }
            return m('div.grid-container.fluid',
                     m('div.grid-y.grid-margin-y',
                       elements
                      )
                    );
        }
    }
};

const WorkoutList = function(attrs: WorkoutListAttrs) {
    return m(WorkoutListComponent, attrs);
};

export default WorkoutList;
