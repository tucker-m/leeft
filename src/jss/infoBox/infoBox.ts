import colors from '../variables/colors'

export default {
    infoBox: {
	padding: '2rem 1rem',
	backgroundColor: colors.primary,
	color: 'white',
	'&>div:not(:last-of-type)': {
	    marginBottom: '1rem',
	},
    },
    infoBoxText: {
	marginBottom: '1.5rem',
    },
    infoBoxButtons: {
	display: 'flex',
	justifyContent: 'center',
    },
}
