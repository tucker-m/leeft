import * as m from 'mithril';
import db from '../helpers/db';
import {Saveable, Workout, WorkoutLog, ExercisePrescription, ExerciseSetLog} from '../types/exercise';
import {observable, toJS, computed, IObservableObject} from 'mobx'
import ExerciseTitle from './exerciseTitleInLog'

interface LogWorkoutAttrs {
    id: string
};

interface LogWorkoutVnode {
    attrs: LogWorkoutAttrs
};

const LogWorkoutComponent = function(vnode: LogWorkoutVnode) {
    let workout: Workout & Saveable = {
        _id: '',
        name: '',
        prescriptions: [],
    };
    let log: WorkoutLog & Saveable & IObservableObject = db.createSaveableRecord({
        _id: 'log_' + Date.now().toString(),
        workout: workout,
        date: Date.now(),
        sets: [],
        comments: '',
    })
    let expectedRepNumbers: Array<number> = []
    let logViewModel = toJS(log)


    db.fetchSaveableRecord<Workout>(vnode.attrs.id).then((returnedWorkout) => {

        workout = returnedWorkout
        log.workout = workout
        logViewModel = toJS(log)
        // For each exercise in the workout, for the number of sets for that
        // exercise, create a setLog in the workout log. So, there will be
        // (number of exercises) x (sets per exercise) setLogs in the
        // workout log.
        workout.prescriptions.map((prescription) => {
            for (let i = 0; i < prescription.sets; i++) {
                logViewModel.sets.push({
                    exercise: prescription.exercise,
                    amount: 0,
                    reps: 0,
                })
                expectedRepNumbers.push(prescription.amount)
            }
        })
        m.redraw() // TODO: mobx to make this unnecessary?
    })

    return {
        view: function(vnode: LogWorkoutVnode) {
            return m('div', [
                m('h4', 'Today\'s plan:'),
                m('ul', workout.prescriptions.map((prescription) => {
                    return m('li', `${prescription.exercise.name} ${prescription.sets}x${prescription.amount}`)
                })),
                logViewModel.sets.map((setLog, index) => {
                    return m('div', [
                        m('button.button', {
                            onclick: () => {
                                logViewModel.sets.splice(index, 0, {
                                    exercise: {name: '', setUnits: 'reps'},
                                    amount: 0,
                                    reps: 0,
                                })
                                expectedRepNumbers.splice(index, 0, -1)
                            }
                        }, 'Insert new exercise'),
                        m(ExerciseTitle, {setLog}),
                        (expectedRepNumbers[index] > 0)
                            ? m('p', expectedRepNumbers[index] + ' reps') : null,
                        m('button.button.warning', {
                            onclick: () => {
                                logViewModel.sets.splice(index, 1)
                                expectedRepNumbers.splice(index, 1)
                            }
                        }, 'Remove this exercise'),
                        m('div.input-group', [
                            m('input[type=number].input-group-field', {
                                placeholder: 'Reps done',
                                onchange: m.withAttr('value', (value) => {
                                    setLog.reps = value;
                                }),
                            }),
                            m('span.input-group-label', setLog.exercise.setUnits),
                        ]),
                        m('div.input-group', [
                            m('input[type=number].input-group-field', {
                                placeholder: 'Weight done',
                                onchange: m.withAttr('value', (value) => {
                                    setLog.amount = value;
                                }),
                            }),
                            m('span.input-group-label', 'pounds'),
                        ])
                    ]);
                }),
                m('textarea', {
                    onchange: m.withAttr('value', (value) => {
                        log.comments = value
                    }),
                    value: logViewModel.comments,
                    placeholder: 'Put workout comments here...',
                }),
                m('a.button.primary', {
                    onclick: () => {
                        let filteredSets = logViewModel.sets.filter((set) => {
                            return (set.amount > 0 || set.reps > 0)
                        })
                        log.sets = filteredSets
                    },
                    href: `#!/workouts/${workout._id}`
                }, 'Save')
            ]);
        }
    };
};

export default LogWorkoutComponent;
