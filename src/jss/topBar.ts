import measurements from './variables/measurements'

export default {
    main: {
        padding: '.5rem',
        marginBottom: '1rem',
    },
    topBar: {
	position: 'fixed',
	height: measurements.topBarHeight,
	width: '100%',
	maxWidth: '1000px',
	padding: '1rem',
	zIndex: '2',
	backgroundColor: 'white',
	boxSizing: 'border-box',
	boxShadow: '0 0 5px 5px rgba(0, 0, 0, .3)',
    },
    topBarH1: {
	color: '#444',
	fontSize: '1.7rem',
	fontWeight: 'normal',
	fontFamily: 'Fira Sans Extra Condensed, sans-serif',
    },
    topBarHeadingContainer: {
	display: 'flex',
	flex: '1',
	flexDirection: 'column',
	alignItems: 'flex-start',
    },
    alignment: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerSection: {
        textAlign: 'center',
        padding: '1.5rem',
    },
    button: {
        '&:not(:last-of-type)': {
            marginRight: '1rem',
        }
    },
}
