const pool= require('../db.js')

const queryStrings = {
    selectAll: 'SELECT * FROM "User" ORDER BY "id"',
    select: 'SELECT * FROM "User" WHERE "id" = $1',
    selectByUsername: 'SELECT * FROM "User" WHERE "username" = $1',
    insert: 'INSERT INTO "User" (name, email, surname, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    update: 'UPDATE "User" SET name = $1, email = $2, surname = $3 WHERE id = $4 RETURNING *',
    delete: 'DELETE FROM "User" WHERE id = $1',
    selectByIdArr: 'SELECT * FROM "User" WHERE "id" = ANY ($1)'
}



async function getAll() {
    const query = await pool.query(queryStrings.selectAll);
    return query.rows;
}

async function get(id) {
    const query = await pool.query(
        queryStrings.select,
        [id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function post(user) {
    const query = await pool.query(
        queryStrings.insert,
        [user.name, user.email, user.surname, user.username, user.password]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, user) {
    const query = await pool.query(
        queryStrings.update,
        [user.name, user.email, user.surname, id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function remove(id) {

    const query= await pool.query(
        queryStrings.delete, [id]
    );
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function findByUsername(username)
{
    const query = await pool.query(
        queryStrings.selectByUsername,
        [username]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function getByIdArr(arr)
{
    const query = await pool.query(
        queryStrings.selectByIdArr,
        [arr]);
    if (query.rows.length < 1) {
        return [];
    }
    return query.rows;
}

module.exports = { getAll, get, post, put, remove, findByUsername, getByIdArr }