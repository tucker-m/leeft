import colors from './variables/colors'

export default {
    calendar: {
	display: 'flex',
	flexWrap: 'wrap',
    },
    calendarSquare: {
	display: 'flex',
	flex: '1 1 100%',
	boxSizing: 'border-box',
	padding: '2rem',
	backgroundColor: colors.four,
	color: colors.accentBackground,
	'&:nth-of-type(2n)': {
	    backgroundColor: colors.accentBackground,
	    color: colors.four,
	    '& $numberColumn': {
		borderColor: colors.four,
	    },
	},
    },
    numberColumn: {
	display: 'flex',
	boxSizing: 'border-box',
	justifyContent: 'center',
	alignItems: 'center',
	fontSize: '2rem',
	width: '3rem',
	height: '3rem',
	border: `3px solid ${colors.accentBackground}`,
	borderRadius: '1.5rem',
	marginRight: '2rem',
    },
    descriptionColumn: {
	display: 'flex',
	flexDirection: 'column',
    },
    workoutTitle: {
	fontSize: '2.5rem',
    },
    workoutDescription: {
	display: 'flex',
	flex: 1,
	alignItems: 'center',
    },
}
