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
            _id: '',
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

    db.fetchSaveableRecord<WorkoutLog>(vnode.attrs.id).then((logResult) => {
	log = logResult
        m.redraw()
    })
    return {
	onbeforeupdate: (vnode: ViewLogVnode) => {
	    if (log._id != vnode.attrs.id) {
		db.fetchSaveableRecord<WorkoutLog>(vnode.attrs.id).then(result => {
		    log = result
		    m.redraw()
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
			    log: log,
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
