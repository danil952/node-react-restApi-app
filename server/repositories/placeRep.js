const pool= require('../db.js')

const queryStrings = {
    selectAll: 'SELECT * FROM "Place" ORDER BY "id"',
    select: 'SELECT * FROM "Place" WHERE "id" = $1',
    insert: 'INSERT INTO "Place" (name,map) VALUES ($1, $2) RETURNING *',
    update: 'UPDATE "Place" SET name = $1, place = $2 WHERE id = $3 RETURNING *',
    delete: 'DELETE FROM "Place" WHERE id = $1'
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

async function post(place) {
    const query = await pool.query(
        queryStrings.insert,
        [place.name, place.map]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, place) {
    const query = await pool.query(
        queryStrings.update,
        [place.name, place.map, id]);
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

module.exports = { getAll, get, post, put, remove }