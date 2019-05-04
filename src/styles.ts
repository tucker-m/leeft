import topBar from './jss/topBar'
import main from './jss/main'
import typography from './jss/typography'
import editTitleOverlay from './jss/overlays/editTitle'
import exercise from './jss/overlays/exercise'
import logs from './jss/overlays/log'
import forms from './jss/forms'
import infoBox from './jss/infoBox/infoBox'
import workoutLogs from './jss/infoBox/workoutLogs'
import calendar from './jss/calendar'
import exerciseHistory from './jss/logs/exerciseHistory'
import logContents from './jss/logs/logContents'

export default {
    ...main,
    ...topBar,
    ...infoBox,
    ...workoutLogs,
    ...typography,
    ...editTitleOverlay,
    ...forms,
    ...exercise,
    ...logs,
    ...calendar,
    ...exerciseHistory,
    ...logContents,
}
