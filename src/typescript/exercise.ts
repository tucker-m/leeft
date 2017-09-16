type SetUnits = 'reps' | 'seconds';

interface ExerciseSetLog {
    exerciseName: string,
    amount: number,
    unit: SetUnits,
    reps: number
};

interface Exercise {
    _id?: string, // ideally, this should not be optional. All saveables need an _id.
    _rev?: string,
    name: string,
    setUnits: SetUnits
};

interface ExercisePrescription {
    exercise: Exercise,
    sets: number,
    amount: number,
};

interface Workout {
    _id: string,
    _rev?: string,
    name: string,
    prescriptions: Array<ExercisePrescription>
};

interface WorkoutLog {
    workout: Workout,
    date: Date
};

export { Exercise, SetUnits, ExercisePrescription, Workout };
