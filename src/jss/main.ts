export default {
    constraint: {
        maxWidth: '1000px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    table: {
        border: '1px solid #efefef',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    tableHead: {
        fontWeight: 'bold',
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
