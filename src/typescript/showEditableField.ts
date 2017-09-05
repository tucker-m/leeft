import * as m from 'mithril';
import {RecordTypeNames} from './exercise';

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


// TODO: value should always be a string that exists in RecordTypeNames.
// maybe a map and SetUnits enum wasn't the right thing to do there. Maybe
// they should just be a set of possible strings, the way Typescript lets you
// do that.
const editableRepType = (value: string, onEdit: (selected: number) => void, beingEdited: boolean) => {
    let displayElement = null;
    let options = Array.from(RecordTypeNames.values());
    if (!beingEdited) {
        displayElement = m('span.label', value);
    }
    else {
        let selectedIndex = options.indexOf(value);
        displayElement = m('select', {
            onchange: m.withAttr('value', function(value: string) {
                onEdit(parseInt(value));
            })
        }, options.map((optionValue, index) => {
            return m('option', {
                selected: index == selectedIndex,
                value: index
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
