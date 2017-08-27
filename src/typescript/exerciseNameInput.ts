// This component takes in an initial value and an array of exercises.
import * as m from 'mithril';
import {Exercise} from './exercise';
import MatchingExercises from './matchingExercises';

interface ExerciseNameAttrs {
    exercise: Exercise,
    allExercises: Array<Exercise>,
    setChosenExercise: (exercise: Exercise) => void,
    beingEdited: boolean,
};

interface ExerciseNameVnode {
    attrs: ExerciseNameAttrs
};

const ExerciseNameComponent = (vnode: ExerciseNameVnode) => {
    return {
        view: (vnode: ExerciseNameVnode) => {
            if (!vnode.attrs.beingEdited) {
                return m('span', vnode.attrs.exercise.name);
            }
            return m('div', [
                m('input[type=text]', {
                    value: vnode.attrs.exercise.name,
                    onkeyup: m.withAttr('value', (value) => {
                        vnode.attrs.exercise.name = value;
                    })
                }),
                MatchingExercises({
                    value: vnode.attrs.exercise.name,
                    allExercises: vnode.attrs.allExercises,
                    setChosenExercise: (exercise: Exercise) => {
                        vnode.attrs.setChosenExercise(exercise);
                    }
                })
            ]);
        }
    };
};

const ExerciseName = (attrs: ExerciseNameAttrs) => {
    return m(ExerciseNameComponent, attrs);
};

export default ExerciseName;
