import * as m from 'mithril'
import {Set, SetGroup, Workout} from '../../../../../types/exercise'

interface DropDownAttrs {
    css: any,
    updateExercise: (name: string) => void,
    matchingExercises: string[],
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
                        m('p', {class: css.searchResultsMessage}, [
			    `Matching exercises (${matchingExercises.length}) `,

			    matchingExercises.length > 1 ?
				m('a', {
				    class: css.a,
				    onclick: () => {
					vnode.attrs.setResultsShowing(!resultsShowing)
				    }
				}, resultsShowing ?
				  'hide'
				  : `show others`)
				: null,
			]),
		    ]),
                    m('div', {
                        class: css.overlayResultsContainer
		    }, resultsShowing
		      ? matchingExercises.map((matchingExercise) => {
                          return m('div', {
			      class: css.result,
			  }, [
			      m('a', {
				  class: css.resultLink,
                                  onclick: () => {
				      vnode.attrs.updateExercise(matchingExercise)
                                  }
			      }, matchingExercise),
                          ])
		      })
		      : m('div', {class: css.result}, [
			  m('a', {
			      class: css.resultLink,
                              onclick: () => {
				  vnode.attrs.updateExercise(matchingExercises[0])
                              }
			  }, matchingExercises[0]),
		      ]),
		     )
                ]),
            ]
        }
    }
}

export default (attrs: DropDownAttrs) => {
    return m(DropDownComponent, attrs)
}
