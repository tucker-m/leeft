import * as m from 'mithril';
import {Saveable, Workout, Exercise, SetUnits} from './exercise';
import preventDefault from './preventDefaultFunction';
import workoutDisplayList from './workoutDisplayList';
import {IObservableObject} from 'mobx'
import db from './db'

interface WorkoutListAttrs {
    allWorkouts: Array<Workout & Saveable>,
    allExercises: Array<Exercise>,
    saveWorkout: (w: Workout & IObservableObject, i: number) => void,
    deleteWorkout: (w: Workout, i: number) => void,
};

interface WorkoutListVnode {
    attrs: WorkoutListAttrs
};

let WorkoutListComponent = function(vnode: WorkoutListVnode) {
    return {
        view: function(vnode: WorkoutListVnode) {
            let elements: Array<m.Vnode<{}, {}>> = [];
            if (vnode.attrs.allWorkouts.length == 0) {
                elements.push(m('p', 'You haven\'t created any workouts yet.'))
            }
            else {
                elements.push(m('ul', vnode.attrs.allWorkouts.map((workout) => {
                    return m('li', m('a', {
                        href: '/workouts/' + workout._id,
                        oncreate: m.route.link,
                    }, workout.name))
                })));
            }
            elements.push(m('button.button', {
                onclick: preventDefault(() => {
                    let newWorkout: Workout & Saveable & IObservableObject = db.createSaveableRecord({
                        _id: 'workout_' + Date.now(), // TODO: add a random number here
                        name: 'New Workout',
                        prescriptions: []
                    });
                    const newIndex = vnode.attrs.allWorkouts.length;
                    vnode.attrs.saveWorkout(newWorkout, newIndex);
                }),
                class: 'button primary'
            }, 'Add Workout'));

            return elements;
        }
    }
};

const WorkoutList = function(attrs: WorkoutListAttrs) {
    return m(WorkoutListComponent, attrs);
};

export default WorkoutList;
