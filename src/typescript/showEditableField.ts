import * as m from 'mithril';

const editableString = (tag: string, value: string, onEdit: (newValue: string) => void, beingEdited: boolean) => {
    let displayElement = null;
    if (!beingEdited) {
        displayElement = m(tag, value);
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

const editableSelect = (value: string, options: Array<string>, onEdit: () => void, beingEdited: boolean) => {
    let displayElement = null;
    if (!beingEdited) {
        displayElement = m('span', value);
    }
    else {
        let selectedIndex = options.indexOf(value);
        if (selectedIndex == -1) {
            options.unshift(value);
            selectedIndex = 0;
        }
        displayElement = m('select', options.map((optionValue, index) => {
            return m('option', {
                selected: index == selectedIndex,
                value: optionValue
            }, optionValue);
        }));
    }
    return displayElement;
}

export default {
    editableString,
    editableNumber,
    editableSelect
};
