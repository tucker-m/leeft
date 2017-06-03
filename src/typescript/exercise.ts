enum SetUnits {
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

export { Exercise, SetUnits, RecordTypeNames, ExercisePrescription };
