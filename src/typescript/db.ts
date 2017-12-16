import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import {Saveable, Saved, Workout, Exercise, WorkoutLog} from './exercise';
import {observable, autorun, IObservableObject, toJS} from 'mobx'

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
    return new Promise<Workout & Saveable>((resolve, reject) => {
        db.get(id).then((workout) => {
            resolve(workout);
        }).catch((error) => {
            reject(error);
        });
    });
};

const saveLog = (log: WorkoutLog) => {
    return db.put(log);
}

function fetchSaveableRecord<T> (id: string): Promise<Saveable & T & IObservableObject> {
    return new Promise<Saveable & T & IObservableObject>((resolve, reject) => {
        let rev = ''
        db.get(id).then((record: Saved & T) => {
            rev = record._rev
            delete record._rev
            let observableRecord = observable(record)
            autorun(() => {
                let plainObject: Saveable & T = toJS(observableRecord)
                let savedObject: Saved & T = Object.assign(plainObject, {_rev: rev})
                db.put(savedObject).then((response) => {
                    rev = response.rev
                })
            })
            resolve(observableRecord)
        })
    })
}

function createSaveableRecord<T> (object: T & Saveable): Saveable & T & IObservableObject {
    let rev = ''
    let observeMe = observable(object)
    db.put(object).then((response) => {
        rev = response.rev
        autorun(() => {
            let plainObject: Saveable & T = toJS(observeMe)
            let savedObject: Saved & T = Object.assign(plainObject, {_rev: rev})
            db.put(savedObject).then((response) => {
                rev = response.rev
            })
        })
    })
    return observeMe
}


export default {
    init,
    getAllExercises,
    getAllWorkouts,
    put,
    remove,
    findByName,
    findLogsByWorkoutId,
    findWorkoutById,
    saveLog,
    fetchSaveableRecord,
    createSaveableRecord,
};
