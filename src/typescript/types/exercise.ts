type ModelName = 'workout' | 'workoutlog' | 'program' | 'rest' | 'settings'

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

interface NamedObject {
    name: string,
}

interface WorkoutLog {
    workout: Workout,
    sets: Array<SetLog>, // TODO: Group by exercise? Allows for supersets
    date: number,
    comments: string,
    _deleted?: boolean,
    tag: 'workoutlog',
};

interface SetPrescription {
    exerciseName: string,
    reps: boolean | number,
    weight: boolean | number,
    time: boolean | number,
}

interface SetLog {
    exerciseName: string,
    reps: false | number,
    weight: false | number,
    time: false | number,
}

interface Workout extends NamedObject {
    identifier: string,
    prescriptions: Array<SetPrescription>,
    tag: 'workout',
};

interface Rest {
    tag: 'rest',
}

type WorkoutAndLog = (Workout | Rest) & {lastLog: {
    date: number,
    id: string,
}}

interface Program extends NamedObject {
    schedule: Array<Workout | Rest>,
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
    NamedObject,
    SetPrescription,
    SetLog,
    Workout,
    Rest,
    WorkoutAndLog,
    WorkoutLog,
    Program,
    Settings,
};
