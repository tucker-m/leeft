import * as m from 'mithril'
import { Exercise, WorkoutLog, Puttable, SetLogViewModel} from '../types/exercise'
import db from '../helpers/db'
import preventDefault from '../helpers/preventDefaultFunction'
import {RenderPage} from '../ui/page'
import * as LogContent from './logContents'

interface ViewLogAttrs {
    id: string,
    edit?: string,
}
interface ViewLogVnode {
    attrs: ViewLogAttrs
}

export default (vnode: ViewLogVnode) => {

    let log: WorkoutLog & Puttable = {
        workout: {
            name: '',
	    identifier: Date.now().toString(),
            prescriptions: [],
            tag: 'workout',
        },
        sets: [],
        date: 0,
        comments: '',
        tag: 'workoutlog',
        _id: '',
    }
    let programUrl = ''

    db.fetchSaveableRecord<WorkoutLog>(vnode.attrs.id).then((logResult) => {
	log = logResult
	db.findWorkoutUrlByWorkoutIdentifier(log.workout.identifier).then(url => {
	    programUrl = url
	    m.redraw()
	})
    })
    return {
	onbeforeupdate: (vnode: ViewLogVnode) => {
	    if (log._id != vnode.attrs.id) {
		db.fetchSaveableRecord<WorkoutLog>(vnode.attrs.id).then(result => {
		    log = result
		    db.findWorkoutUrlByWorkoutIdentifier(log.workout.identifier).then(url => {
			programUrl = url
			m.redraw()
		    })
		})
	    }
	},
        view: (vnode: ViewLogVnode) => {

            return m('div', [
                RenderPage({
		    pageEditable: true,
		    contents: {
			component: LogContent.component,
			attrs: {
			    log,
			    programUrl,
			    updateLog: (viewModels: Array<SetLogViewModel>) => {
				log.sets = viewModels
			    },
			}
		    }
                })
            ])
        }
    }
}
