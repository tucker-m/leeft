import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import {Workout, Exercise, WorkoutLog} from './exercise';

let db: PouchDB;

const init = function() {
    PouchDB.plugin(PouchDBFind);

    db = new PouchDB('leeft');

    db.createIndex({
        index: {
            fields: ['name'],
        }
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
    // TODO: wait until callback finishes?

    db.createIndex({
        index: {
            fields: ['workout._id', 'date']
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
};

const getAllExercises = function() {
    return db.allDocs({startkey: 'exercise_', endkey: 'exercise_\uffff', include_docs: true});
};

const getAllWorkouts = function() {
    return db.allDocs({startkey: 'workout_', endkey: 'workout_\uffff', include_docs: true});
}
const put = function(object: Workout | Exercise) {
    return db.put(object);
};

const putAndFillRev = function(object: Workout | Exercise) {
        <Promise<{}>>(db.put(object)).then((response) => {
        object._rev = response.rev;
    });
};

const remove = function(object: Workout) {
    db.remove(object);
};

const findByName = function(name: string) {
    return db.find({
        selector: {name: name}
    });
};

const findLogsByWorkoutId = (id: string) => {
    return db.find({
        selector: {
            $and: [
                {'workout._id': id},
                {'date': {$gt: null}}
            ]
        },
    })
}

const findWorkoutById = function(id: string) {
    return new Promise<Workout>((resolve, reject) => {
        db.get(id).then((workout) => {
            resolve(workout);
        }).catch((error) => {
            reject(error);
        });
    });
};

const findLogById = (id: string) => {
    return new Promise<WorkoutLog>((resolve, reject) => {
        db.get(id).then((log) => {
            resolve(log)
        }).catch((error) => {
            reject(error)
        })
    })
}

const saveLog = (log: WorkoutLog) => {
    return db.put(log);
}

export default {
    init,
    getAllExercises,
    getAllWorkouts,
    put,
    putAndFillRev,
    remove,
    findByName,
    findLogsByWorkoutId,
    findWorkoutById,
    findLogById,
    saveLog,
};
