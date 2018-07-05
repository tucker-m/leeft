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
    fullScreenOverlay: {
        backgroundColor: 'rgba(0, 0, 0, .9)',
        color: 'white',
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        padding: '1rem',
    },
    fullScreenOverlayContent: {
        maxWidth: '30rem',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}
