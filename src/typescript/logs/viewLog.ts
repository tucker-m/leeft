import * as m from 'mithril'
import { Exercise, WorkoutLog, Puttable, SetLogViewModel, GroupedSetLogVm } from '../types/exercise'
import db from '../helpers/db'
import preventDefault from '../helpers/preventDefaultFunction'
import {RenderPage} from '../ui/page'
import H1 from '../ui/h1'
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
            prescriptions: [],
            tag: 'workout',
        },
        sets: [],
        date: 0,
        comments: '',
        tag: 'workoutlog',
        _id: '',
    }

    let pageEditable = (!!vnode.attrs.edit && vnode.attrs.edit == 'edit')

    db.fetchSaveableRecord<WorkoutLog>(vnode.attrs.id).then((logResult) => {
	log = logResult
        m.redraw()
    })
    return {
        view: (vnode: ViewLogVnode) => {

            return m('div', [
                RenderPage({
		    pageEditable,
		    // topBarButtons: [
                    //     {
                    //         text: 'Make Changes',
                    //         action: () => {
                    //             pageEditable = !pageEditable
                    //         }
                    //     },
                    //     {
                    //         text: 'Delete this log',
                    //         action: () => {
                    //             db.deleteSaveableRecord(log)
                    //             window.location.href = `#!/`
                    //         }
                    //     }
                    // ],
                    contents: {
			component: LogContent.component,
			attrs: {
			    log: log
			}
		    }
                })
            ])
        }
    }
}
