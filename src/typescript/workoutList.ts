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
                            const newIndex = vnode.attrs.allWorkouts.length;
                            vnode.attrs.saveWorkout(newWorkout, newIndex);
                        }),
                        class: 'button primary'
                    }, 'Add Workout'),
                ]),
                m('div.cell.grid-x.grid-margin-x', workoutDisplayList(vnode.attrs.allWorkouts, vnode.attrs.allExercises, vnode.attrs.saveWorkout, vnode.attrs.deleteWorkout, vnode.attrs.updateDefaultExercise))
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
