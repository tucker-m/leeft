import * as m from 'mithril';
import editable from './showEditableField';
import {Workout} from './exercise';
import preventDefault from './preventDefaultFunction';

interface WorkoutTitleAttrs {
    workout: Workout,
    saveFunction: (newTitle) => void,
    beingEdited: boolean
};
interface WorkoutTitleVnode {
    attrs: WorkoutTitleAttrs
};

const WorkoutTitleComponent = (vnode: WorkoutTitleVnode) => {
    let beingEdited = vnode.attrs.beingEdited;
    return {
        view: function(vnode: WorkoutTitleVnode) {
            let workout = vnode.attrs.workout;
            return m('div', {
                class: 'grid-x'
            }, [
                editable.editableString('h2', workout.name, (newValue) => {
                    workout.name = newValue;
                }, beingEdited),
                m('button', {
                    onclick: preventDefault(() => {
                        beingEdited = !beingEdited;
                    }),
                    class: 'button secondary'
                }, 'Edit'),
                m('button', {
                    onclick: preventDefault(() => {
                        vnode.attrs.saveFunction(workout.name);
                    }),
                    class: 'button primary' // TODO: put this save button in parent component
                }, 'Save')
            ]);
        }
    }
}

const WorkoutTitle = (attrs: WorkoutTitleAttrs) => {
    return m(WorkoutTitleComponent, attrs);
};

export default WorkoutTitle;
