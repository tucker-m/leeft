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
	padding: '1rem',
	'&:nth-of-type(2n)': {
	    backgroundColor: colors.accentBackground,
	},
    },
    numberColumn: {
	display: 'flex',
	boxSizing: 'border-box',
	justifyContent: 'center',
	alignItems: 'center',
	fontSize: '1rem',
	fontWeight: 'bold',
	width: '2.5rem',
	height: '2.5rem',
	border: `3px solid ${colors.four}`,
	color: colors.four,
	borderRadius: '1.75rem',
	marginRight: '1rem',
    },
    descriptionColumn: {
	display: 'flex',
	flexDirection: 'column',
    },
    workoutTitle: {
	fontSize: '1.4rem',
    },
    workoutDescription: {
	display: 'flex',
	flex: 1,
	alignItems: 'center',
    },
    lastWorkout: {
	fontSize: '1rem',
    },
    dateLink: {
	color: colors.secondary,
    },
}
