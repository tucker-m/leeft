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
    title: {
	fontSize: '3rem',
	margin: '1rem',
	fontFamily: 'Fira Sans Extra Condensed',
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
