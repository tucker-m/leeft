import PouchDB from 'pouchdb';
import * as m from 'mithril';
import EditWorkout from './editWorkout';
import {Workout, Exercise} from './exercise';
import preventDefault from './preventDefaultFunction';

interface WorkoutDisplayAttrs {
    db: PouchDB.Database
    workout: Workout,
    allExercises: Array<Exercise>,
    allWorkouts: Array<Workout>,
};

interface WorkoutDisplayVnode {
    attrs: WorkoutDisplayAttrs
};

const WorkoutDisplayComponent = function(vnode: WorkoutDisplayVnode) {
    let workout = vnode.attrs.workout;
    let beingEdited = false;
    const editWorkoutSubmitFunction = function(workout: Workout) {
        // TODO: do something if the db save fails here.
        beingEdited = false;
        vnode.attrs.db.put(workout).then((response) => {
            m.redraw();
        });
    };
    return {
        view: function(vnode) {
            let elements = [
                m('h3', workout.name),
                m('div', {
                    style: 'display: ' + (beingEdited ? 'none' : 'block') + ';'
                }, [
                    m('a', {
                        onclick: preventDefault(() => {
                            beingEdited = true;
                        }),
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
                                m('td', m('input', {
                                    type: 'text',
                                    value: prescription.exercise.name,
                                    onchange: m.withAttr('value', function(value) {prescription.exercise.name = value})
                                })),
                                m('td', m('input', {
                                    type: 'text',
                                    value: prescription.sets,
                                    onchange: m.withAttr('value', function(value) {prescription.exercise.name = value})
                                })),
                                m('td', m('input', {
                                    type: 'text',
                                    value: prescription.amount,
                                    onchange: m.withAttr('value', function(value) {prescription.exercise.name = value})
                                }))
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

const WorkoutDisplay = function(attrs: WorkoutDisplayAttrs) {
    return m(WorkoutDisplayComponent, attrs);
};

export default WorkoutDisplay;
