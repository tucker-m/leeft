import * as m from 'mithril';
import {SetUnits, ExercisePrescription, Exercise} from './exercise';

const exerciseOptionList = function(allExercises) {
    const first = [m('option', {'disabled': 'disabled', 'selected': 'selected'}, 'Select exercise')];
    return first.concat(allExercises.map(function(exercise, index) {
        return m('option[value=' + index + ']', exercise.name);
    }));
};

interface AddPrescriptionViewAttrs {
    submitFunction: (ExercisePrescription) => void,
    allExercises: Array<Exercise>
};

interface AddPrescriptionViewVnode {
    attrs: AddPrescriptionViewAttrs
};

let AddPrescriptionView = function(vnode: AddPrescriptionViewVnode) {
    let newPrescription: ExercisePrescription = {
        exercise: null,
        sets: 0,
        amount: 0
    };
    return {
        view: function(vnode: AddPrescriptionViewVnode) {
            return m('form', {
                onsubmit: function(event) {
                    event.preventDefault();
                    vnode.attrs.submitFunction(newPrescription);
                    newPrescription = {
                        exercise: null,
                        sets: 0,
                        amount: 0
                    };
                }
            }, [
                m('div', [
                    m('label[for=select-exercise]', 'Exercise'),
                    m('select#select-exercise', {
                        onchange: function(event) {
                            let selectedIndex = event.target.selectedIndex;
                            let selectedExercise = vnode.attrs.allExercises[event.target.options[selectedIndex].value];
                            newPrescription.exercise = selectedExercise;
                        },
                    }, exerciseOptionList(vnode.attrs.allExercises))
                ]),
                m('div', [
                    m('label[for=select-exercise-sets]', 'Sets'),
                    m('input#select-exercise-sets[type=number]', {
                        onchange: m.withAttr('value', function(value: string) {
                            newPrescription.sets = parseInt(value);
                        }),
                        value: newPrescription.sets
                    })
                ]),
                m('div', [
                    m('label[for=select-exercise-amount]', 'Label here'),
                    m('input#select-exercise-amount[type=number]', {
                        onchange: m.withAttr('value', function(value: string) {
                            newPrescription.amount = parseInt(value)
                        }),
                        value: newPrescription.amount
                    })
                ]),
                m('button[type=submit]', 'Add')
            ])
        }
    }
};

export {AddPrescriptionView, AddPrescriptionViewAttrs};
