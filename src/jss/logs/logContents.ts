import colors from '../variables/colors'

export default {
    exerciseLogContainer: {
	borderLeft: `.25rem solid ${colors.secondary}`,
	paddingLeft: '1rem',
	marginBottom: '1rem',
	'& li:not(:last-of-type)': {
	    marginBottom: '.75rem',
	},
    },
    goalList: {
	listStyle: 'disc inside',
	marginLeft: '1rem',
    },
    goalItem: {
	fontStyle: 'italic',
	opacity: '0.6',
    },
}
