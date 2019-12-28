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
	color: '#1B1F1D',
    },
    frontPageRowSubtext: {
	fontFamily: 'Fira Sans Extra Condensed',
	fontSize: '1.3rem',
	color: '#4b3c59',
	marginLeft: '.1rem',
    },
    headingLinks: {
	display: 'flex',
	marginTop: '1.5rem',
	marginBottom: '1.5rem',
    },
    headingLink: {
	fontFamily: 'Fira Sans Extra Condensed',
	fontSize: '1.2rem',
	color: '#A19AD9',
	'&:not(:last-of-type)': {
	    marginRight: '2rem',
	}
    },
    headingLinkCurrent: {
	extend: 'headingLink',
	color: '#1B1F1D',
    }
}
