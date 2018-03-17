import * as m from 'mithril';
import {Saveable, Workout, SetUnits} from '../types/exercise';
import preventDefault from '../helpers/preventDefaultFunction';
import {IObservableObject} from 'mobx'
import db from '../helpers/db'
import style from '../../styles'
import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())
const {classes} = jss.createStyleSheet(style.main).attach()


interface WorkoutListAttrs {
    allWorkouts: Array<Workout & Saveable>,
};

interface WorkoutListVnode {
    attrs: WorkoutListAttrs
};

let WorkoutListComponent = function(vnode: WorkoutListVnode) {
    return {
        view: function(vnode: WorkoutListVnode) {
            let elements: Array<m.Vnode<{}, {}>> = [];
            if (vnode.attrs.allWorkouts.length == 0) {
                elements.push(m('p', 'You haven\'t created any workouts yet.'))
            }
            else {
                elements.push(m('ul', vnode.attrs.allWorkouts.map((workout) => {
                    return m('li', m('a', {
                        href: '/workouts/' + workout._id,
                        oncreate: m.route.link,
                    }, workout.name ? workout.name : 'Untitled Workout'))
                })));
            }

            return m('div', {
                class: classes.constraint,
            }, elements)
        }
    }
};

const WorkoutList = function(attrs: WorkoutListAttrs) {
    return m(WorkoutListComponent, attrs);
};

export default WorkoutList;
