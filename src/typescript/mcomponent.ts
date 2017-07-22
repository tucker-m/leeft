import * as m from 'mithril';

// An MComponent is a function that takes in the attributes an an argument
// and returns a Mithril component.
interface MComponent {
    (attributes: object) : m.Vnode<object, object>;
};

export {MComponent};
