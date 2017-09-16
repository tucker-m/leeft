import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import {Workout, Saveable} from './exercise';
import * as m from 'mithril';

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

const put = function(object: Workout) {
    db.put(object).then((result) => {
        object._rev = result.rev;
    }); // TODO: catch error
};

export default {init, getAllExercises, getAllWorkouts, put};
