type SetUnits = 'reps' | 'seconds';

type ModelName = 'workout' | 'exercise' | 'workoutlog' | 'program' | 'rest' | 'settings'

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

interface WorkoutLog {
    workout: Workout & Puttable,
    sets: Array<SetLogViewModel>, // TODO: Group by exercise? Allows for supersets
    date: number,
    comments: string,
    _deleted?: boolean,
    tag: 'workoutlog',
};

// A logviewmodel is a set that you either
// did or were supposed to do. It can have
// a prescribed amount and/or a performed
// amount.
interface SetLogViewModel {
    exercise: Exercise,
    prescribedReps?: number,
    log?: {
	reps: number,
	amount: number,
    },
}

interface GroupedSetLogVm {
    exercise: Exercise,
    sets: Array<SetLogViewModel>
}


interface ExercisePrescription {
    exercise: Exercise,
    sets: number,
    amount: number,
};

interface Workout {
    name: string,
    identifier?: string,
    prescriptions: Array<ExercisePrescription>,
    tag: 'workout',
};

interface Rest {
    tag: 'rest',
}

type WorkoutAndLog = (Workout | Rest) & {lastLog: {
    date: number,
    id: string,
}}

interface Program {
    schedule: Array<Workout | Rest>,
    name: string,
    tag: 'program',
}

interface Settings {
    tag: 'settings',
    currentProgram: Program | null,
    nextWorkoutIndex: number,
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
    Rest,
    WorkoutAndLog,
    WorkoutLog,
    SetLogViewModel,
    GroupedSetLogVm,
    Program,
    Settings,
};
