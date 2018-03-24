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
    },
    tr: {
        '&:nth-of-type(2)': {
            background: '#efefef',
        }
    },
    td: {
        padding: '0.5rem',
        '&:not(:last-of-type)': {
            paddingRight: '1.5rem',
        }
    },
    workoutList: {
        '&:not(:last-of-type)': {
            marginBottom: '1.7rem',
        },
    },
    workoutListExercises: {
        fontSize: '1.1rem',
    },
    noExercises: {
        color: '#969696',
        fontStyle: 'italic',
    },
    editable: {
        border: '.15rem dashed #1d70d6',
        padding: '.5rem',
        marginTop: '-.65rem',
        marginBottom: '-.65rem',
    }
}
