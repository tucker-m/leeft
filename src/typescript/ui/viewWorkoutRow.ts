import * as m from 'mithril';
import {ExercisePrescription} from '../types/exercise';

interface RowAttrs {
    prescription: ExercisePrescription,
    showEditButtons: boolean,
    deleteFunction: () => void,
    css: any,
};
interface RowVnode {
    attrs: RowAttrs
};

export default (vnode: RowVnode) => {
    let beingEdited = vnode.attrs.prescription.exercise.name == '';
    const css = vnode.attrs.css
    return {
        view: (vnode: RowVnode) => {
            let prescription = vnode.attrs.prescription;

            if (beingEdited) {
                return m('tr', {
                    class: css.tr,
                }, m('td', {
                    colspan: 3,
                    class: css.td,
                }, [
                    m('input[type=text]', {
                        value: prescription.exercise.name,
                        onchange: m.withAttr('value', (value) => {
                            prescription.exercise.name = value;
                        }),
                    }),
                    m('div.input-group', [
                        m('input[type=number].input-group-field', {
                            value: prescription.sets,
                            onchange: m.withAttr('value', (value) => {
                                prescription.sets = parseInt(value);
                            }),
                        }),
                        m('span.input-group-label', 'sets')
                    ]),
                    m('div.input-group', [
                        m('input[type=number].input-group-field', {
                            value: prescription.amount,
                            onchange: m.withAttr('value', (value) => {
                                prescription.amount = parseInt(value);
                            })
                        }),
                        m('span.input-group-label', prescription.exercise.setUnits)
                    ]),
                    m('fieldset', [
                        m('legend', 'Measured in:'),
                        m('input[type=radio][name=setUnits]', {
                            value: 'reps',
                            checked: prescription.exercise.setUnits == 'reps',
                            onclick: m.withAttr('value', (value) => {
                                prescription.exercise.setUnits = value;
                            }),
                        }),
                        m('label', 'reps'),
                        m('input[type=radio][name=setUnits]', {
                            value: 'seconds',
                            checked: prescription.exercise.setUnits == 'seconds',
                            onclick: m.withAttr('value', (value) => {
                                prescription.exercise.setUnits = value;
                            }),
                        }),
                        m('label', 'seconds')
                    ]),
                    m('button.button', {
                        onclick: () => {
                            beingEdited = false;
                        },
                    }, 'Save'),
                ]))
            }
            else {
                return m('tr', {
                    class: css.tr,
                }, [
                    m('td', {
                        class: css.td,
                    }, prescription.exercise.name),
                    m('td', {
                        class: css.td,
                    }, prescription.sets + 'x' + prescription.amount + ' ' + prescription.exercise.setUnits),
                    vnode.attrs.showEditButtons ? m('td', [
                        m('a', {
                            onclick: () => { beingEdited = true; },
                        }, 'Edit'),
                        m('span', ' | '),
                        m('a', {
                            onclick: vnode.attrs.deleteFunction,
                        }, 'Remove'),
                    ]) : null,
                ]);
            }
        }
    };
};
