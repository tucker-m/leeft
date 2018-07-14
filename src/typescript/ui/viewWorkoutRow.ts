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
};
interface RowVnode {
    attrs: RowAttrs
};

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
                }, prescription.exercise.name),
                m('td', {
                    class: css.td,
                }, (prescription.sets + 'x' + prescription.amount + ' ' + prescription.exercise.setUnits)),
                vnode.attrs.showEditButtons ?
                    m('td', {class: css.td}, [
                        m('a', {
                            onclick: () => {
                                vnode.attrs.setOverlay(ExerciseOverlay, {
                                    prescription,
                                    updatePrescription: (newPrescription: ExercisePrescription) => {
                                        set(prescription, newPrescription)
                                    },
                                    closeOverlay: () => {
                                        vnode.attrs.setOverlay(null, {})
                                    },
                                })
                            },
                        }, 'Edit'),
                        m('span', ' | '),
                        m('a', {
                            onclick: vnode.attrs.deleteFunction,
                        }, 'Remove'),
                    ])
                : null,
            ]);
        }
    };
};
