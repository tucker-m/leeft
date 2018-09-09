let roundButton = {
    padding: 0,
    boxSizing: 'border-box',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: '2px',
    '&:not(last-of-type)': {
	marginRight: '.5rem',
    },
}

export default {
    setRow: {
	display: 'flex',
	flexDirection: 'row',
    },
    insertNew: {
	display: 'flex',
	alignItems: 'center',
	marginLeft: '.5rem',
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
