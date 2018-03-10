import * as m from 'mithril'
import style from '../../styles'
import jss from 'jss'
import preset from 'jss-preset-default'

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
            return m('div', {
                class: classes.main + ' ' + (editButtonAttr ? classes.editable : '') + ' ' + (editEnabled ? classes.beingEdited : ''),
            }, [
                m('div', {
                    class: classes.alignment + ' ' + main.constraint,
                }, [
                    m('a', {
                        href: '/',
                        oncreate: m.route.link,
                        class: classes.link,
                    }, 'Home'),
                    editButton
                ])
            ])
        }
    }
}

export default (attrs: TopBarAttrs) => {
    return m(TopBarComponent, attrs)
}
