type SetUnits = 'reps' | 'seconds';

type ModelName = 'workout' | 'exercise' | 'workoutlog' | 'program' | 'rest'

interface Saveable {
    _deleted?: boolean,
    readonly tag: ModelName,
}

interface Puttable extends Saveable {
    _id: string,
}

interface Saved extends Puttable {
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
    workout: Workout & Puttable,
    sets: Array<ExerciseSetLog>, // TODO: Group by exercise? Allows for supersets
    date: number,
    comments: string,
    _deleted?: boolean,
    tag: 'workoutlog',
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
    Puttable,
    ModelName,
    Exercise,
    SetUnits,
    ExercisePrescription,
    Workout,
    WorkoutLog,
    ExerciseSetLog,
    Program,
};
