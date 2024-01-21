const constants = {
    MONGO_ID_PATTERN: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    ROLES: {
        USER: 'USER',
        ADMIN: 'ADMIN',
        WRITER: 'WRITER',
        TEACHER: 'TEACHER',
        SUPPLIER: 'SUPPLIER',
    },
}
module.exports = constants
