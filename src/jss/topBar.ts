import measurements from './variables/measurements'
import forms from './forms'

export default {
    topBar: {
	position: 'fixed',
	height: measurements.topBarHeight,
	width: '100%',
	maxWidth: '1000px',
	padding: '0 1rem',
	zIndex: '2',
	backgroundColor: 'white',
	boxSizing: 'border-box',
    },
    topBarH1: {
	marginRight: '0.5rem',
	color: '#444',
	fontSize: '1.7rem',
	fontWeight: 'normal',
	fontFamily: 'Fira Sans Extra Condensed, sans-serif',
    },
    topBarSubTitle: {
	display: 'flex',
	alignItems: 'center',
	fontFamily: 'Fira Sans Extra Condensed, sans-serif',
    },
    bottomButtons: {
	display: 'flex',
	alignItems: 'center',
    },
    topBarHeadingContainer: {
	display: 'flex',
	flex: 1,
	flexDirection: 'row',
	justifyContent: 'flex-end',
	alignItems: 'center',
    },
    topBarHeadingTitle: {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'flex-start',
    },
    topBarButton: Object.assign({
	marginTop: 0,
	marginBottom: 0,
    }, forms.small, forms.hollowButton),
    alignment: {
        display: 'flex',
	flexDirection: 'row',
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
