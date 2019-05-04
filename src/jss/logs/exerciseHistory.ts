import colors from '../variables/colors'

export default {
    historyContainer: {
	display: 'flex',
	overflowX: 'scroll',
    },
    historyLog: {
	display: 'flex',
	flexDirection: 'column',
	flexBasis: '9rem',
	flexShrink: 0,
	'&:not(:last-of-type)': {
	    marginRight: '1rem',
	},
    },
    historyLogHeading: {
	display: 'flex',
	backgroundColor: colors.accentBackground,
	padding: '.25rem',
    },
    historyLogBody: {
	display: 'flex',
	flex: 1,
    },
    historyTable: {
	width: '100%',
    },
    historyTableRow: {
	textAlign: 'right',
    },
    historyTableCell: {
	paddingBottom: '.5rem',
	borderBottom: '1px solid #ddd',
	'&:not(:first-of-type)': {
	    paddingTop: '.5rem',
	},
    },
}
