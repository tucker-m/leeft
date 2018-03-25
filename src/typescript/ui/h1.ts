import * as m from 'mithril';
import jss from 'jss'
import preset from 'jss-preset-default'
import styles from '../../styles'
import utils from '../helpers/utils'

jss.setup(preset())
const {classes} = jss.createStyleSheet(styles.typography).attach()

interface H1Attrs {
    text: string,
    classes?: Array<string>,
}
interface H1Vnode {
    attrs: H1Attrs
}

const H1 = (vnode: H1Vnode) => {
    return {
        view: (vnode: H1Vnode) => {
            let allClasses = vnode.attrs.classes || []
            allClasses.push(classes.h1)

            return m('h1', {
                class: utils.combineStyles(allClasses)
            }, vnode.attrs.text)
        }
    }
}

export default (attrs: H1Attrs) => {
    return m(H1, attrs)
}
