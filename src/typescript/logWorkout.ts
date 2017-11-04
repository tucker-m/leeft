import * as m from 'mithril';
import db from './db';
import {Workout, WorkoutLog, ExercisePrescription, ExerciseSetLog} from './exercise';

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
        sets: [],
    };
    let expectedRepNumbers: Array<number> = []
    db.findWorkoutById(vnode.attrs.id).then((returnedWorkout) => {
        workout = returnedWorkout
        log.workout = workout
        // For each exercise in the workout, for the number of sets for that
        // exercise, create a setLog in the workout log. So, there will be
        // (number of exercises) x (sets per exercise) setLogs in the
        // workout log.
        workout.prescriptions.map((prescription) => {
            for (let i = 0; i < prescription.sets; i++) {
                log.sets.push({
                    exercise: prescription.exercise,
                    amount: 0,
                    reps: 0,
                })
                expectedRepNumbers.push(prescription.amount)
            }
        })
        m.redraw() // TODO: mobx to make this unnecessary?
    });

    return {
        view: function(vnode: LogWorkoutVnode) {
            return m('div', [
                log.sets.map((setLog, index) => {
                    return m('div', [
                        m('h2', setLog.exercise.name),
                        m('p', expectedRepNumbers[index] + ' reps'),
                        m('input[type=number].input-group-field', {
                            placeholder: 'Reps done',
                            onchange: m.withAttr('value', (value) => {
                                setLog.reps = value;
                            }),
                        }),
                        m('span.input-group-label', setLog.exercise.setUnits),
                        m('input[type=number].input-group-field', {
                            placeholder: 'Weight done',
                            onchange: m.withAttr('value', (value) => {
                                setLog.amount = value;
                            }),
                        }),
                        m('span.input-group-label', 'pounds'),
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
