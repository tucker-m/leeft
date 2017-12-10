import * as m from 'mithril';
import editable from './showEditableField';
import {Saveable, Workout} from './exercise';
import preventDefault from './preventDefaultFunction';

interface WorkoutTitleAttrs {
    workout: Workout & Saveable,
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
    let showEditMenu = false;
    let beingEdited = vnode.attrs.beingEdited;
    return {
        view: function(vnode: WorkoutTitleVnode) {
            return m('div.card-divider.grid-x.align-top', [
                m('div.cell.auto.grid-x.grid-margin-x.align-middle', [
                    editable.editableString('h3.cell.shrink.workout-title', vnode.attrs.workout.name, 'Workout Name', (newValue) => {
                        vnode.attrs.workout.name = newValue;
                    }, beingEdited),
                ]),
                m('div.cell.shrink.grid-x.grid-margin-x.align-top', [
                    m('div.grid-y', [
                        m('button.button.secondary.cell.shrink', {
                            onclick: preventDefault(() => {
                                showEditMenu = !showEditMenu;
                            }),
                        }, 'Edit'),
                        showEditMenu ? m('div.cell.shrink.grid-y', [
                            m('button.button.hollow', {
                                onclick: () => {beingEdited = true; showEditMenu = false;}
                            }, 'Change Title'),
                            m('button.button.hollow', {
                                onclick: () => {
                                    showEditMenu = false;
                                    vnode.attrs.showEditButtonsFunction(true)
                                },
                            }, 'Edit Exercises'),
                            m('button.button.hollow.alert', {
                                onclick: vnode.attrs.deleteWorkoutFunction,
                            }, 'Delete Workout'),
                        ]) : null,
                    ]),
                    m('a.button.cell.shrink.primary', {
                        href: '/log/' + vnode.attrs.workout._id,
                        oncreate: m.route.link,
                    }, 'Begin'),
                ])
            ]);
        }
    }
}

const WorkoutTitle = (attrs: WorkoutTitleAttrs) => {
    return m(WorkoutTitleComponent, attrs);
};

export default WorkoutTitle;
