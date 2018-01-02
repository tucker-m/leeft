import * as m from 'mithril';
import {Saveable, Workout, Exercise, SetUnits} from './exercise';
import preventDefault from './preventDefaultFunction';
import {IObservableObject} from 'mobx'
import db from './db'

interface WorkoutListAttrs {
    allWorkouts: Array<Workout & Saveable & IObservableObject>,
    allExercises: Array<Exercise>,
    saveWorkout: (w: Workout & IObservableObject, i: number) => void,
};

interface WorkoutListVnode {
    attrs: WorkoutListAttrs
};

interface WorkoutTitleVnode {
    attrs: {
        workout: Workout & Saveable & IObservableObject,
        beingEdited: boolean,
    }
}

const WorkoutTitleComponent = function(vnode: WorkoutTitleVnode) {
    let beingEdited = vnode.attrs.beingEdited
    return {
        view: function(vnode: WorkoutTitleVnode) {
            let workout = vnode.attrs.workout
            if (vnode.attrs.beingEdited) {
                return m('div.input-group', [
                    m('input[type=text].input-group-field', {
                        value: workout.name,
                        placeholder: 'Enter a name for this workout',
                        onchange: m.withAttr('value', (value) => { workout.name = value }),
                    }),
                    m('div.input-group-button', m('button.button', {
                        onclick: () => { beingEdited = false }
                    }, 'Done'))
                ])
            }
            else {
                return m('a', {
                    href: '/workouts/' + workout._id,
                    oncreate: m.route.link,
                }, workout.name)
            }
        }
    }
}

const WorkoutListComponent = function(vnode: WorkoutListVnode) {
    return {
        view: function(vnode: WorkoutListVnode) {
            let elements: Array<m.Vnode<{}, {}>> = [];
            if (vnode.attrs.allWorkouts.length == 0) {
                elements.push(m('p', 'You haven\'t created any workouts yet.'))
            }
            else {
                elements.push(m('ul', vnode.attrs.allWorkouts.map((workout) => {
                    return m('li', m(WorkoutTitleComponent, {workout: workout, beingEdited: (workout.name == '')}))
                })));
            }
            elements.push(m('button.button', {
                onclick: preventDefault(() => {
                    let newWorkout: Workout & Saveable & IObservableObject = db.createSaveableRecord({
                        _id: 'workout_' + Date.now(), // TODO: add a random number here
                        name: '',
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
