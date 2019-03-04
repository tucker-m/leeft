let roundButton = {
    padding: 0,
    boxSizing: 'border-box',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: '2px',
}

export default {
    setListContainer: {
	display: 'flex',
	flexDirection: 'column',
    },
    setBox: {
	display: 'flex',
	flexDirection: 'row',
	'&:not(:last-of-type)': {
	    marginBottom: '2rem',
	},
    },
    setCircleColumn: {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	marginRight: '1rem',
    },
    setInfoColumn: {
	display: 'flex',
	flexDirection: 'column',
    },
    infoRow: {
	display: 'flex',
	flexDirection: 'column',
	'&:not(:last-of-type)': {
	    marginBottom: '.75rem',
	},
    },
    infoRowTitle: {
	fontSize: '.9rem',
	fontStyle: 'italic',
	marginBottom: '.25rem',
    },
    infoRowInfo: {
	marginLeft: '.5rem',
    },
    setsAndReps: {
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'center',
    },
    setsAndRepsItem: {
	display: 'flex',
	flex: 1,
	'&:not(:last-of-type)': {
	    marginRight: '.5rem',
	},
	'& input[type=text]': {
	    minWidth: '3rem',
	    width: '3rem',
	    textAlign: 'center',
	},
    },
    insertNew: {
	display: 'flex',
	alignItems: 'center',
    },
    insertButton: Object.assign({
	borderColor: 'aqua',
	width: '2.2rem',
	height: '2.2rem',
    }, roundButton),
    setButton: Object.assign({
        backgroundColor: 'white',
        borderColor: 'blue',
        color: 'black',
	width: '3rem',
	height: '3rem',
    }, roundButton),
    activeSetButton: {
        extend: 'setButton',
        borderWidth: '6px',
        backgroundColor: 'black',
        borderColor: 'orange',
        color: 'white',
    }
}
