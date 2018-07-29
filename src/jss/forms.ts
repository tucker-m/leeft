import colors from './variables/colors'

export default {
    label: {
        margin: '.25rem',
        color: '#666',
        fontFamily: 'sans-serif',
        fontSize: '.85rem',
    },
    textInput: {
        height: '35px',
        boxSizing: 'border-box',
        backgroundColor: 'white',
        border: '1px solid #999',
        borderRadius: '3px',
        boxShadow: '0 0 3px rgba(0, 0, 0, .3) inset',
        padding: '.5rem .75rem',
        margin: '.25rem .5rem',
    },
    selectInput: {
        extend: 'textInput',
    },
    button: {
        border: `1px solid ${colors.edit}`,
        borderRadius: '3px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, .3)',
        backgroundColor: colors.edit,
        color: 'white',
        padding: '.5rem .75rem',
        margin: '.25rem .5rem',
    },
    hollowButton: {
        extend: 'button',
        backgroundColor: 'white',
        borderColor: colors.edit,
        color: colors.edit,
    },
    neutralButton: {
        extend: 'button',
        backgroundColor: '#f7f7f7',
        borderColor: '#d3d3d3',
        color: 'black',
    },
    dangerButton: {
        extend: 'button',
        backgroundColor: colors.danger,
        color: 'white',
        borderColor: colors.danger,
    },
    hollowDangerButton: {
        extend: 'button',
        backgroundColor: 'white',
        color: colors.danger,
        borderColor: colors.danger,
    },
    small: {
        padding: '.25rem .5rem',
        fontSize: '.9rem',
    },
    formRow: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        alignContent: 'stretch',
        marginLeft: '-.5rem',
    },
    labelGroup: {
        marginBottom: '1rem',
    },
    labelOnTopGroup: {
        extend: 'labelGroup',
        display: 'flex',
        flexDirection: 'column',
    },
    labelOnLeftGroup: {
        extend: 'labelGroup',
    },
}
