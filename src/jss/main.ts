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
        }
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
    editable: {
        border: `.15rem dashed ${colors.editable}`,
    },
    editableH1: {
        display: 'inline',
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
        backgroundColor: 'rgba(255, 255, 255, .85)',
    },
    fullScreenOverlayContent: {
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        borderRadius: '3px',
        flexBasis: '35rem',
        border: `1px solid ${colors.editBorder}`,
        boxShadow: '0 2px 8px 2px rgba(0, 0, 0, .3)',
        backgroundColor: colors.editBorder,
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
        borderBottom: `1px solid ${colors.editBorder}`,
        height: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '1rem',
    },
    overlayResultsContainer: {
        flex: '1',
        overflowY: 'scroll',
    },
    overlayBottomBar: {
        padding: '.5rem 1.5rem',
        flexDirection: 'row',
    },
    horizontalWrapper: {
        flexDirection: 'row',
    },
}
