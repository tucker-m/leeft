type SetUnits = 'reps' | 'seconds';

type ModelName = 'workout' | 'exercise' | 'log' | 'program' | 'rest'

interface Saveable {
    readonly _id: string,
    _deleted?: boolean,
    readonly tag: ModelName,
}

interface Saved extends Saveable {
    _rev: string,
}

interface Exercise {
    name: string,
    setUnits: SetUnits,
    tag: 'exercise',
};

interface ExerciseSetLog {
    exercise: Exercise,
    amount: number,
    reps: number,
};

interface WorkoutLog {
    workout: Workout & Saveable,
    sets: Array<ExerciseSetLog>, // TODO: Group by exercise? Allows for supersets
    date: number,
    comments: string,
    _deleted?: boolean,
    tag: 'log',
};

interface ExercisePrescription {
    exercise: Exercise,
    sets: number,
    amount: number,
};

interface Workout {
    name: string,
    prescriptions: Array<ExercisePrescription>,
    tag: 'workout',
};

interface Rest {
    tag: 'rest',
}

interface Program {
    schedule: Array<Workout | Rest>,
    name: string,
    tag: 'program',
}

export {
    Saveable,
    Saved,
    ModelName,
    Exercise,
    SetUnits,
    ExercisePrescription,
    Workout,
    WorkoutLog,
    ExerciseSetLog,
    Program,
};
