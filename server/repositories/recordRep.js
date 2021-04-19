const pool= require('../db.js')


const queryStrings = {
    selectAll: 'SELECT * FROM "Record" ORDER BY "id"',
    select: 'SELECT * FROM "Record" WHERE "id" = $1',
    insert: 'INSERT INTO "Record" (user_id,event_id) VALUES ($1, $2) RETURNING *',
    delete: 'DELETE FROM "Record" WHERE id = $1',
    selectByEventId: 'SELECT * FROM "Record" WHERE "event_id" = $1',
    selectByUserId: 'SELECT * FROM "Record" WHERE "user_id" = $1',
    selectByEventAndUserId: 'SELECT * FROM "Record" WHERE "user_id" = $1 AND "event_id" = $2'
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

async function post(record) {
    const query = await pool.query(
        queryStrings.insert,
        [record.user_id, record.event_id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}


async function remove(id) {
    const query = await pool.query(
        queryStrings.delete,
        [id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function getByEventId(id)
{
    const query = await pool.query(
        queryStrings.selectByEventId,
        [id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows;
}

async function getByUserId(id)
{
    const query = await pool.query(
        queryStrings.selectByUserId,
        [id]);
    if (query.rows.length < 1) {
        return [];
    }
    return query.rows;
}

async function getByUserAndEventId(user_id,event_id)
{
    const query = await pool.query(
        queryStrings.selectByEventAndUserId,
        [user_id, event_id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}
module.exports = { getAll, get, post, remove ,getByEventId, getByUserId, getByUserAndEventId}