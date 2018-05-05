import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import {Saveable, Saved, Puttable, ModelName, Workout, Exercise, Settings} from '../types/exercise';
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
            fields: ['workout.name', 'date']
        }
    }).then((result) => {
    }).catch((error) => {
    })
};

const getAllItems = (key: ModelName) => {
    return db.allDocs({startkey: key+'_', endkey: key+'_\uffff', include_docs: true});
}

const getSettings = () => {
    return new Promise<Settings>((resolve, reject) => {
        fetchSaveableRecord<Settings>('settings').then((settings) => {
            resolve(settings)
        }).catch((error) => {
            const newSettings: Settings = {
                tag: 'settings',
                currentProgram: null,
                nextWorkoutIndex: 0,
            }
            promiseSaveableRecord(newSettings).then((settings) => {
                resolve(settings)
            })
        })
    })
}

function fetchSaveableCollection<T> (tag: ModelName): Promise<Array<Puttable & T & IObservableObject>> {
    return new Promise<Array<Puttable & T & IObservableObject>>((resolve, reject) => {
        getAllItems(tag).then((records) => {
            const rows: Array<{doc: T & Saved}> = records.rows
            const observableRecords = rows.map((record) => {
                const doc = record.doc
                let rev = doc._rev
                delete doc._rev
                if (typeof doc._deleted == 'undefined') {
                    doc._deleted = false
                }
                let observableRecord: Puttable & T & IObservableObject = observable(doc)
                autorun(() => {
                    let plainObject: Puttable & T = toJS(observableRecord)
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

const findLogsByWorkoutName = (name: string) => {
    return db.find({
        selector: {
            $and: [
                {'workout.name': name},
                {'date': {$gt: null}}
            ]
        },
    })
}

function fetchSaveableRecord<T> (id: string): Promise<Puttable & T & IObservableObject> {
    return new Promise<Puttable & T & IObservableObject>((resolve, reject) => {
        let rev = ''
        db.get(id).then((record: Saved & T) => {
            rev = record._rev
            delete record._rev
            if (typeof record._deleted == 'undefined') {
                record._deleted = false
            }
            let observableRecord: Puttable & T & IObservableObject = observable(record)
            autorun(() => {
                let plainObject: Puttable & T = toJS(observableRecord)
                let savedObject: Saved & T = Object.assign(plainObject, {_rev: rev})
                db.put(savedObject).then((response) => {
                    rev = response.rev
                }).catch((error) => {
                    console.log(error)
                })
            })
            resolve(observableRecord)
        }).catch((error) => {
            reject(error)
        })
    })
}

function promiseSaveableRecord<T> (object: T & Saveable): Promise<Puttable & T & IObservableObject> {
    return new Promise<Puttable & T & IObservableObject>((resolve, reject) => {
        const id = object.tag == 'settings' ? 'settings' : object.tag + '_' + Date.now()
        let rev = ''
        let objectWithId: Puttable & T = Object.assign(object, {_id: id, _deleted: false})
        let observeMe = observable(objectWithId)
        db.put(objectWithId).then((response) => {
            rev = response.rev
            autorun(() => {
                let plainObject: Puttable & T = toJS(observeMe)
                let savedObject: Saved & T = Object.assign(plainObject, {_rev: rev})
                db.put(savedObject).then((response) => {
                    rev = response.rev
                })
            })
            resolve(observeMe)
        })
    })
}

function deleteSaveableRecord (object: Puttable): void {
    object._deleted = true
}

export default {
    init,
    getSettings,
    findLogsByWorkoutName,
    fetchSaveableCollection,
    fetchSaveableRecord,
    promiseSaveableRecord,
    deleteSaveableRecord,
};
