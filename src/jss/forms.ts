import colors from './variables/colors'

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
    button: {
	fontFamily: 'Fira Sans Extra Condensed',
	fontWeight: 'bold',
	fontSize: '1rem',
	borderColor: 'transparent',
	borderRadius: '20px',
        backgroundColor: '#714AD4',
        color: 'white',
        padding: '.5rem .75rem',
    },
    hollowButton: {
        extend: 'button',
        backgroundColor: 'white',
        borderColor: '#714AD4',
        color: '#714AD4',
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
