import * as m from 'mithril';
import PouchDB from 'pouchdb';
import {Exercise, Workout, SetUnits} from './exercise';
import WorkoutDisplay from './workoutDisplay';

export default (db: PouchDB, allWorkouts: Array<Workout>, allExercises: Array<Exercise>, saveWorkout: (w: Workout, i: number) => void) => {
    let elements = [];
    for (let index = allWorkouts.length - 1; index >= 0; index--) {
        let workout = allWorkouts[index];
        const attrs = {
            key: workout._id,
            workout: workout,
            allExercises: allExercises,
            deleteFunction: () => {
                allWorkouts.splice(index, 1); // TODO: remove from allWorkouts?
                db.remove(workout);
            },
            saveWorkoutFunction: (workout: Workout) => {
                saveWorkout(workout, index);
            },
            updateDefaultExercise: (exerciseName: string, repType: SetUnits) => {
                // If the exercise name doesn't match an existing one,
                // create a new exercise. If it does but the rep type
                // has changed, update that.
                db.find({
                    selector: {name: exerciseName }
                }).then((results) => {
                    let exercise = null;
                    // TODO: make sure only one result is
                    // returned, if any. Exercise names should be unique.
                    if (results.docs.length == 1) {
                        exercise = results.docs[0];
                        exercise.setUnits = repType;
                    }
                    else if (results.docs.length == 0) {
                        exercise = {
                            _id: 'exercise_' + Date.now().toString() + exerciseName,
                            name: exerciseName,
                            setUnits: repType
                        };
                        // TODO: push to vnode.attrs.allExercises and do a redraw. We're inside of a callback, so it won't be redrawn automatically.
                    }
                    db.put(exercise); // TODO: catch errors.
                    // can't just m.redraw() here, the allExercises
                    // array needs to be updated. How can we do that?
                    // TODO ^ that.
                });
            },
        };
        elements.push(WorkoutDisplay(attrs));
    }
    return elements;
}
