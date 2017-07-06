import * as m from 'mithril';
import {ExercisePrescription, SetUnits, Exercise} from './exercise';
import {AddPrescriptionView} from './addPrescriptionView';

let AddPrescription = function(allExercises: Array<Exercise>, submitFunction){

    return m(AddPrescriptionView, {
        allExercises,
        submitFunction
    });
};
export {AddPrescription};
