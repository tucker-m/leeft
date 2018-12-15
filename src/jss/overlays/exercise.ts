import colors from '../variables/colors'

export default {
    searchResults: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    searchResultsMessage: {
	color: '#7c7b7b',
	fontSize: '1rem',
    },
    resultDescription: {
        flex: '1',
        marginLeft: '.5rem',
    },
    bottomButtons: {
        display: 'flex',
        justifyContent: 'flex-end',
        borderTop: `1px solid ${colors.edit}`,
        paddingTop: '.5rem',
    }
}
