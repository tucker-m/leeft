import * as m from 'mithril'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../../styles'
import utils from '../helpers/utils'
import H1 from './h1'

interface EditableVnode {
    attrs: {
        name: string,
        placeholder: string,
        updateFunc: (newName: string) => void,
        showEditButton: boolean,
    }
}

jss.setup(preset())
const {classes} = jss.createStyleSheet(style.typography).attach()

const EditableH1 = function(vnode: EditableVnode) {
    let beingEdited = false
    return {
        view: function(vnode: EditableVnode) {
            let name = vnode.attrs.name
            let className = classes.editableH1
            if (!name) {
                name = vnode.attrs.placeholder
                className = classes.placeholderEditableH1
            }
            return m('div.editable-h1', {
                class: utils.combineStyles([
                    beingEdited ? 'being-edited' : '',
                    vnode.attrs.showEditButton ? 'editable-showing' : '',
                ])
            }, [
                !beingEdited ?
                    m('div', [
                        H1({text: name, classes: [className]}),
                        vnode.attrs.showEditButton
                            ? m('button', {
                                onclick: () => { beingEdited = true }
                            }, 'Edit')
                        : null
                    ])
                : m('div', [
                    m('input[type=text]', {
                        value: vnode.attrs.name,
                        onchange: m.withAttr('value', vnode.attrs.updateFunc),
                    }),
                    vnode.attrs.showEditButton
                        ? m('button', {
                            onclick: () => { beingEdited = false }
                        }, 'Done')
                    : null
                ])
            ])
        }
    }
}

export default function(attrs: EditableVnode['attrs']) {
    return m(EditableH1, attrs)
}
