export default {
    h1: {
        display: 'inline-block',
        fontSize: '2.5rem',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    h3: {
        fontSize: '1.5rem',
    },
    editableH1: {
        extend: 'h1',
        display: 'inline-flex',
        alignItems: 'center',
    },
    arrow: {
        fontSize: '2.5rem',
        margin: '0 1rem',
    },
    placeholderEditableH1: {
        extend: 'editableH1',
        color: '#969696',
        fontStyle: 'italic',
    },
    itemTitle: {
        fontSize: '1.5rem',
    },
    workoutNameInProgram: {
        fontSize: '1.3rem',
    },
    exerciseNamesInProgram: {
        paddingLeft: '1rem',
    },
    empty: {
        color: 'rgba(34, 34, 26, .6)',
        fontStyle: 'italic',
    },
}
