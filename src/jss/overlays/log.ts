import colors from '../variables/colors'

let roundButton = {
    padding: 0,
    boxSizing: 'border-box',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: '1px',
}

export default {
    setListContainer: {
	display: 'flex',
	flexDirection: 'column',
    },
    setWrapper: {
	'&:not(:last-of-type)': {
	    marginBottom: '1rem',
	},
    },
    setBox: {
	display: 'flex',
	flexDirection: 'row',
    },
    setCircleColumn: {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	justifyContent: 'space-between',
	marginRight: '1rem',
    },
    setInfoColumn: {
	display: 'flex',
	flexDirection: 'column',
    },
    insertButtonRow: {
	marginTop: '1rem',
    },
    deleteButtonColumn: {
	display: 'flex',
	flex: '1',
	alignItems: 'flex-start',
	justifyContent: 'flex-end',
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
    },
    setsAndRepsGrouper: {
	display: 'flex',
	alignItems: 'center',
    },
    setsAndRepsItem: {
	marginRight: '.5rem',
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
	borderColor: colors.secondary,
	width: '2.2rem',
	height: '2.2rem',
    }, roundButton),
    setButton: Object.assign({
        backgroundColor: 'white',
        borderColor: colors.primary,
        color: colors.primary,
	fontSize: '1.5rem',
	width: '3rem',
	height: '3rem',
    }, roundButton),
    activeSetButton: {
        extend: 'setButton',
        backgroundColor: colors.primary,
        color: 'white',
    }
}
