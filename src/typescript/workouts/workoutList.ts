import * as m from 'mithril';
import {Saveable, Saved, Puttable, Workout, SetUnits} from '../types/exercise';
import preventDefault from '../helpers/preventDefaultFunction';
import {IObservableObject} from 'mobx'
import db from '../helpers/db'
import style from '../../styles'
import jss from 'jss'
import preset from 'jss-preset-default'
import utils from '../helpers/utils'

jss.setup(preset())
const {classes} = jss.createStyleSheet(style.main).attach()
const {classes: typography} = jss.createStyleSheet(style.typography).attach()

interface WorkoutListAttrs {
    allWorkouts: Array<Workout & Puttable>,
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
                    const workoutExerciseNames = workout.prescriptions.map((prescription) => {
                        return prescription.exercise.name
                    })
                    return m('li', {
                        class: classes.workoutList,
                    }, [
                        m('a', {
                            href: '/workouts/' + workout._id,
                            oncreate: m.route.link,
                            class: typography.workoutTitle,
                        }, workout.name ? workout.name : 'Untitled Workout'),
                        m('p', {
                            class: utils.combineStyles([
                                classes.workoutListExercises,
                                workoutExerciseNames.length == 0
                                    ? classes.noExercises : '',
                            ])
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
