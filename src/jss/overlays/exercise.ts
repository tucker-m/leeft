import colors from '../variables/colors'

export default {
    searchResults: {
        display: 'flex',
	marginLeft: '1rem',
	flexDirection: 'column',
	alignItems: 'stretch',
    },
    result: {
	'&:not(:last-of-type)': {
	    marginBottom: '.75rem',
	},
	display: 'flex',
	alignItems: 'center',
    },
    resultLink: {
	color: colors.edit,
    },
    unitTag: {
        color: '#444',
        padding: '.1rem .25rem',
	margin: '0 .5rem',
        fontSize: '.85rem',
    },
    reps: {
	background: colors.accentBackground,
	border: `3px solid ${colors.accentBackground}`,
    },
    seconds: {
	background: 'white',
	border: `3px solid ${colors.accentBackground}`,
    },
    searchResultsMessage: {
	flex: 1,
	color: '#7c7b7b',
	fontSize: '1rem',
    },
    resultDescription: {
	display: 'flex',
	flexDirection: 'row',
	marginBottom: '.25rem',
    },
    overlayResultsContainer: {
        flex: '1',
        overflowY: 'scroll',
	maxHeight: '100px', // will show scrollbar beyond this
    },
}
