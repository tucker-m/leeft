// This component takes in an array of exercises and a string
// and returns labels for all of the exercises that could match
// the given string.

import * as m from 'mithril';
import {Exercise} from './exercise';

interface MatchingAttrs {
    value: string,
    allExercises: Array<Exercise>,
    setChosenExercise: (exercise: Exercise) => void,
};

interface MatchingVnode {
    attrs: MatchingAttrs
};

const MatchingExerciseComponent = (vnode: MatchingVnode) => {
    let matchingOptions: Array<Exercise> = [];
    const filterExercises = (substring: string, allExercises: Array<Exercise>) => {
        if (substring.length == 0) {
            return [];
        }
        return allExercises.filter((exercise) => {
           return (
               exercise.name.indexOf(substring) != -1
                   && exercise.name != substring
           );
       });
    }
    return {
        oninit: (vnode: MatchingVnode) => {
            matchingOptions = filterExercises(vnode.attrs.value, vnode.attrs.allExercises);
        },
        onbeforeupdate: (vnode: MatchingVnode) => {
            matchingOptions = filterExercises(vnode.attrs.value, vnode.attrs.allExercises);
        },
        view: (vnode: MatchingVnode) => {
            return matchingOptions.map((option) => {
                return m('span.label', {
                    onclick: () => {
                        vnode.attrs.setChosenExercise(option);
                    },
                }, option.name);
            });
        }
    };
};

const MatchingExercises = (attrs: MatchingAttrs) => {
    return m(MatchingExerciseComponent, attrs);
};

export default MatchingExercises;
