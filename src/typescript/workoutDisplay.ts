import * as m from 'mithril';
import {Workout, Exercise, SetUnits, RecordTypeNames} from './exercise';
import preventDefault from './preventDefaultFunction';
import PrescriptionRow from './prescriptionRow';
import WorkoutTitle from './workoutTitle';

interface WorkoutDisplayAttrs {
    workout: Workout,
    deleteFunction: Function,
    saveWorkoutFunction: Function
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
            let titleAttrs = {
                workout: workout,
                beingEdited: false
            };
            let display = [
                m('div', [
                    WorkoutTitle(titleAttrs),
                    m('button.button.primary', {
                        onclick: vnode.attrs.saveWorkoutFunction
                    }, 'Save'),
                    m('button.button.alert', {
                        onclick: vnode.attrs.deleteFunction
                    }, 'Delete'),
                    m('table', [
                        m('thead', [
                            m('tr', [
                                m('td', 'Exercise name'),
                                m('td', 'Sets'),
                                m('td', 'Amount'),
                                m('td', 'Actions')
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
                        }),
                        class: 'button primary'
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
