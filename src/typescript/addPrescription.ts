import * as m from 'mithril';
import {ExercisePrescription, SetUnits, Exercise} from './exercise';
import {AddPrescriptionView, AddPrescriptionViewAttrs} from './addPrescriptionView';

let AddPrescription = function(allExercises: Array<Exercise>, submitFunction){
    const addPrescriptionViewAttrs = {
        allExercises,
        submitFunction
    };

    return m(AddPrescriptionView, addPrescriptionViewAttrs);
};
export {AddPrescription};
