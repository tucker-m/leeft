import colors from './variables/colors'

export default {
    a: {
        color: colors.primary,
    },
    aSecondary: {
	color: colors.tertiary,
    },
    h1: {
	fontFamily: 'Fira Sans Extra Condensed',
        fontSize: '2.5rem',
    },
    h2: {
	fontSize: '2rem',
	fontFamily: 'Fira Sans Extra Condensed',
    },
    h3: {
        fontSize: '1.5rem',
	fontFamily: 'Fira Sans Extra Condensed',
    },
    editableHeading: {
        display: 'inline-flex',
        alignItems: 'center',
	'&>button': {
	    marginLeft: '.5rem',
	},
    },
    placeholderHeading: {
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
