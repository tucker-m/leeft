import colors from './variables/colors'
import measurements from './variables/measurements'

export default {
    constraint: {
        maxWidth: '1000px',
        flexBasis: '1000px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    content: {
	paddingTop: measurements.topBarHeight,
    },
    table: {
        width: '100%',
    },
    workoutTable: {
	margin: '1rem 0',
    },
    tr: {
        '&:nth-of-type(2n)': {
            background: colors.accentBackground,
        },
    },
    td: {
        padding: '0.5rem',
        '&:not(:last-of-type)': {
            paddingRight: '1.5rem',
        },
    },
    workoutRowActions: {
	textAlign: 'right',
    },
    workoutList: {
        '&:not(:last-of-type)': {
            marginBottom: '1.7rem',
        },
    },
    workoutListExercises: {
        fontSize: '1.1rem',
    },
    pageTitle: {
	margin: '.5rem 1rem',
    },
    fullScreenOverlay: {
        position: 'fixed',
	zIndex: 3,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        padding: '1rem',
        backgroundColor: 'rgba(0, 0, 0, .3)',
    },
    fullScreenOverlayContent: {
        display: 'flex',
        maxHeight: '100%',
        flexDirection: 'column',
        background: 'white',
        borderRadius: '3px',
        flexBasis: '35rem',
        border: `1px solid ${colors.primary}`,
        boxShadow: '0 2px 8px 2px rgba(0, 0, 0, .3)',
        backgroundColor: colors.edit,
        overflow: 'hidden',
    },
    overlayContentContainer: {
        backgroundColor: 'white',
        padding: '1rem',
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        overflowY: 'scroll',
    },
    overlayTitleBar: {
        backgroundColor: 'white',
        borderBottom: `1px solid ${colors.primary}`,
        height: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '1rem',
    },
    overlayTitle: {
        fontSize: '1.2rem',
        margin: '.5rem 0',
        color: colors.primary,
    },
    overlayBottomBar: {
        padding: '.5rem 1.5rem',
        flexDirection: 'row',
    },
}
