import PouchDB from 'pouchdb';
import * as m from 'mithril';
import {Workout, Exercise, SetUnits, RecordTypeNames} from './exercise';
import preventDefault from './preventDefaultFunction';
import PrescriptionRow from './prescriptionRow';

interface WorkoutDisplayAttrs {
    db: PouchDB.Database
    workout: Workout,
    allExercises: Array<Exercise>,
    allWorkouts: Array<Workout>,
    deleteFunction: Function
};

interface WorkoutDisplayVnode {
    attrs: WorkoutDisplayAttrs
};

const WorkoutDisplayComponent = function(vnode: WorkoutDisplayVnode) {
    let workout = vnode.attrs.workout;
    // TODO: clone the workout instead of pointing to it. If they don't
    // save their changes, we don't want the edited workout to show up
    // in the workoutList. Then the workoutList and pouchdb will have
    // different values.
    return {
        view: function(vnode: WorkoutDisplayVnode) {
            let display = [
                m('form', {
                    // TODO: catch unsuccessful save
                    onsubmit: preventDefault(() => {
                        vnode.attrs.db.put(workout);
                    })
                }, [
                    m('button[type=submit]', 'Save'),
                    m('button', {
                        onclick: preventDefault(() => {
                            vnode.attrs.deleteFunction();
                        })
                    }, 'Delete Workout'),
                    m('input', {
                        type: 'text',
                        value: workout.name,
                        onchange: m.withAttr('value', function(value) {workout.name = value})
                    }),
                    m('table', [
                        m('thead', [
                            m('tr', [
                                m('td', 'Exercise name'),
                                m('td', 'Sets'),
                                m('td', 'Amount'),
                                m('td', 'Delete')
                            ])
                        ]),
                        m('tbody', workout.prescriptions.map(function(prescription, index) {
                            return m(PrescriptionRow, {
                                prescription: prescription,
                                deleteFunction: () => {
                                    workout.prescriptions.splice(index, 1);
                                },
                                editFunction: (newPrescription) => {
                                    prescription = newPrescription;
                                },
                                beingEdited: (prescription.exercise.name == '')
                            });
                        }))
                    ]),
                    m('button', {
                        onclick: preventDefault(() => {
                            workout.prescriptions.push({
                                exercise: {
                                    name: '',
                                    setUnits: SetUnits.Weight
                                },
                                sets: 0,
                                amount: 0
                            });
                        })
                    }, 'Add Exercise')
                ])
            ];
            return display;
        }
    };
};

const WorkoutDisplay = function(attrs: WorkoutDisplayAttrs) {
    return m(WorkoutDisplayComponent, attrs);
};

export default WorkoutDisplay;
