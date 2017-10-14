import * as m from 'mithril';
import db from './db';
import {Workout, WorkoutLog, ExercisePrescription} from './exercise';

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
    let log: WorkoutLog = {
        _id: 'log_' + Date.now().toString(),
        workout: workout,
        date: Date.now(),
        sets: [{exercise: null, reps: 0, amount: 0}],
    };
    db.findWorkoutById(vnode.attrs.id).then((returnedWorkout) => {
        workout = returnedWorkout;
        log.workout = workout;
        m.redraw(); // TODO: mobx to make this unnecessary?
    });

    const getSetArray = (prescription: ExercisePrescription, log: WorkoutLog) => {
        let elements = new Array(prescription.sets)
        for (let i = 0; i < prescription.sets; i++) {
            elements.push(m('div', [
                m('p', 'Set ' + (i + 1).toString()),
                m('div.input-group', [
                    m('input[type=number].input-group-field', {
                        placeholder: 'Reps done',
                        onchange: m.withAttr('value', (value) => {
                            log.sets[i].reps = value;
                        }),
                    }),
                    m('span.input-group-label', prescription.exercise.setUnits),
                ]),
                m('div.input-group', [
                    m('input[type=number].input-group-field', {
                        placeholder: 'Weight done',
                        onchange: m.withAttr('value', (value) => {
                            log.sets[i].amount = value;
                        }),
                    }),
                    m('span.input-group-label', 'pounds')
                ])
            ]));
        }
        return elements;
    };

    return {
        view: function(vnode: LogWorkoutVnode) {
            return m('div', [
                workout.prescriptions.map((prescription) => {
                    return m('div.card', [
                        m('div.card-divider', m('h4', prescription.exercise.name
                                                + ' (' + prescription.amount + ' '
                                                + prescription.exercise.setUnits
                                                + ')')
                         ),
                        m('div.card-section', getSetArray(prescription, log))
                    ]);
                }),
                m('button.button.primary', {
                    onclick: () => {
                        db.saveLog(log).then((result) => {
                            log._rev = result.rev
                        })
                    },
                }, 'Save')
            ]);
        }
    };
};

export default LogWorkoutComponent;
