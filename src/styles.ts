import topBar from './jss/topBar'
import main from './jss/main'
import typography from './jss/typography'
import editTitleOverlay from './jss/overlays/editTitle'
import exercise from './jss/overlays/exercise'
import logs from './jss/overlays/log'
import forms from './jss/forms'

export default {
    ...main,
    ...topBar,
    ...typography,
    ...editTitleOverlay,
    ...forms,
    ...exercise,
    ...logs,
}
