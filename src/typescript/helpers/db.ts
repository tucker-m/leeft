import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import {Saveable, Saved, Puttable, ModelName, Set, Workout, Program, Settings, WorkoutLog} from '../types/exercise';
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
    })
    db.createIndex({
	index: {
	    fields: ['workout.identifier']
	}
    })
    db.createIndex({
        index: {
            fields: ['name', 'tag']
        }
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

function fetchSaveableCollection<T> (tag: ModelName): Promise<(Puttable & T & IObservableObject)[]> {
    return new Promise<(Puttable & T & IObservableObject)[]>((resolve, reject) => {
        getAllItems(tag).then((records) => {
            const rows: {doc: T & Saved}[] = records.rows
            const observableRecords = rows.map((record) => {
                const doc = record.doc
                let rev = doc._rev
                // delete doc._rev
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
                }, {delay: 300})
                return observableRecord
            })
            resolve(observableRecords)
        })
    })
}

const findLogsByWorkoutIdentifier = (id: string) => {
    return new Promise<(WorkoutLog)[]>((resolve, reject) => {
	db.find({
	    selector: {'workout.identifier': id}
	}).then(result => {
	    resolve(result.docs)
	})
    })
}

const findExercisesByName = (name: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        db.allDocs({include_docs: true, startkey: 'program_', endkey: 'program_\ufff0'}).then((docs) => {
            let programs = docs.rows
            let prescriptions = programs.flatMap((program) => {
		return program.doc.schedule.map((workout) => {
    			return workout.prescriptions
		})
            })
            let filteredPrescriptions = prescriptions.flat().filter((prescription) => {
                if (typeof prescription.exerciseName !== 'undefined'
                  && prescription.exerciseName.toLowerCase().includes(name.toLowerCase())) {
                    return true
                }
                else {
                    return false
                }
            })
            resolve(filteredPrescriptions.map((item) => { return item.exerciseName }))
        })
    })
}

const findWorkoutsByName = (name: string, avoid: Workout | null = null): Promise<(Workout)[]> => {
    return new Promise((resolve, reject) => {
        db.allDocs({include_docs: true, startkey: 'program_', endkey: 'program_\ufff0'}).then((docs) => {
            let programs = docs.rows
            let mappedPrograms = programs.flatMap((program) => {
                return program.doc.schedule.map((workout) => {
                    return {
                        program: program.doc,
                        workout: workout
                    }
                })
            })
            const avoidMe = JSON.stringify(toJS(avoid))
            let filteredPrograms = mappedPrograms.filter((mappedProgram) => {
                if (mappedProgram.workout.tag == 'rest') {
                    return false
                }
                if (JSON.stringify(mappedProgram.workout) == avoidMe) {
                    return false
                }
                else {
                    return mappedProgram.workout.name.startsWith(name)
                }
            })
            let stringifiedObjects = filteredPrograms.map((program) => {
                return JSON.stringify(program)
            })
            let groupedByWorkout: any[] = []
            let removeDuplicates = filteredPrograms.filter((elem, index) => {
                return index === stringifiedObjects.indexOf(JSON.stringify(elem))
            })
            removeDuplicates.forEach((workout) => {
                const elemIndex = groupedByWorkout.findIndex((group) => {
                    return JSON.stringify(group.workout) == JSON.stringify(workout.workout)
                })
                if (elemIndex >= 0) {
                    groupedByWorkout[elemIndex].programs.push(workout.program)
                }
                else {
                    groupedByWorkout.push({
                        workout: workout.workout,
                        programs: [workout.program]
                    })
                }
            })
            resolve(groupedByWorkout)
        })
    })
}

function findLogsContainingExercise(exerciseName: string, priorTo: string): Promise<(WorkoutLog & Saved)[]> {
    return new Promise<(WorkoutLog & Saved)[]>((resolve, reject) => {
	resolve([
	])
    })
}

function fetchSaveableRecord<T> (id: string): Promise<Puttable & T & IObservableObject> {
    return new Promise<Puttable & T & IObservableObject>((resolve, reject) => {
        let rev = ''
        db.get(id).then((record: Saved & T) => {
            rev = record._rev
            // delete record._rev
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
            }, {delay: 300})
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
		if (JSON.stringify(plainObject) != JSON.stringify(object)) {
		    let savedObject: Saved & T = Object.assign(plainObject, {_rev: rev})
                    db.put(savedObject).then((response) => {
			rev = response.rev
                    })
		}
            }, {delay: 300})
            resolve(observeMe)
        })
    })
}

function findWorkoutUrlByWorkoutIdentifier(identifier: string): Promise<string> {
    return new Promise((resolve, reject) => {
	db.allDocs({
	    include_docs: true,
	    startkey: 'program_',
	    endkey: 'program_\ufff0',
	}).then(programs => {
	    programs = programs.rows.map(row => row.doc)
	    // get the program ID and workout day
	    let day = -1
	    const matchingProgram = programs.find(program => {
		// find the workout's day here
		const p = <Program>program
		day = p.schedule.findIndex(workout => {
		    return workout.tag == 'workout' && (workout.identifier === identifier)
		})
		return day > -1
	    })
	    resolve(`/programs/${matchingProgram._id}/workouts/${day}`)
	})
    })
}

function deleteSaveableRecord (object: Puttable): void {
    object._deleted = true
}

export default {
    init,
    getSettings,
    findLogsByWorkoutIdentifier,
    findExercisesByName,
    findWorkoutsByName,
    findLogsContainingExercise,
    fetchSaveableCollection,
    fetchSaveableRecord,
    promiseSaveableRecord,
    findWorkoutUrlByWorkoutIdentifier,
    deleteSaveableRecord,
};
