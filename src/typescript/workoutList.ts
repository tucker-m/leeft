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
            vnode.attrs.allWorkouts.map(function(workout) {
                return m('div', [
                    m('h2', workout.name),
                    m('table', [
                        m('thead', [
                            m('tr', [
                                m('td', 'Exercise name'),
                                m('td', 'Sets'),
                                m('td', 'Amount')
                            ])
                        ]),
                        m('tbody', workout.prescriptions.map(function(prescription) {
                            return m('tr', [
                                m('td', prescription.exercise.name),
                                m('td', prescription.sets),
                                m('td', prescription.amount)
                            ]);
                        }))
                    ])
                ]);
            })
        ])
    }
};

export {WorkoutListAttrs, WorkoutList};
