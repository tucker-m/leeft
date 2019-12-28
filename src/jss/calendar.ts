import colors from './variables/colors'

export default {
    calendar: {
	display: 'flex',
	flexWrap: 'wrap',
	marginTop: '.5rem',
    },
    addWorkoutContainer: {
	margin: '.5rem 0 1rem',
    },
    calendarSquare: {
	display: 'flex',
	flex: '1 1 100%',
	boxSizing: 'border-box',
	marginTop: '1rem',
	'&:nth-of-type(2n)': {
	    backgroundColor: colors.accentBackground,
	},
    },
    numberColumn: {
	display: 'flex',
	flexShrink: 0,
	boxSizing: 'border-box',
	justifyContent: 'center',
	alignItems: 'center',
	fontSize: '1rem',
	fontWeight: 'bold',
	width: '2.5rem',
	height: '2.5rem',
	border: `3px solid #466BEB`,
	color: '#466BEB',
	borderRadius: '1.75rem',
	marginRight: '1rem',
	marginBottom: '1rem',
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
