const { get_parameter } = require('./ssm');

const parameters = async () => {
    const database = await get_parameter(`/kanban-postgres-database`);
    const host = await get_parameter(`/kanban-postgres-hostname`);
    const password = await get_parameter(`/kanban-postgres-password`);
    const user = await get_parameter(`/kanban-postgres-username`);

    return {
        database,
        host,
        user,
        password,
    };
};


module.exports.config = async () => {
    const { database, host, user, password } = await parameters()

    return {
        database,
        host,
        password,
        port: 5432,
        user,
    }
}
