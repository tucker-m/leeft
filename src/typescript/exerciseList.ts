import * as m from 'mithril';
import {Exercise, RecordTypeNames} from './exercise';

// How can we define that vnode.attrs.allExercises is an array of Exercise?
// db is also being passed in. Can we define these in an interface?
let exerciseList = {
    view: function(vnode) {
        return m('ul', vnode.attrs.allExercises.map(function(exercise: Exercise, index: number) {
            let deleteDisabledString = exercise._rev == null ? 'disabled=disabled' : '';
            return m('li', [
                m('p', exercise.name + ' ' + RecordTypeNames.get(exercise.setUnits)),
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

export default exerciseList;
