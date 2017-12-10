import * as m from 'mithril';
import {Saveable, Workout, Exercise, SetUnits} from './exercise';
import preventDefault from './preventDefaultFunction';
import PrescriptionRow from './prescriptionRow';
import WorkoutTitle from './workoutTitle';

interface WorkoutDisplayAttrs {
    workout: Workout & Saveable,
    allExercises: Array<Exercise>,
    deleteFunction: () => void,
    saveWorkoutFunction: (workout: Workout) => void,
    updateDefaultExercise: (exerciseName: string, repType: SetUnits) => void,
};

interface WorkoutDisplayVnode {
    attrs: WorkoutDisplayAttrs
};

const WorkoutDisplayComponent = function(vnode: WorkoutDisplayVnode) {
    let showEditButtons = false;
    let workout = vnode.attrs.workout;
    // TODO: clone the workout instead of pointing to it. If they don't
    // save their changes, we don't want the edited workout to show up
    // in the workoutList. Then the workoutList and pouchdb will have
    // different values.
    return {
        view: function(vnode: WorkoutDisplayVnode) {
            let titleAttrs = {
                workout: workout,
                saveWorkoutFunction: () => {
                    vnode.attrs.saveWorkoutFunction(workout);
                },
                deleteWorkoutFunction: vnode.attrs.deleteFunction,
                showEditButtonsFunction: (showButtons: boolean) => {
                    showEditButtons = showButtons;
                },
                beingEdited: (vnode.attrs.workout.name == '')
            };
            return [
                m('div.workout.cell.card', [
                    WorkoutTitle(titleAttrs),
                    (workout.prescriptions.length != 0)
                        ? (m('div.card-section', [
                            m('div', workout.prescriptions.map(function(prescription, index) {
                                return m(PrescriptionRow, {
                                    prescription: prescription,
                                    allExercises: vnode.attrs.allExercises,
                                    deleteFunction: () => {
                                        workout.prescriptions.splice(index, 1);
                                        vnode.attrs.saveWorkoutFunction(workout);
                                    },
                                    saveWorkoutFunction: () => {
                                        vnode.attrs.saveWorkoutFunction(workout);
                                    },
                                    updateDefaultExercise: vnode.attrs.updateDefaultExercise,
                                    editShowing: showEditButtons,
                                });
                            }))
                    ]))
                    : null,
                    m('div.card-section', {
                        class: showEditButtons ? '' : 'hide',
                    }, m('button', {
                        onclick: preventDefault(() => {
                            workout.prescriptions.push({
                                exercise: {
                                    name: '',
                                    setUnits: 'reps'
                                },
                                sets: 0,
                                amount: 0
                            });
                            vnode.attrs.saveWorkoutFunction(workout);
                        }),
                        disabled: showEditButtons ? false : true,
                        class: 'button primary',
                    }, 'Add Exercise'))
                ])
            ];
        }
    };
};

const WorkoutDisplay = function(attrs: WorkoutDisplayAttrs) {
    return m(WorkoutDisplayComponent, attrs);
};

export default WorkoutDisplay;
