import * as m from 'mithril'
import {Exercise, Workout} from '../../../../../types/exercise'

interface DropDownAttrs {
    css: any,
    updateExercise: (exercise: Exercise) => void,
    matchingExercises: Array<{exercise: Exercise, workout: Workout}>,
    resultsShowing: boolean
    setResultsShowing: (show: boolean) => void,
}
interface DropDownVnode {
    attrs: DropDownAttrs,
}

const DropDownComponent = (vnode: DropDownVnode) => {
    const css = vnode.attrs.css

    return {
        view: (vnode: DropDownVnode) => {
            let matchingExercises = vnode.attrs.matchingExercises
	    const resultsShowing = vnode.attrs.resultsShowing

            return [
                m('div', {class: css.searchResults}, [
                    m('div', {class: css.resultDescription}, [
                        !resultsShowing ?
                            [
                                m('span', 'use'),
                                m('button', {
                                    class: `${css.small} ${css.hollowButton}`,
                                    onclick: () => {
                                        vnode.attrs.updateExercise(matchingExercises[0].exercise)
                                    }
                                }, matchingExercises[0].exercise.name),
                                m('span', `from ${matchingExercises[0].workout.name}`)
                            ]
                            : m('p', {class: css.searchResultsMessage}, `Matching exercises (${matchingExercises.length})`),
                    ]),
                    matchingExercises.length > 1 ?
                        m('button', {
                            class: `${css.small} ${css.hollowButton}`,
                            onclick: () => {
                                vnode.attrs.setResultsShowing(!resultsShowing)
                            }
                        }, resultsShowing ?
                          'hide'
                          : `show ${matchingExercises.length - 1} others`)
                        : null,
                ]),
                resultsShowing ?
                    m('div', {
                        class: css.overlayResultsContainer
                    }, matchingExercises.map((matchingExercise) => {
                        return m('div', {
                            class: css.card,
                        }, [
                            m('button', {
                                class: `${css.hollowButton} ${css.small}`,
                                onclick: () => {
                                    vnode.attrs.updateExercise(matchingExercise.exercise)
                                }
                            }, matchingExercise.exercise.name),
                            m('span', `from ${matchingExercise.workout.name}`),
                        ])
                    }))
                    : null,
            ]
        }
    }
}

export default (attrs: DropDownAttrs) => {
    return m(DropDownComponent, attrs)
}
