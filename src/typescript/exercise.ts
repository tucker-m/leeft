const enum SetUnits {
    Weight,
    None,
    Time
};

interface ExerciseSetLog {
    exerciseName: string,
    amount: number,
    unit: SetUnits,
    reps: number
};

const RecordTypeNames:Map<SetUnits, string> = new Map([
    [SetUnits.Weight, 'pounds'],
    [SetUnits.None, 'N/A'],
    [SetUnits.Time, 'seconds']
]);

interface Exercise {
    _id: string,
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

export { Exercise, SetUnits, RecordTypeNames, ExercisePrescription, Workout };
