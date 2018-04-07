import * as m from 'mithril';
import utils from '../helpers/utils'

interface H1Attrs {
    text: string,
    classes?: Array<string>,
    css: any,
}
interface H1Vnode {
    attrs: H1Attrs
}

const H1 = (vnode: H1Vnode) => {
    return {
        view: (vnode: H1Vnode) => {
            let allClasses = vnode.attrs.classes || []
            allClasses.push(vnode.attrs.css.h1)

            return m('h1', {
                class: utils.combineStyles(allClasses)
            }, vnode.attrs.text)
        }
    }
}

export default (attrs: H1Attrs) => {
    return m(H1, attrs)
}
