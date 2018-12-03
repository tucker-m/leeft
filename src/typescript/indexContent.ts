import * as m from 'mithril'
import H1 from './ui/h1'
import ProgramList from './programs/programList'
import {Program} from './types/exercise'

interface attrs {
    allPrograms: Array<Program>,
}
interface IndexVnode {
    attrs
}

const component: m.FactoryComponent<any> = (vnode: IndexVnode) => {

    return {
	view: (vnode: IndexVnode) => {
	    return [
		H1({text: 'All Programs'}),
		ProgramList({allPrograms: vnode.attrs.allPrograms}),
            ]
	}
    }
}

export {
    component,
    attrs,
}
