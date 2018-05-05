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
    let beingEdited = false
    const css = vnode.attrs.css
    return {
        view: (vnode: RowVnode) => {
            let prescription = vnode.attrs.prescription;
            return m('tr', {
                class: css.tr,
            }, [
                m('td', {
                    class: css.td,
                }, !beingEdited ?
                  prescription.exercise.name
                  : m('input[type=text]', {
                      value: prescription.exercise.name,
                      onchange: m.withAttr('value', (value) => {
                          prescription.exercise.name = value;
                      }),
                  })),
                m('td', {
                    class: css.td,
                }, !beingEdited ?
                  (prescription.sets + 'x' + prescription.amount + ' ' + prescription.exercise.setUnits)
                  : m('div', [
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
                          m('label', 'seconds'),
                      ]),
                  ]),
                 ),
                vnode.attrs.showEditButtons ?
                    m('td', {class: css.td}, [
                        m('a', {
                            onclick: () => { beingEdited = !beingEdited },
                        }, beingEdited ? 'Done' : 'Edit'),
                        m('span', ' | '),
                        m('a', {
                            onclick: vnode.attrs.deleteFunction,
                        }, 'Remove'),
                    ])
                : null,
            ]);
        }
    };
};
