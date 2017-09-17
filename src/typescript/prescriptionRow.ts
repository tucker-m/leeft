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
            return m('tr', [
                m('td', ExerciseName({
                    exercise: vnode.attrs.prescription.exercise,
                    allExercises: vnode.attrs.allExercises,
                    setChosenExercise: (exercise: Exercise) => {
                        vnode.attrs.prescription.exercise = exercise;
                    },
                    beingEdited: beingEdited,
                })),
                m('td', editable.editableNumber(vnode.attrs.prescription.sets, (newValue) => {
                    vnode.attrs.prescription.sets = newValue;
                }, beingEdited)),
                m('td', m('div.grid-x.align-middle', [
                    m('div.cell.shrink', editable.editableNumber(vnode.attrs.prescription.amount, (newValue) => {
                        vnode.attrs.prescription.amount = newValue;
                    }, beingEdited)
                    ),
                    m('div.cell.shrink', editable.editableRepType(
                        ' ' + vnode.attrs.prescription.exercise.setUnits,
                        (selected: SetUnits) => {
                            vnode.attrs.prescription.exercise.setUnits = selected;
                        },
                        beingEdited
                    ))
                ])),
                m('td', m('div.grid-x', [
                    (vnode.attrs.editShowing)
                        ? m('button.button.secondary.cell.small.shrink', {
                            onclick: preventDefault(() => {
                                beingEdited = true;
                            }),
                            class: (beingEdited ? 'hide' : ''),
                            disabled: beingEdited ? true : false,
                        }, 'Edit')
                    : null,
                    m('button.cell.small.hollow', {
                        onclick: preventDefault(() => {
                            vnode.attrs.deleteFunction();
                        }),
                        class: 'button alert ' + (beingEdited ? '' : 'hide')
                    }, 'Remove'),
                    m('button.cell.small', {
                        onclick: preventDefault(() => {
                            beingEdited = false;
                            vnode.attrs.updateDefaultExercise(vnode.attrs.prescription.exercise.name, vnode.attrs.prescription.exercise.setUnits);
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
