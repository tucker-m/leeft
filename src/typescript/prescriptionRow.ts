import * as m from 'mithril';
import {SetUnits, ExercisePrescription, Exercise} from './exercise';
import preventDefault from './preventDefaultFunction';
import editable from './showEditableField';
import ExerciseName from './exerciseNameInput';

interface PrescriptionRowAttrs {
    prescription: ExercisePrescription,
    allExercises: Array<Exercise>,
    deleteFunction: () => void,
    saveWorkoutFunction: () => void,
    updateDefaultExercise: (exerciseName: string, repType: SetUnits) => void,
    editShowing: boolean
};
// TODO: beingEdited should ALSO be a property of this, so that
// the workoutTitle component can change it.

interface PrescriptionRowVnode {
    attrs: PrescriptionRowAttrs
};

let PrescriptionRow = () => {
    let beingEdited = false;
    return {
        oninit: function(vnode: PrescriptionRowVnode) {
            beingEdited = vnode.attrs.prescription.exercise.name == '';
        },
        view: function(vnode: PrescriptionRowVnode) {
            let prescription = vnode.attrs.prescription;
            let exercise = prescription.exercise;
            return m('div.grid-x.align-middle.workout-row', [
                m('div.cell.auto', ExerciseName({
                    exercise: exercise,
                    allExercises: vnode.attrs.allExercises,
                    setChosenExercise: (exercise: Exercise) => {
                        exercise = exercise;
                    },
                    beingEdited: beingEdited,
                })),
                editable.setsAndReps(prescription, beingEdited),
                m('div', m('div.grid-x', [
                    (vnode.attrs.editShowing)
                        ? m('button.button.secondary.cell.small.shrink', {
                            onclick: preventDefault(() => {
                                beingEdited = true;
                            }),
                            class: (beingEdited ? 'hide' : ''),
                            disabled: beingEdited ? true : false,
                        }, 'Edit')
                    : null,
                    m('button.cell.small', {
                        onclick: preventDefault(() => {
                            beingEdited = false;
                            vnode.attrs.updateDefaultExercise(exercise.name, exercise.setUnits);
                            vnode.attrs.saveWorkoutFunction();
                        }),
                        class: 'button primary ' + (beingEdited ? '' : 'hide'),
                        disabled: beingEdited? false : true,
                    }, 'Save'),
                ])),
            ]);
        }
    }
};

export default PrescriptionRow;
