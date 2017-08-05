import * as m from 'mithril';
import {ExercisePrescription, Exercise} from './exercise';
import preventDefault from './preventDefaultFunction';

const exerciseOptionList = function(allExercises: Exercise[]) {
    const first = [m('option', {'disabled': 'disabled', 'selected': 'selected'}, 'Select exercise')];
    return first.concat(allExercises.map(function(exercise, index) {
        return m('option[value=' + index + ']', exercise.name);
    }));
};

interface AddPrescriptionViewAttrs {
    submitFunction: (prescription: ExercisePrescription) => void,
    allExercises: Array<Exercise>
};

interface AddPrescriptionViewVnode {
    attrs: AddPrescriptionViewAttrs
};

let AddPrescriptionViewComponent = function(vnode: AddPrescriptionViewVnode) {
    let newPrescription: ExercisePrescription = {
        exercise: null,
        sets: 0,
        amount: 0
    };
    return {
        view: function(vnode: AddPrescriptionViewVnode) {
            return m('form', {
                onsubmit: preventDefault(function() {
                    vnode.attrs.submitFunction(newPrescription);
                    newPrescription = {
                        exercise: null,
                        sets: 0,
                        amount: 0
                    };
                })
            }, [
                m('div', [
                    m('label[for=select-exercise]', 'Exercise'),
                    m('select#select-exercise', {
                        onchange: function(event: Event) {
                            let target = <HTMLSelectElement>event.target;
                            let selectedIndex = target.selectedIndex;
                            let selectedExercise = vnode.attrs.allExercises[parseInt(target.options[selectedIndex].value)];
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

const AddPrescriptionView = function(attrs: AddPrescriptionViewAttrs) {
    return m(AddPrescriptionViewComponent, attrs);
}

export default AddPrescriptionView;
