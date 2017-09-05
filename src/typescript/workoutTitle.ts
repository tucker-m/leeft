import * as m from 'mithril';
import editable from './showEditableField';
import {Workout} from './exercise';
import preventDefault from './preventDefaultFunction';

interface WorkoutTitleAttrs {
    workout: Workout,
    beingEdited: boolean,
    saveWorkoutFunction: () => void,
    deleteWorkoutFunction: () => void,
};
interface WorkoutTitleVnode {
    attrs: WorkoutTitleAttrs
};

const WorkoutTitleComponent = (vnode: WorkoutTitleVnode) => {
    let beingEdited = vnode.attrs.beingEdited;
    return {
        view: function(vnode: WorkoutTitleVnode) {
            return m('div.card-divider.grid-x..align-middle', [
                editable.editableString('h3.cell.auto', vnode.attrs.workout.name, 'Workout Name', (newValue) => {
                    vnode.attrs.workout.name = newValue;
                }, beingEdited),
                m('div.cell.shrink', [
                    m('button', {
                        onclick: preventDefault(() => {
                            beingEdited = true;
                        }),
                        disabled: beingEdited ? true : false,
                        class: 'button secondary ' + (beingEdited ? 'hide' : ''),
                    }, 'Edit'),
                    m('button', {
                        onclick: preventDefault(() => {
                            beingEdited = false;
                            vnode.attrs.deleteWorkoutFunction();
                        }),
                        disabled: beingEdited ? false : true,
                        class: 'button alert ' + (beingEdited ? '' : 'hide'),
                    }, 'Delete'),
                    m('button', {
                        onclick: preventDefault(() => {
                            beingEdited = false;
                            vnode.attrs.saveWorkoutFunction();
                        }),
                        disabled: beingEdited ? false : true,
                        class: 'button primary ' + (beingEdited ? '' : 'hide'),
                    }, 'Save')
                ])
            ]);
        }
    }
}

const WorkoutTitle = (attrs: WorkoutTitleAttrs) => {
    return m(WorkoutTitleComponent, attrs);
};

export default WorkoutTitle;
