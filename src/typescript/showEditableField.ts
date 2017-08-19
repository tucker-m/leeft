import * as m from 'mithril';

const editableString = (value: string, onEdit: (newValue: string) => void, beingEdited: boolean) => {
    let displayElement = null;
    if (!beingEdited) {
        displayElement = m('span', value);
    }
    else {
        displayElement = m('input', {
            type: 'text',
            value: value,
            onchange: m.withAttr('value', onEdit)
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

export default {
    editableString,
    editableNumber
};
