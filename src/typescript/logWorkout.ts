import * as m from 'mithril';
import db from './db';
import {Workout} from './exercise';

interface LogWorkoutAttrs {
    id: string
};

interface LogWorkoutVnode {
    attrs: LogWorkoutAttrs
};

const LogWorkoutComponent = function(vnode: LogWorkoutVnode) {
    let workout: Workout = {
        _id: '',
        name: '',
        prescriptions: [],
    };
    db.findWorkoutById(vnode.attrs.id).then((returnedWorkout) => {
        workout = returnedWorkout;
    });
    return {
        view: function(vnode: LogWorkoutVnode) {
            return m('div', workout.prescriptions.map((prescription) => {
                return m('p', prescription.exercise.name);
            }));
        }
    };
};

export default LogWorkoutComponent;
