const enum RecordType {
    SetsAndReps,
    Reps,
    Time
};

const RecordTypeNames:Map<RecordType, string> = new Map([
    [RecordType.SetsAndReps, 'Sets and reps'],
    [RecordType.Reps, 'Reps'],
    [RecordType.Time, 'Time']
]);

interface Exercise {
    _id: string,
    name: string,
    type: RecordType
};

export { Exercise, RecordType, RecordTypeNames };
