import * as m from 'mithril';
import {Saveable, Saved, Puttable, Workout, SetUnits} from '../types/exercise';
import preventDefault from '../helpers/preventDefaultFunction';
import {IObservableObject} from 'mobx'
import db from '../helpers/db'
import u from '../helpers/utils'

interface WorkoutListAttrs {
    allWorkouts: Array<Workout & Puttable>,
    css: any,
};

interface WorkoutListVnode {
    attrs: WorkoutListAttrs
};

let WorkoutListComponent = function(vnode: WorkoutListVnode) {
    const css = vnode.attrs.css
    return {
        view: function(vnode: WorkoutListVnode) {
            let elements: Array<m.Vnode<{}, {}>> = [];
            if (vnode.attrs.allWorkouts.length == 0) {
                elements.push(m('p', 'You haven\'t created any workouts yet.'))
            }
            else {
                elements.push(m('ul', vnode.attrs.allWorkouts.map((workout) => {
                    const workoutExerciseNames = workout.prescriptions.map((prescription) => {
                        return prescription.exercise.name
                    })
                    return m('li', {
                        class: css.workoutList,
                    }, [
                        m('a', {
                            href: '/workouts/' + workout._id,
                            oncreate: m.route.link,
                            class: u.c(
                                css.itemTitle,
                                !workout.name ? css.empty : ''
                            ),
                        }, workout.name ? workout.name : 'Untitled Workout'),
                        m('p', {
                            class: u.c(
                                css.workoutListExercises,
                                workoutExerciseNames.length == 0
                                    ? css.empty: '',
                            )
                        }, workoutExerciseNames.length > 0
                          ? workoutExerciseNames.join(', ')
                          : 'This workout is empty.')
                    ])
                })));
            }

            return m('div', elements)
        }
    }
};

const WorkoutList = function(attrs: WorkoutListAttrs) {
    return m(WorkoutListComponent, attrs);
};

export default WorkoutList;
