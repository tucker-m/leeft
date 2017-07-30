import PouchDB from 'pouchdb';
import * as m from 'mithril';
import {EditWorkout} from './editWorkout';
import {Workout, Exercise} from './exercise';
import preventDefault from './preventDefaultFunction';

interface WorkoutDisplayAttrs {
    db: PouchDB.Database
    workout: Workout,
    allExercises: Array<Exercise>,
    allWorkouts: Array<Workout>,
};

const WorkoutDisplay = function(vnode) {
    let workout = vnode.attrs.workout;
    let beingEdited = false;
    const editWorkoutSubmitFunction = function(workout: Workout) {
        // TODO: do something if the db save fails here.
        beingEdited = false;
        vnode.attrs.db.put(workout).then((function(response) {
            m.redraw();
        }).bind(this));
    };
    return {
        view: function(vnode) {
            let elements = [
                m('h3', workout.name),
                m('div', {
                    style: 'display: ' + (beingEdited ? 'none' : 'block') + ';'
                }, [
                    m('a', {
                        onclick: preventDefault(function() {
                            beingEdited = true;
                        }.bind(this)),
                        href: '#'
                    }, 'Edit'),
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
                ])
            ];
            if (beingEdited) {
                const attrs = {
                    db: vnode.attrs.db,
                    allExercises: vnode.attrs.allExercises,
                    allWorkouts: vnode.attrs.allWorkouts,
                    workout: workout,
                    submitFunction: editWorkoutSubmitFunction
                };
                elements.push(EditWorkout(attrs));
            }
            return elements;
        }
    };
};

export {WorkoutDisplay, WorkoutDisplayAttrs};
