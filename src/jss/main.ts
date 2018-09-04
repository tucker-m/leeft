import colors from './variables/colors'

export default {
    constraint: {
        maxWidth: '1000px',
        flexBasis: '1000px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '0 1.5rem',
    },
    table: {
        marginTop: '1rem',
        marginBottom: '1rem',
        width: '100%',
    },
    tr: {
        '&:nth-of-type(2n)': {
            background: '#efefef',
        },
    },
    td: {
        padding: '0.5rem',
        '&:not(:last-of-type)': {
            paddingRight: '1.5rem',
        },
    },
    workoutList: {
        '&:not(:last-of-type)': {
            marginBottom: '1.7rem',
        },
    },
    workoutListExercises: {
        fontSize: '1.1rem',
    },
    fullScreenOverlay: {
        position: 'fixed',
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
        border: `1px solid ${colors.edit}`,
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
        overflow: 'hidden',
    },
    overlayTitleBar: {
        backgroundColor: 'white',
        borderBottom: `1px solid ${colors.edit}`,
        height: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '1rem',
    },
    overlayTitle: {
        fontSize: '1.2rem',
        margin: '.5rem 0',
        color: colors.edit,
    },
    overlayResultsContainer: {
        flex: '1',
        overflowY: 'scroll',
    },
    overlayBottomBar: {
        padding: '.5rem 1.5rem',
        flexDirection: 'row',
    },
}
