import colors from '../variables/colors'

export default {
    searchResults: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
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
