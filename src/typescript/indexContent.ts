import * as m from 'mithril'
import ProgramList from './programs/programList'
import {Program, Saved} from './types/exercise'
import {PageDefaultAttrs} from './ui/page'
import {TopBar} from './ui/topBar'
import db from './helpers/db'

interface attrs {
    allPrograms: Array<Program & Saved>,
}
interface IndexVnode {
    attrs: attrs & PageDefaultAttrs
}

const component: m.FactoryComponent<any> = (vnode: IndexVnode) => {

    return {
	view: (vnode: IndexVnode) => {
	    return [
		TopBar({
		    buttons: [{
			text: '+ New Program',
			action: () => {
			    db.promiseSaveableRecord<Program>({
				name: '',
				schedule: [],
				tag: 'program',
			    }).then((program) => {
				window.location.href = `#!/programs/${program._id}`
			    })
			}
		    }],
		    css: vnode.attrs.css,
		}),
		m('div', {class: vnode.attrs.css.content},
		  (vnode.attrs.allPrograms.length == 0)
		  ? m('p', "You haven't created any programs yet. Click 'New Program' at the top to create one.")
		  : ProgramList({allPrograms: vnode.attrs.allPrograms})
		 ),
            ]
	}
    }
}

export {
    component,
    attrs,
}
