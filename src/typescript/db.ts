import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import {Saveable, Saved, Workout, Exercise} from './exercise';
import {observable, extendObservable, autorun, IObservableObject, toJS} from 'mobx'

let db: PouchDB;

const init = function() {
    PouchDB.plugin(PouchDBFind);

    db = new PouchDB('leeft');

    db.createIndex({
        index: {
            fields: ['name'],
        }
    }).then((result) => {
    }).catch((error) => {
    });
    // TODO: wait until callback finishes?

    db.createIndex({
        index: {
            fields: ['workout._id', 'date']
        }
    }).then((result) => {
    }).catch((error) => {
    })
};

const getAllExercises = function() {
    return db.allDocs({startkey: 'exercise_', endkey: 'exercise_\uffff', include_docs: true});
};

function fetchSaveableCollection<T> (startKey: string): Promise<Array<Saveable & T & IObservableObject>> {
    return new Promise<Array<Saveable & T & IObservableObject>>((resolve, reject) => {
        db.allDocs({startkey: startKey, endkey: startKey + '\uffff', include_docs: true}).then((results) => {
            let observableRecords = results.rows.map((result) => {
                let rev = result.doc._rev
                delete result._rev
                let observableRecord = observable(result.doc)
                autorun(() => {
                    let plainObject: Saveable & T = toJS(observableRecord)
                    let savedObject: Saved & T = Object.assign(plainObject, {_rev: rev})
                    db.put(savedObject).then((response) => {
                        rev = response.rev
                    })
                })
                return observableRecord
            })
            resolve(observableRecords)
        })
    })
}

const remove = function(object: Saveable & IObservableObject) {
    object._deleted = true
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

function fetchSaveableRecord<T> (id: string): Promise<Saveable & T & IObservableObject> {
    return new Promise<Saveable & T & IObservableObject>((resolve, reject) => {
        let rev = ''
        db.get(id).then((record: Saved & T) => {
            rev = record._rev
            delete record._rev
            if (typeof record._deleted == 'undefined') {
                record._deleted = false
            }
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
    let observeMe = observable(Object.assign(object, {_deleted: false}))
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

function deleteSaveableRecord (object: Saveable & IObservableObject): void {
    object._deleted = true
}

export default {
    init,
    getAllExercises,
    remove,
    findLogsByWorkoutId,
    fetchSaveableRecord,
    fetchSaveableCollection,
    createSaveableRecord,
    deleteSaveableRecord,
};
