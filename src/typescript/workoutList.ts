import * as m from 'mithril';
import * as pouchdb from 'pouchdb';
import {Workout} from './exercise';

interface WorkoutListAttrs {
    allWorkouts: Array<Workout>,
    db: pouchdb
};

interface WorkoutListVnode {
    attrs: WorkoutListAttrs
};

let WorkoutList = {
    view: function(vnode: WorkoutListVnode) {
        return m('div', [
            m('h1', 'All Workouts'),
            m('ul', vnode.attrs.allWorkouts.map(function(workout) {
                return m('li', workout.name);
            }))
        ])
    }
};

export {WorkoutListAttrs, WorkoutList};
