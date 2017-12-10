import * as m from 'mithril';
import {Saveable, Exercise, Workout, SetUnits} from './exercise';
import WorkoutDisplay from './workoutDisplay';

export default (allWorkouts: Array<Workout & Saveable>, allExercises: Array<Exercise>, saveWorkout: (w: Workout, i: number) => void, deleteWorkout: (w: Workout, i: number) => void, updateDefaultExercise: (name: string, repType: SetUnits) => void) => {
    let elements = [];
    for (let index = allWorkouts.length - 1; index >= 0; index--) {
        let workout = allWorkouts[index];
        const attrs = {
            key: workout._id,
            workout: workout,
            allExercises: allExercises,
            deleteFunction: () => {
                deleteWorkout(workout, index);
            },
            saveWorkoutFunction: (workout: Workout) => {
                saveWorkout(workout, index);
            },
            updateDefaultExercise: updateDefaultExercise
        };
        elements.push(WorkoutDisplay(attrs));
    }
    return elements;
}
