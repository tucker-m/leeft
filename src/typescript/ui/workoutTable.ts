import * as m from 'mithril'
import {ExercisePrescription} from '../types/exercise'
import ViewWorkoutRow from './viewWorkoutRow'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../../styles'
import utils from '../helpers/utils'

jss.setup(preset())
const {classes} = jss.createStyleSheet(style.main).attach()

interface TableAttributes {
    headers: Array<String>,
    prescriptions: Array<ExercisePrescription>,
    showEditButtons: boolean,
}

interface TableVnode {
    attrs: TableAttributes
}

const TableComponent = (vnode: TableVnode) => {
    return {
        view: (vnode: TableVnode) => {
            return m('table', {
                class: utils.combineStyles([
                    classes.table,
                    vnode.attrs.showEditButtons ? classes.editable : ''
                ]),
            }, [
                m('tr', {
                    class: classes.tr,
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
                    });
                })
            ])
        }
    }
}

export default (attrs: TableAttributes) => {
    return m(TableComponent, attrs)
}
