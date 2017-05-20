const enum ExerciseTypes {
    SetsAndReps,
    Reps,
    Time
};

const ExerciseTypeNames = new Map([
    [ExerciseTypes.SetsAndReps, 'Sets and reps'],
    [ExerciseTypes.Reps, 'Reps'],
    [ExerciseTypes.Time, 'Time']
]);

interface Exercise {
    name: string,
    type: ExerciseTypes
};

export {Exercise, ExerciseTypes, ExerciseTypeNames};
