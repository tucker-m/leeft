import * as m from "mithril";
import * as pouchdb from "pouchdb";
import Exercise from "./exercise";

let db = new pouchdb('leeft');

let app = {
    view: function() {
        return m(exerciseAddForm);
    }
};

let exerciseAddForm = {
    view: function() {
        let newExercise: Exercise = {name: '', type: 'Sets and reps'};
        return m('div', [
            m('form', [
                m('input[type=text][placeholder="Exercise name"]', {
                    oninput: m.withAttr('value', function(value) {newExercise.name = value;}),
                    value: newExercise.name
                }),
                m('button[type=submit]', 'Add')
            ])
        ]);
    }
};

m.mount(document.getElementById('main'), app);

if (module.hot) {
    module.hot.accept();
}
