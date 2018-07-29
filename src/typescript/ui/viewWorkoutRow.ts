import * as m from 'mithril';
import {Exercise, ExercisePrescription} from '../types/exercise';
import db from '../helpers/db'
import ExerciseOverlay from '../workouts/overlays/exercise'
import {set} from 'mobx'

interface RowAttrs {
    prescription: ExercisePrescription,
    showEditButtons: boolean,
    deleteFunction: () => void,
    css: any,
    setOverlay: (overlay: any, attrs: any) => void,
}
interface RowVnode {
    attrs: RowAttrs
}

export default (vnode: RowVnode) => {
    const css = vnode.attrs.css
    let searchResults = ['one', 'two', 'three']
    return {
        view: (vnode: RowVnode) => {
            let prescription = vnode.attrs.prescription
            return m('tr', {
                class: css.tr,
            }, [
                m('td', {
                    class: css.td,
                }, [
                    vnode.attrs.showEditButtons ?
                        m('span', m('button', {
                            class: `${css.hollowButton} ${css.small}`,
                            onclick: () => {
                                vnode.attrs.setOverlay(ExerciseOverlay, {
                                    prescription,
                                    updatePrescription: (newPrescription: ExercisePrescription) => {
                                        set(prescription, newPrescription)
                                    },
                                    hideOverlay: () => {
                                        vnode.attrs.setOverlay({component: null, title: ''}, {})
                                    },
                                    css: css,
                                })
                            },
                        }, 'Edit'),
                          m('button', {
                              class: `${css.small} ${css.hollowDangerButton}`,
                              onclick: vnode.attrs.deleteFunction,
                          }, 'Delete')
                         )
                        : null,
                    prescription.exercise.name ?
                        prescription.exercise.name
                        : m('span', {class: css.empty}, 'Unnamed Exercise'),
                ]),
                m('td', {
                    class: css.td,
                }, prescription.sets + 'x' + prescription.amount + ' ' + prescription.exercise.setUnits),
            ])
        }
    }
}
