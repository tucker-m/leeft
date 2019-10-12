export default {
    frontPageGroup: {
	'&:not(:last-child)': {
	    marginBottom: '2rem',
	},
    },
    frontPageRow: {
	display: 'flex',
	alignItems: 'center',
	flexWrap: 'wrap',
	'& > *:not(:last-child)': {
	    marginRight: '1rem',
	},
    },
    frontPageRowButtons: {
	display: 'flex',
	alignItems: 'center',
	'& > *:not(:last-child)': {
	    marginRight: '1rem',
	}
    },
    frontPageHeading: {
	fontWeight: 'bold',
	color: '#4b3c59',
    },
    frontPageRowSubtext: {
	fontFamily: 'Fira Sans Extra Condensed',
	fontSize: '1.3rem',
	color: '#4b3c59',
	marginLeft: '.1rem',
    },
}
