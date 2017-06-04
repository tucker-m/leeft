import * as m from 'mithril';
import * as pouchdb from 'pouchdb';
import {Exercise, RecordTypeNames} from './exercise';

interface ExerciseListAttrs {
    allExercises: Array<Exercise>,
    db: pouchdb
};

interface ExerciseListVnode {
    attrs: ExerciseListAttrs
};

let ExerciseList = {
    view: function(vnode: ExerciseListVnode) {
        return m('ul', vnode.attrs.allExercises.map(function(exercise: Exercise, index: number) {
            let deleteDisabledString = exercise._rev == null ? 'disabled=disabled' : '';
            return m('li', [
                m('p', exercise.name + ' | ' + RecordTypeNames.get(exercise.setUnits)),
                m('button[' + deleteDisabledString + ']', {
                    onclick: function(event) {
                        event.preventDefault();
                        vnode.attrs.db.remove(exercise).then(function(response) {
                            vnode.attrs.allExercises.splice(index, 1);
                            m.redraw();
                        });
                    }.bind(this)
                }, 'Delete')
            ])
        }))
    }
};

export {ExerciseList, ExerciseListAttrs};
