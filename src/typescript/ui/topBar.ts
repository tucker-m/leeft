import * as m from 'mithril'
import style from '../../styles'
import jss from 'jss'
import preset from 'jss-preset-default'
import utils from '../helpers/utils'

interface TopBarAttrs {
    editButton?: {
        buttonText: string,
        changeEditMode: (on: boolean) => void,
    }
}

interface TopBarVnode {
    attrs: TopBarAttrs,
}

jss.setup(preset())
const {classes} = jss.createStyleSheet(style.topBar).attach()
const {classes: main} = jss.createStyleSheet(style.main).attach()

const TopBarComponent = (vnode: TopBarVnode) => {
    let editEnabled = false

    return {
        view: (vnode: TopBarVnode) => {
            let editButton = m('div')
            const editButtonAttr = vnode.attrs.editButton
            if (editButtonAttr) {
                editButton = m('button', {
                    onclick: () => {
                        editEnabled = !editEnabled
                        editButtonAttr.changeEditMode(editEnabled)
                    }
                }, editEnabled ? 'Done Editing' : `Edit ${editButtonAttr.buttonText}`)
            }
            return m('div', [
                m('div', {
                    class: classes.headerSection,
                }, m('a', {
                    href: '/',
                    oncreate: m.route.link,
                }, 'Home')),
                m('div', {
                    class: utils.combineStyles([
                        classes.alignment,
                        classes.main,
                        (editButtonAttr ? classes.editable : ''),
                        (editEnabled ? classes.beingEdited : ''),
                    ]),
                }, m('div', {
                    class: main.constraint,
                }, [
                    editButton
                ]))
            ])
        }
    }
}

export default (attrs: TopBarAttrs) => {
    return m(TopBarComponent, attrs)
}
