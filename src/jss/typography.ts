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
	fontFamily: 'Fira Sans Extra Condensed',
        fontSize: '2.5rem',
    },
    h3: {
        fontSize: '1.5rem',
    },
    editableH1: {
        extend: 'h1',
        display: 'inline-flex',
        alignItems: 'center',
	'&>button': {
	    marginLeft: '.5rem',
	},
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
