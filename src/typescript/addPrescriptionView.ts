import * as m from 'mithril';
import {SetUnits, ExercisePrescription} from './exercise';

let AddPrescriptionView = function(vnode) {
    let newPrescription: ExercisePrescription = {
        exercise: null,
        sets: 0,
        amount: 0
    };
    return {
        onupdate: function(vnode) {
            if (vnode.attrs.allExercises.length > 0) {
                newPrescription.exercise = vnode.attrs.allExercises[0];
            }
        },
        view: function(vnode) {
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
                    }, vnode.attrs.allExercises.map(function(exercise, index) {
                        return m('option[value=' + index + ']', exercise.name);
                    }))
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

export {AddPrescriptionView};
