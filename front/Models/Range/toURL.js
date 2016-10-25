export default ({start, end}) => `${start.format('YYYYMMDD')}/${!start.isSame(end) ? end.format('YYYYMMDD') : ''}`
