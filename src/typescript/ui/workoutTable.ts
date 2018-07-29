import * as m from 'mithril'
import {ExercisePrescription} from '../types/exercise'
import ViewWorkoutRow from './viewWorkoutRow'
import utils from '../helpers/utils'

interface TableAttributes {
    prescriptions: Array<ExercisePrescription>,
    showEditButtons: boolean,
    css: any,
    setOverlay: (overlay: any, attrs: any) => void,
}

interface TableVnode {
    attrs: TableAttributes
}

const TableComponent = (vnode: TableVnode) => {
    const css = vnode.attrs.css
    return {
        view: (vnode: TableVnode) => {
            return m('div', [
                vnode.attrs.prescriptions.length > 0 ?
                    m('table', {
                        class: css.table,
                    }, [
                        m('tr', {
                            class: css.tr,
                        }, [
                            m('th', 'Exercise'),
                            m('th', 'Amount'),
                        ]),
                        vnode.attrs.prescriptions.map((prescription, index) => {
                            return m(ViewWorkoutRow, {
                                prescription,
                                showEditButtons: vnode.attrs.showEditButtons,
                                deleteFunction: () => {
                                    vnode.attrs.prescriptions.splice(index, 1);
                                },
                                css: css,
                                setOverlay: vnode.attrs.setOverlay,
                            });
                        })
                    ])
                : m('p', 'This workout has no exercises added to it.'),
                vnode.attrs.showEditButtons ?
                    m('button', {
                        onclick: () => {
                            vnode.attrs.prescriptions.push({
                                exercise: {
                                    name: '',
                                    setUnits: 'reps',
                                    tag: 'exercise',
                                },
                                sets: 0,
                                amount: 0,
                            });
                        }
                    }, 'Add Exercise')
                : null,
            ])
        }
    }
}

export default (attrs: TableAttributes) => {
    return m(TableComponent, attrs)
}
