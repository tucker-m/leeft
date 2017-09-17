import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import {Workout, Exercise} from './exercise';

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

const findWorkoutById = function(id: string) {
    return new Promise<Workout>((resolve, reject) => {
        db.get(id).then((workout) => {
            resolve(workout);
        }).catch((error) => {
            reject(error);
        });
    });
};

export default {init, getAllExercises, getAllWorkouts, put, remove, findByName, findWorkoutById};
