import * as m from 'mithril';
import {SetUnits} from './exercise';

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
};
