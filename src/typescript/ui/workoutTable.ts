import * as m from 'mithril'
import {ExercisePrescription} from '../types/exercise'
import ViewWorkoutRow from './viewWorkoutRow'
import utils from '../helpers/utils'

interface TableAttributes {
    headers: Array<String>,
    prescriptions: Array<ExercisePrescription>,
    showEditButtons: boolean,
    css: any,
}

interface TableVnode {
    attrs: TableAttributes
}

const TableComponent = (vnode: TableVnode) => {
    const css = vnode.attrs.css
    return {
        view: (vnode: TableVnode) => {
            return m('table', {
                class: utils.combineStyles([
                    css.table,
                    vnode.attrs.showEditButtons ? css.editable : ''
                ]),
            }, [
                m('tr', {
                    class: css.tr,
                }, vnode.attrs.headers.map((header) => {
                    return m('th', header)
                })),
                vnode.attrs.prescriptions.map((prescription, index) => {
                    return m(ViewWorkoutRow, {
                        prescription,
                        showEditButtons: vnode.attrs.showEditButtons,
                        deleteFunction: () => {
                            vnode.attrs.prescriptions.splice(index, 1);
                        },
                        css: css,
                    });
                })
            ])
        }
    }
}

export default (attrs: TableAttributes) => {
    return m(TableComponent, attrs)
}
