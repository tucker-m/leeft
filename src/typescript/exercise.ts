const enum RecordType {
    SetsAndReps,
    Reps,
    Time
};

const RecordTypeNames = {
    SetsAndReps: 'Sets and reps'
};

interface Exercise {
    name: string,
    type: RecordType
};

export { Exercise, RecordType, RecordTypeNames };
