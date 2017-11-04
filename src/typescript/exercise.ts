type SetUnits = 'reps' | 'seconds';

interface Exercise {
    _id?: string, // ideally, this should not be optional. All saveables need an _id.
    _rev?: string,
    name: string,
    setUnits: SetUnits
};

interface ExerciseSetLog {
    exercise: Exercise,
    amount: number,
    reps: number,
};

interface WorkoutLog {
    _id: string,
    _rev?: string,
    workout: Workout,
    sets: Array<ExerciseSetLog>, // TODO: Group by exercise? Allows for supersets
    date: number
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

export { Exercise, SetUnits, ExercisePrescription, Workout, WorkoutLog, ExerciseSetLog };
