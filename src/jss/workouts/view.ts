import colors from '../variables/colors'

export default {
    exerciseGroup: {
	marginBottom: '1.5rem',
    },
    exerciseHeadingRow: {
	display: 'flex',
	alignItems: 'center',
	marginBottom: '1rem',
    },
    exerciseName: {
	fontSize: '1.5rem',
	fontFamily: 'Fira Sans Light',
	marginRight: '.5rem',
    },
    arrowBtn: {
	boxSizing: 'border-box',
	width: '1rem',
	height: '1rem',
	display: 'inline-block',
	backgroundPosition: 'center',
	backgroundSize: 'cover',
	backgroundColor: 'transparent',
	border: 'none',
    },
    upDownBtnGroup: {
	width: '3rem',
	marginRight: '1rem',
    },
    upBtn: {
	extend: 'arrowBtn',
	backgroundImage: 'url("./chevron-up-solid.svg")',
    },
    downBtn: {
	extend: 'arrowBtn',
	backgroundImage: 'url("./chevron-down-solid.svg")',
    },
    upBtnLarge: {
	extend: 'upBtn',
	marginRight: '1rem',
    },
    downBtnLarge: {
	extend: 'downBtn',
	marginRight: '1rem',
    },
    upBtnSmall: {
	extend: 'upBtn',
	float: 'left',
	width: '1rem',
	height: '1rem',
    },
    downBtnSmall: {
	extend: 'downBtn',
	float: 'right',
	width: '1rem',
	height: '1rem',
    },
    exerciseSets: {
	marginLeft: '1.5rem',
    },
    setUl: {
	marginBottom: '1rem',
    },
    setLi: {
	display: 'flex',
	alignItems: 'center',
	marginBottom: '1rem',
    },
    setCircle: {
	boxSizing: 'border-box',
	width: '1.5rem',
	height: '1.5rem',
	fontSize: '.8rem',
	display: 'inline-flex',
	borderRadius: '.75rem',
	borderWidth: '2px',
	borderStyle: 'solid',
	justifyContent: 'center',
	alignItems: 'center',
	marginRight: '1rem',
    },
    setNumber: {
	extend: 'setCircle',
	color: colors.primary,
	borderColor: colors.primary,
    },
    setDone: {
	extend: 'setCircle',
	color: 'white',
	background: colors.secondary,
	borderColor: colors.secondary,
    },
    pill: {
	display: 'inline-flex',
	alignItems: 'center',
	boxSizing: 'border-box',
	height: '1.5rem',
	borderWidth: '1px',
	borderStyle: 'solid',
	borderRadius: '.75rem',
	fontSize: '.9rem',
	paddingLeft: '.5rem',
	paddingRight: '.5rem',
	marginRight: '1rem',
    },
    repPill: {
	extend: 'pill',
	color: colors.primary,
	borderColor: colors.primary,
    },
    weightPill: {
	extend: 'pill',
	color: colors.secondary,
	borderColor: colors.secondary,
    },
    timePill: {
	extend: 'pill',
	color: colors.danger,
	borderColor: colors.danger,
    },
    repDone: {
	extend: 'pill',
	borderWidth: '0',
	backgroundColor: colors.primary,
	color: 'white',
    },
    weightDone: {
	extend: 'pill',
	borderWidth: '0',
	backgroundColor: colors.secondary,
	color: 'white',
    },
    timeDone: {
	extend: 'pill',
	borderWidth: '0',
	backgroundColor: colors.danger,
	color: 'white',
    },
    blank: {
	fontSize: '.9rem',
	marginRight: '1rem',
    },
    repBlank: {
	extend: 'blank',
	color: colors.primary,
    },
    weightBlank: {
	extend: 'blank',
	color: colors.secondary,
    },
    timeBlank: {
	extend: 'blank',
	color: colors.danger,
    },
}
