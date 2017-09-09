import * as m from 'mithril';
import editable from './showEditableField';
import {Workout} from './exercise';
import preventDefault from './preventDefaultFunction';

interface WorkoutTitleAttrs {
    workout: Workout,
    beingEdited: boolean,
    saveWorkoutFunction: () => void,
    deleteWorkoutFunction: () => void,
    showEditButtonsFunction: (showButtons: boolean) => void,
};
interface WorkoutTitleVnode {
    attrs: WorkoutTitleAttrs
};

const WorkoutTitleComponent = (vnode: WorkoutTitleVnode) => {
    let showEditButton = false;
    let beingEdited = vnode.attrs.beingEdited;
    return {
        view: function(vnode: WorkoutTitleVnode) {
            return m('div.card-divider.grid-x.align-middle', [
                m('div.cell.auto.grid-x.grid-margin-x.align-middle', [
                    editable.editableString('h3.cell.shrink.workout-title', vnode.attrs.workout.name, 'Workout Name', (newValue) => {
                        vnode.attrs.workout.name = newValue;
                    }, beingEdited),
                    m('button.small.cell.shrink', {
                        onclick: preventDefault(() => {
                            beingEdited = true;
                        }),
                        disabled: showEditButton && !beingEdited ? false : true,
                        class: 'button secondary ' + (showEditButton && !beingEdited ? '' : 'hide'),
                    }, 'Edit Name'),
                ]),
                m('div.cell.shrink.grid-x.grid-margin-x', [
                    m('button.cell.shrink', {
                        onclick: preventDefault(() => {
                            showEditButton = true;
                            beingEdited = false;
                            vnode.attrs.showEditButtonsFunction(showEditButton);
                        }),
                        disabled: showEditButton || beingEdited ? true : false,
                        class: 'button secondary ' + (showEditButton || beingEdited ? 'hide' : ''),
                    }, 'Edit'),
                    m('button.cell.shrink', {
                        onclick: preventDefault(() => {
                            showEditButton = false;
                            beingEdited = false;
                            vnode.attrs.showEditButtonsFunction(showEditButton);
                            vnode.attrs.deleteWorkoutFunction();
                        }),
                        disabled: showEditButton || beingEdited ? false : true,
                        class: 'button alert hollow ' + (showEditButton || beingEdited ? '' : 'hide'),
                    }, 'Delete'),
                    m('button.cell.shrink', {
                        onclick: preventDefault(() => {
                            beingEdited = false;
                            showEditButton = false;
                            vnode.attrs.showEditButtonsFunction(beingEdited);
                            vnode.attrs.saveWorkoutFunction();
                        }),
                        disabled: showEditButton || beingEdited ? false : true,
                        class: 'button primary ' + (showEditButton || beingEdited ? '' : 'hide'),
                    }, 'Done')
                ])
            ]);
        }
    }
}

const WorkoutTitle = (attrs: WorkoutTitleAttrs) => {
    return m(WorkoutTitleComponent, attrs);
};

export default WorkoutTitle;
