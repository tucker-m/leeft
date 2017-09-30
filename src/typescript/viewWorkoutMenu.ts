import * as m from 'mithril';
import db from './db';
import {Workout} from './exercise';

interface MenuAttrs {
    workout: Workout,
    showEditButtons: () => void,
    editNameFunction: () => void,
};
interface MenuVnode {
    attrs: MenuAttrs
};
export default {
    view: (vnode: MenuVnode) => {
        return m('div.grid-x.grid-margin-x.align-right', [
            m('button.button.cell.shrink.small', {
                onclick: vnode.attrs.showEditButtons,
            }, 'Add/Edit Exercises'),
            m('button.button.secondary.hollow.cell.shrink.small', {
                onclick: vnode.attrs.editNameFunction,
            }, 'Change Name'),
            m('button.button.alert.hollow.cell.shrink.small', {
                onclick: () => {
                    db.remove(vnode.attrs.workout);
                    window.location.href = '/';
                }
            }, 'Delete Workout'),
        ]);
    }
}
