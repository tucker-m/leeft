import * as m from 'mithril';
import editable from './showEditableField';
import {Workout} from './exercise';
import preventDefault from './preventDefaultFunction';

interface WorkoutTitleAttrs {
    workout: Workout,
    beingEdited: boolean,
    saveWorkoutFunction: () => void,
};
interface WorkoutTitleVnode {
    attrs: WorkoutTitleAttrs
};

const WorkoutTitleComponent = (vnode: WorkoutTitleVnode) => {
    let beingEdited = vnode.attrs.beingEdited;
    return {
        view: function(vnode: WorkoutTitleVnode) {
            return m('div', {
                class: 'grid-x'
            }, [
                editable.editableString('h2', vnode.attrs.workout.name, (newValue) => {
                    vnode.attrs.workout.name = newValue;
                }, beingEdited),
                m('button', {
                    onclick: preventDefault(() => {
                        beingEdited = true;
                    }),
                    class: 'button secondary',
                    disabled: beingEdited ? true : false,
                }, 'Edit Workout Name'),
                m('button', {
                    onclick: preventDefault(() => {
                        beingEdited = false;
                        vnode.attrs.saveWorkoutFunction();
                    }),
                    class: 'button primary',
                    disabled: beingEdited ? false : true,
                }, 'Save')
            ]);
        }
    }
}

const WorkoutTitle = (attrs: WorkoutTitleAttrs) => {
    return m(WorkoutTitleComponent, attrs);
};

export default WorkoutTitle;
