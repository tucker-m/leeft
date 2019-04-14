import * as m from 'mithril';
import u from '../helpers/utils'

interface H1Attrs {
    level: number,
    text: string,
    css: any,
    classes?: Array<string>,
}
interface H1Vnode {
    attrs: H1Attrs
}

const H1 = (vnode: H1Vnode) => {
    return {
        view: (vnode: H1Vnode) => {
            let allClasses = vnode.attrs.classes || []
            //allClasses.push(vnode.attrs.css.h1)
	    const headingLevel = 'h' + vnode.attrs.level
            return m(headingLevel, {
                class: u.c(...allClasses, vnode.attrs.css[headingLevel])
            }, vnode.attrs.text)
        }
    }
}

export default (attrs: H1Attrs) => {
    return m(H1, attrs)
}
