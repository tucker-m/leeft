import * as m from 'mithril';
import {RecordTypeNames} from './exercise';

let exerciseList = {
    view: function(vnode) {
        return m('ul', vnode.attrs.allExercises.map(function(exercise) {
            return m('li', exercise.name + ' ' + RecordTypeNames.get(exercise.type));
        }))
    }
};

export default exerciseList;
