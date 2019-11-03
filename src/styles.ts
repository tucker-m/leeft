import topBar from './jss/topBar'
import main from './jss/main'
import typography from './jss/typography'
import editTitleOverlay from './jss/overlays/editTitle'
import exercise from './jss/overlays/exercise'
import forms from './jss/forms'
import infoBox from './jss/infoBox/infoBox'
import workoutLogs from './jss/infoBox/workoutLogs'
import calendar from './jss/calendar'
import exerciseHistory from './jss/logs/exerciseHistory'
import logContents from './jss/logs/logContents'
import insertExerciseButton from './jss/ui/insertExerciseButton'
import workoutView from './jss/workouts/view'
import setOverlay from './jss/overlays/exercise/set'
import index from './jss/index'
import workoutList from './jss/workouts/list'

export default {
    ...main,
    ...topBar,
    ...infoBox,
    ...workoutLogs,
    ...typography,
    ...editTitleOverlay,
    ...forms,
    ...exercise,
    ...calendar,
    ...exerciseHistory,
    ...logContents,
    ...insertExerciseButton,
    ...workoutView,
    ...setOverlay,
    ...index,
    ...workoutList,
}
