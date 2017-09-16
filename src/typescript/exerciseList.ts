import * as m from 'mithril';
import PouchDB from 'pouchdb';
import {Exercise} from './exercise';
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
                m('p', exercise.name + ' | ' + exercise.setUnits),
                m('button[' + deleteDisabledString + ']', {
                    onclick: preventDefault(() => {
                        vnode.attrs.db.remove(exercise).then(function(response) {
                            vnode.attrs.allExercises.splice(index, 1);
                            m.redraw();
                        });
                    }),
                    class: 'button primary'
                }, 'Delete')
            ])
        }))
    }
};

const ExerciseList = function(attrs: ExerciseListAttrs) {
    return m(ExerciseListComponent, attrs);
};

export default ExerciseList;
