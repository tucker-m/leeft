import * as m from 'mithril';
import {ExercisePrescription, SetUnits, Exercise} from './exercise';

let label = '';
let newPrescription: ExercisePrescription = {
    exercise: null,
    sets: 0,
    amount: 0
};

if (newPrescription.exercise != null) {
    if (newPrescription.exercise.setUnits == SetUnits.Weight) {
        label = 'Reps'
    };
    if (newPrescription.exercise.setUnits == SetUnits.Time) {
        label = 'Time (seconds)'
    };
}

interface AddPrescriptionAttrs {
    allExercises: Array<Exercise>,
    submitFunction: (prescription: ExercisePrescription) => void
};

interface AddPrescriptionVnode {
    attrs: AddPrescriptionAttrs
};
const AddPrescription = {
    view: function(vnode: AddPrescriptionVnode) {
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
                        }
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
                    m('label[for=select-exercise-amount]', label),
                    m('input#select-exercise-amount[type=number]', {
                        onchange: m.withAttr('value', function(value: string) {
                            newPrescription.amount = parseInt(value)
                        }),
                        value: newPrescription.amount
                    })
                ]),
                m('button[type=submit]', 'Add')
            ]
        )
    }
};

export {AddPrescription, AddPrescriptionAttrs};
