export default {
    constraint: {
        maxWidth: '1000px',
        flexBasis: '1000px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    table: {
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    tr: {
        '&:nth-of-type(2)': {
            background: '#efefef',
        }
    },
    td: {
        padding: '0.5rem',
        '&:not(:last-of-type)': {
            paddingRight: '1.5rem',
        }
    },
}
