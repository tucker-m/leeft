import colors from './variables/colors'

export default {
    label: {
        margin: '.25rem',
    },
    textInput: {
        border: '1px solid #999',
        borderRadius: '3px',
        boxShadow: '0 0 3px rgba(0, 0, 0, .3) inset',
        padding: '.5rem .75rem',
        margin: '.25rem .5rem',
    },
    button: {
        border: `1px solid ${colors.editBorder}`,
        borderRadius: '3px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, .3)',
        backgroundColor: colors.editBorder,
        color: 'white',
        padding: '.5rem .75rem',
        margin: '.25rem .5rem',
    },
    hollowButton: {
        extend: 'button',
        backgroundColor: 'white',
        borderColor: colors.editBorder,
        color: colors.editBorder,
    },
    formRow: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        alignContent: 'stretch',
        marginLeft: '-.5rem',
    },
    labelOnTopGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
}
