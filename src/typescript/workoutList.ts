import * as m from 'mithril';
import {Workout, Exercise, SetUnits} from './exercise';
import preventDefault from './preventDefaultFunction';
import workoutDisplayList from './workoutDisplayList';

interface WorkoutListAttrs {
    allWorkouts: Array<Workout>,
    allExercises: Array<Exercise>,
    saveWorkout: (w: Workout, i: number) => void,
    deleteWorkout: (w: Workout, i: number) => void,
    updateDefaultExercise: (name: string, repType: SetUnits) => void,
};

interface WorkoutListVnode {
    attrs: WorkoutListAttrs
};

let WorkoutListComponent = function(vnode: WorkoutListVnode) {
    return {
        view: function(vnode: WorkoutListVnode) {
            if (vnode.attrs.allWorkouts.length == 0) {
                return m('p', 'You haven\'t created any workouts yet.');
            }
            else {
                let elements: Array<m.Vnode<{}, {}>> = [];
                elements.push(m('ul', vnode.attrs.allWorkouts.map((workout) => {
                    return m('li', m('a', {
                        href: '/workouts/' + workout._id,
                        oncreate: m.route.link,
                    }, workout.name))
                })));
                elements.push(m('button.button', {
                    onclick: preventDefault(() => {
                        let newWorkout: Workout = {
                            _id: 'workout_' + Date.now(), // TODO: add a random number here
                            name: 'New Workout',
                            prescriptions: []
                        };
                        const newIndex = vnode.attrs.allWorkouts.length;
                        vnode.attrs.saveWorkout(newWorkout, newIndex);
                    }),
                    class: 'button primary'
                }, 'Add Workout'));
                return elements;
            }
        }
    }
};

const WorkoutList = function(attrs: WorkoutListAttrs) {
    return m(WorkoutListComponent, attrs);
};

export default WorkoutList;
