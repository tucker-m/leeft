import * as m from 'mithril'
import H1 from './ui/h1'
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
		  ProgramList({allPrograms: vnode.attrs.allPrograms})),
            ]
	}
    }
}

export {
    component,
    attrs,
}
