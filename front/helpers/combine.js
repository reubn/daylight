export default (...hooks) => (...args) => {for(const hook of hooks) hook(...args)}
