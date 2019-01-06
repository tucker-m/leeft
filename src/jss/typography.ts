import colors from './variables/colors'

export default {
    a: {
        color: colors.primary,
    },
    aSecondary: {
	color: colors.tertiary,
    },
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
    placeholderEditableH1: {
        extend: 'editableH1',
        color: '#969696',
        fontStyle: 'italic',
    },
    itemTitle: {
        fontSize: '1.5rem',
    },
    untitled: {
	fontStyle: 'italic',
	opacity: 0.6,
    },
    empty: {
        color: 'rgba(34, 34, 26, .6)',
        fontStyle: 'italic',
    },
}
