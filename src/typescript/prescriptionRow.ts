import * as m from 'mithril';
import {ExercisePrescription, Exercise, RecordTypeNames} from './exercise';
import preventDefault from './preventDefaultFunction';
import editable from './showEditableField';

interface PrescriptionRowAttrs {
    prescription: ExercisePrescription,
    deleteFunction: Function,
    editFunction: Function,
    beingEdited: boolean
};

interface PrescriptionRowVnode {
    attrs: PrescriptionRowAttrs
};

let PrescriptionRow = () => {
    let beingEdited: boolean;
    return {
        oninit: function(vnode: PrescriptionRowVnode) {
            beingEdited = vnode.attrs.beingEdited;
        },
        view: function(vnode: PrescriptionRowVnode) {
            return m('tr', [
                m('td', editable.editableString('span', vnode.attrs.prescription.exercise.name, (newValue) => {
                        vnode.attrs.prescription.exercise.name = newValue;
                        vnode.attrs.editFunction(vnode.attrs.prescription);
                    }, beingEdited),
                ),
                m('td', editable.editableNumber(vnode.attrs.prescription.sets, (newValue) => {
                    vnode.attrs.prescription.sets = newValue;
                    vnode.attrs.editFunction(vnode.attrs.prescription);
                }, beingEdited)),
                m('td', [
                    editable.editableNumber(vnode.attrs.prescription.amount, (newValue) => {
                        vnode.attrs.prescription.amount = newValue;
                        vnode.attrs.editFunction(vnode.attrs.prescription);
                    }, beingEdited),
                    m('span', RecordTypeNames.get(vnode.attrs.prescription.exercise.setUnits))
                ]),
                m('td', [
                    m('button', {
                        onclick: preventDefault(() => {
                            vnode.attrs.deleteFunction();
                        }),
                        class: 'button alert'
                    }, 'Delete'),
                    m('button', {
                        onclick: preventDefault(() => {
                            beingEdited = !beingEdited;
                        }),
                        class: 'button secondary',
                    }, 'Edit')
                ])
            ]);
        }
    }
};

export default PrescriptionRow;
