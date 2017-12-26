type SetUnits = 'reps' | 'seconds';

interface Saveable {
    readonly _id: string,
    _deleted?: boolean,
}

interface Saved extends Saveable {
    _rev: string,
}

interface Exercise {
    name: string,
    setUnits: SetUnits
};

interface ExerciseSetLog {
    exercise: Exercise,
    amount: number,
    reps: number,
};

interface WorkoutLog {
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
    name: string,
    prescriptions: Array<ExercisePrescription>
};

export {
    Saveable,
    Saved,
    Exercise,
    SetUnits,
    ExercisePrescription,
    Workout,
    WorkoutLog,
    ExerciseSetLog
};
