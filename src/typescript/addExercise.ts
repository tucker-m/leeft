import * as m from 'mithril';
import {MComponent} from './mcomponent';
import {
    Exercise,
    SetUnits,
    RecordTypeNames
} from './exercise';

interface AddExerciseAttrs {
    allExercises: Array<Exercise>,
    submitFunction: (Exercise) => void
};

interface AddExerciseVnode {
    attrs: AddExerciseAttrs
};

const AddExerciseComponent = function(vnode: AddExerciseVnode) {
    let newExercise: Exercise = {_id: '', name: '', setUnits: SetUnits.Weight};

    return {
        view: function(vnode: AddExerciseVnode) {
            return m('form', {
                onsubmit: function(event) {
                    event.preventDefault();
                    newExercise._id = 'exercise_' + Date.now().toString() + newExercise.name;
                    vnode.attrs.submitFunction(newExercise);
                }
            }, [
                m('input[type=text][placeholder="Exercise name"]', {
                    oninput: m.withAttr('value', function(value: string) {
                        newExercise.name = value;
                    }),
                    value: newExercise.name
                }),
                m('select', {
                    onchange: m.withAttr('value', function(value: string) {
                        let newValue = parseInt(value);
                        newExercise.setUnits = newValue;
                    }),
                    value: newExercise.setUnits.toString()
                }, Array.from(RecordTypeNames.entries()).map(function(tuple) {
                    return m('option[value=' + tuple[0] + ']', tuple[1]);
                })),
                m('button[type=submit]', 'Add')
            ]);
        }
    }
};

const AddExercise: MComponent = function(attrs: AddExerciseAttrs) {
    return m(AddExerciseComponent, attrs);
};


export {AddExercise};
