import * as m from 'mithril';
import {ExercisePrescription, Exercise, RecordTypeNames} from './exercise';
import preventDefault from './preventDefaultFunction';
import editable from './showEditableField';
import ExerciseName from './exerciseNameInput';

interface PrescriptionRowAttrs {
    prescription: ExercisePrescription,
    allExercises: Array<Exercise>,
    deleteFunction: () => void,
    saveWorkoutFunction: () => void,
    updateDefaultExercise: (exercise: Exercise) => void,
    editShowing: boolean
};

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
                        ' ' + RecordTypeNames.get(vnode.attrs.prescription.exercise.setUnits),
                        (selected) => {
                            vnode.attrs.prescription.exercise.setUnits = selected;
                        },
                        beingEdited
                    ))
                ])),
                m('td', m('div.grid-x', [
                    (vnode.attrs.editShowing)
                        ? m('button.cell.shrink', {
                            onclick: preventDefault(() => {
                                beingEdited = true;
                            }),
                            class: 'button secondary ' + (beingEdited ? 'hide' : ''),
                            disabled: beingEdited ? true : false,
                        }, 'Edit')
                    : null,
                    m('button.cell.small', {
                        onclick: preventDefault(() => {
                            vnode.attrs.deleteFunction();
                        }),
                        class: 'button alert ' + (beingEdited ? '' : 'hide')
                    }, 'Remove'),
                    m('button.cell.small', {
                        onclick: preventDefault(() => {
                            beingEdited = false;
                            vnode.attrs.updateDefaultExercise(vnode.attrs.prescription.exercise);
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
