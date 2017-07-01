import * as m from 'mithril';
import * as pouchdb from 'pouchdb';
import {
    Exercise,
    SetUnits,
    RecordTypeNames
} from './exercise';

interface AddExerciseAttrs {
    allExercises: Array<Exercise>,
    db: pouchdb
};

interface AddExerciseVnode {
    attrs: AddExerciseAttrs
};

let newExercise: Exercise = {_id: '', name: '', setUnits: SetUnits.Weight};

const AddExercise = {
    view: function(vnode: AddExerciseVnode) {
        let db = vnode.attrs.db;
        return m('form', {
            onsubmit: function(event) {
                event.preventDefault();
                newExercise._id = 'exercise_' + Date.now().toString() + newExercise.name;
                const indexAdded = vnode.attrs.allExercises.push(newExercise) - 1;
                db.put(newExercise).then(function(response) {
                    vnode.attrs.allExercises[indexAdded]._rev = response.rev;
                    m.redraw();
                }.bind(this));

                newExercise = {
                    _id: '',
                    name: '',
                    setUnits: SetUnits.Weight
                };
            }.bind(this)
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
            }),
            m('button[type=submit]', 'Add'))
        ]);
    }
};


export {AddExercise, AddExerciseAttrs};
