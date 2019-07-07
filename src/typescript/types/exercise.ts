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
    sets: Array<Set>, // TODO: Group by exercise? Allows for supersets
    date: number,
    comments: string,
    _deleted?: boolean,
    tag: 'workoutlog',
};

interface Set {
    exerciseName: string,
    reps: false | {
	prescribed: false | number,
	entered: false | number,
    },
    weight: false | {
	prescribed: false | number,
	entered: false | number,
    },
    time: false | {
	prescribed: false | number,
	entered: false | number,
    },
}

interface Workout extends NamedObject {
    identifier: string,
    prescriptions: Array<Set>,
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
    Set,
    Workout,
    Rest,
    WorkoutAndLog,
    WorkoutLog,
    Program,
    Settings,
};
