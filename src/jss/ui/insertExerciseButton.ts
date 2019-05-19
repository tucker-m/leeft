import colors from '../variables/colors'

export default {
    insertExerciseButtonContainer: {
	display: 'inline-flex',
	alignItems: 'center',
	marginLeft: '-1.375rem',
	cursor: 'default',
	'&:hover $roundButton': {
	    backgroundColor: colors.primary,
	    color: 'white',
	},
    },
    roundButton: {
	height: '3rem',
	width: '3rem',
	borderRadius: '1.5rem',
	border: `1px solid ${colors.primary}`,
	backgroundColor: 'white',
	marginRight: '.5rem',
	color: colors.primary,
	fontSize: '2rem',
    },
    linkText: {
	color: colors.primary,
    }
}
