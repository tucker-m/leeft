import * as pouchdb from 'pouchdb';
import * as m from 'mithril';
import {EditWorkout, EditWorkoutAttrs} from './editWorkout';
import {Workout, Exercise} from './exercise';

interface WorkoutDisplayAttrs {
    db: pouchdb
    workout: Workout,
    allExercises: Array<Exercise>,
    allWorkouts: Array<Workout>,
};

const WorkoutDisplay = function(vnode) {
    let workout = vnode.attrs.workout;
    let beingEdited = false;
    const editWorkoutSubmitFunction = function(workout: Workout) {
        const indexAdded = vnode.attrs.allWorkouts.push(workout) - 1;
        vnode.attrs.db.put(workout).then((function(response) {
            vnode.attrs.allWorkouts[indexAdded]._rev = response.rev;
            m.redraw();
        }).bind(this));
    };
    return {
        view: function(vnode) {
            let elements = [
                m('h2', workout.name),
                m('div', {
                    style: 'display: ' + (beingEdited ? 'none' : 'block') + ';'
                }, [
                    m('a', {
                        onclick: function(event) {
                            event.preventDefault();
                            beingEdited = true;
                        }.bind(this),
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
                const attrs: EditWorkoutAttrs = {
                    db: vnode.attrs.db,
                    allExercises: vnode.attrs.allExercises,
                    allWorkouts: vnode.attrs.allWorkouts,
                    workout: workout,
                    submitFunction: editWorkoutSubmitFunction
                };
                elements.push(m(EditWorkout, attrs));
            }
            return elements;
        }
    };
};

export {WorkoutDisplay, WorkoutDisplayAttrs};
