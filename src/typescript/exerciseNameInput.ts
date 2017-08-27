// This component takes in an initial value and an array of exercises.
import * as m from 'mithril';
import {Exercise} from './exercise';
import MatchingExercises from './matchingExercises';

interface ExerciseNameAttrs {
    value: string,
    allExercises: Array<Exercise>,
    setChosenExercise: (exercise: Exercise) => void,
    beingEdited: boolean,
};

interface ExerciseNameVnode {
    attrs: ExerciseNameAttrs
};

const ExerciseNameComponent = (vnode: ExerciseNameVnode) => {
    const initialValue = vnode.attrs.value;
    let currentValue = initialValue;
    return {
        view: (vnode: ExerciseNameVnode) => {
            if (!vnode.attrs.beingEdited) {
                return m('span', vnode.attrs.value);
            }
            return m('div', [
                m('input[type=text]', {
                    value: currentValue,
                    onkeyup: m.withAttr('value', (value) => {
                        currentValue = value;
                    })
                }),
                MatchingExercises({
                    value: currentValue,
                    allExercises: vnode.attrs.allExercises,
                    setChosenExercise: (exercise: Exercise) => {
                        currentValue = exercise.name;
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
