import * as m from 'mithril';
import {Exercise, RecordTypeNames} from './exercise';

// How can we define that vnode.attrs.allExercises is an array of Exercise?
let exerciseList = {
    view: function(vnode) {
        return m('ul', vnode.attrs.allExercises.map(function(exercise: Exercise) {
            return m('li', exercise.name + ' ' + RecordTypeNames.get(exercise.setUnits));
        }))
    }
};

export default exerciseList;
