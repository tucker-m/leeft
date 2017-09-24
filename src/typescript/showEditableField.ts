import * as m from 'mithril';
import {SetUnits, ExercisePrescription} from './exercise';

const editableString = (tag: string, value: string, placeholder: string, onEdit: (newValue: string) => void, beingEdited: boolean) => {
    let displayElement = null;
    if (!beingEdited) {
        displayElement = m(tag, value);
    }
    else {
        displayElement = m('input.cell.auto', {
            type: 'text',
            placeholder: placeholder,
            value: value,
            onchange: m.withAttr('value', onEdit),
            autofocus: true,
        });
    }
    return displayElement;
};

const editableNumber = (value: number, onEdit: (newValue: number) => void, beingEdited: boolean) => {
   let displayElement = null;
    if (!beingEdited) {
        displayElement = m('span', value);
    }
    else {
        displayElement = m('input', {
            type: 'number',
            value: value.toString(),
            onchange: m.withAttr('value', function(value) {
                onEdit(parseInt(value));
            })
        });
    }
    return displayElement;
};

const setsAndReps = (prescription: ExercisePrescription,
                     beingEdited: boolean) => {
    if (beingEdited) {
        return [
            m('div.cell.shrink.input-group', [
                m('input[type=number].input-group-field', {
                    value: prescription.sets,
                    onchange: m.withAttr('value', (value) => {
                        prescription.sets = parseInt(value);
                    }),
                }),
                m('span.input-group-label', 'sets'),
            ]),
            m('div.cell.shrink.input-group', [
                m('input[type=number].input-group-field', {
                    value: prescription.amount,
                    onchange: m.withAttr('value', (value) => {
                        prescription.amount = parseInt(value);
                    })
                }),
                m('span.input-group-label', prescription.exercise.setUnits),
            ]),
            m('div.cell.shrink', [
                m('select', {
                    value: prescription.exercise.setUnits,
                    onchange: m.withAttr('value', (value) => {
                        prescription.exercise.setUnits = value;
                    })
                }, [
                    m('option[value="reps"]', 'reps'),
                    m('option[value="seconds"]', 'seconds'),
                ])
            ]),
        ];
    }
    return m('p', [
        m('span.prescription-sets', prescription.sets),
        m('span', 'x'),
        m('span.prescription-reps', prescription.amount),
        m('span.label.rep-type', {
            class: prescription.exercise.setUnits,
        }, prescription.exercise.setUnits),
    ]);
};

const editableRepType = (value: string, onEdit: (selected: string) => void, beingEdited: boolean) => {
    let displayElement = null;
    value = value.trim(); // TODO: why is this necessary?
    let options: Array<SetUnits> = ['reps', 'seconds'];
    if (!beingEdited) {
        displayElement = m('span.label.rep-type.' + value, value);
    }
    else {
        displayElement = m('select', {
            onchange: m.withAttr('value', function(value: string) {
                onEdit(value);
            })
        }, options.map((optionValue) => {
            return m('option', {
                selected: value == optionValue,
                value: optionValue
            }, optionValue);
        }));
    }
    return displayElement;
};

export default {
    editableString,
    editableNumber,
    editableRepType,
    setsAndReps,
};
