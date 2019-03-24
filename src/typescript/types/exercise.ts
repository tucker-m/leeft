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

interface NamedObject {
    name: string,
}

interface Exercise extends NamedObject {
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

interface Workout extends NamedObject {
    identifier: string,
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

interface Program extends NamedObject {
    schedule: Array<Workout | Rest>,
    tag: 'program',
}

interface Settings {
    tag: 'settings',
    currentProgram: Program | null,
    nextWorkoutIndex: number,
}

const createSetLogViewModelsFromPrescriptions = (prescriptions: Array<ExercisePrescription>) => {
    let setLogVms: Array<SetLogViewModel> = []
    prescriptions.forEach((prescription) => {
	for (let i = 0; i < prescription.sets; i++) {
	    setLogVms.push({
		exercise: prescription.exercise,
		prescribedReps: prescription.amount,
	    })
	}
    })
    return setLogVms
}

export {
    Saveable,
    Saved,
    Puttable,
    ModelName,
    NamedObject,
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
    createSetLogViewModelsFromPrescriptions,
};
