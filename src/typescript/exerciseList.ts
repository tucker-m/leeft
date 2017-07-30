import * as m from 'mithril';
import PouchDB from 'pouchdb';
import {Exercise, RecordTypeNames} from './exercise';
import preventDefault from './preventDefaultFunction';

interface ExerciseListAttrs {
    allExercises: Array<Exercise>,
    db: PouchDB.Database
};

interface ExerciseListVnode {
    attrs: ExerciseListAttrs
};

let ExerciseListComponent = {
    view: function(vnode: ExerciseListVnode) {
        return m('ul', vnode.attrs.allExercises.map(function(exercise: Exercise, index: number) {
            let deleteDisabledString = exercise._rev == null ? 'disabled=disabled' : '';
            return m('li', [
                m('p', exercise.name + ' | ' + RecordTypeNames.get(exercise.setUnits)),
                m('button[' + deleteDisabledString + ']', {
                    onclick: preventDefault(function() {
                        vnode.attrs.db.remove(exercise).then(function(response) {
                            vnode.attrs.allExercises.splice(index, 1);
                            m.redraw();
                        });
                    }.bind(this))
                }, 'Delete')
            ])
        }))
    }
};

const ExerciseList = function(attrs: ExerciseListAttrs) {
    return m(ExerciseListComponent, attrs);
};

export {ExerciseList};
