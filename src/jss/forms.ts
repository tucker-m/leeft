import colors from './variables/colors'
import shared from './shared'

export default {
    label: {
        margin: '.25rem',
        color: '#7c7b7b',
        fontSize: '1rem',
    },
    textInput: {
        height: '35px',
        boxSizing: 'border-box',
        backgroundColor: 'white',
        border: '1px solid #999',
        padding: '.5rem .75rem',
        margin: '.25rem .5rem',
    },
    selectInput: {
        extend: 'textInput',
    },
    checkbox: {
        margin: '.25rem .5rem',
    },
    button: Object.assign({
        backgroundColor: colors.edit,
        color: 'white',
        padding: '.5rem .75rem',
	'&:not(:last-of-type)': {
	    marginRight: '0.5rem',
	},
    }, shared.clickable),
    hollowButton: {
        extend: 'button',
        backgroundColor: 'white',
        borderColor: colors.primary,
        color: colors.primary,
    },
    whiteHollowButton: {
	extend: 'button',
	backgroundColor: 'unset',
	borderColor: 'white',
	color: 'white',
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
    hollowSecondaryButton: {
	extend: 'button',
	backgroundColor: 'white',
	color: colors.secondary,
	borderColor: colors.secondary,
    },
    hollowDangerButton: {
        extend: 'button',
        backgroundColor: 'white',
        color: colors.danger,
        borderColor: colors.danger,
    },
    hollowEditButton: {
	extend: 'button',
	backgroundColor: 'white',
	color: colors.edit,
	borderColor: colors.edit,
    },
    small: {
        padding: '.25rem .5rem',
        fontSize: '.9rem',
    },
    formRow: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
