import * as m from 'mithril';
import {Saveable, Workout, Exercise, SetUnits} from '../types/exercise';
import preventDefault from '../helpers/preventDefaultFunction';
import {IObservableObject} from 'mobx'
import db from '../helpers/db'

interface WorkoutListAttrs {
    allWorkouts: Array<Workout & Saveable>,
    allExercises: Array<Exercise>,
};

interface WorkoutListVnode {
    attrs: WorkoutListAttrs
};

let WorkoutListComponent = function(vnode: WorkoutListVnode) {
    return {
        view: function(vnode: WorkoutListVnode) {
            let elements: Array<m.Vnode<{}, {}>> = [
                m('button', {
                    onclick: preventDefault(() => {
                        let newWorkout: Workout & Saveable & IObservableObject = db.createSaveableRecord({
                            _id: 'workout_' + Date.now(), // TODO: add a random number here
                            name: '',
                            prescriptions: []
                        });
                        window.location.href = `#!/workouts/${newWorkout._id}`
                    }),
                    class: 'button'
                }, '+ New Workout')
            ];
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

            return elements;
        }
    }
};

const WorkoutList = function(attrs: WorkoutListAttrs) {
    return m(WorkoutListComponent, attrs);
};

export default WorkoutList;
