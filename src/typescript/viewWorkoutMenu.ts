import * as m from 'mithril';
import db from './db';
import {Saveable, Workout} from './exercise';
import {IObservableObject} from 'mobx'

interface MenuAttrs {
    workout: Workout & Saveable & IObservableObject,
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
                    db.deleteSaveableRecord(vnode.attrs.workout);
                    window.location.href = '/';
                }
            }, 'Delete Workout'),
        ]);
    }
}
