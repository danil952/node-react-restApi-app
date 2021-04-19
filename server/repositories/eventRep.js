const pool= require('../db.js')

const queryStrings = {
    selectAll: 'SELECT * FROM "Event" ORDER BY "id"',
    select: 'SELECT * FROM "Event" WHERE "id" = $1',
    insert: 'INSERT INTO "Event" (author_id, name, category_id, place_id, description, event_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    update: 'UPDATE "Event" SET author_id = $1, name = $2, category_id = $3, place_id = $4, description = $5, event_date = $6 WHERE id = $7 RETURNING *',
    delete: 'DELETE FROM "Event" WHERE id = $1',
    selectByAuthorId: `SELECT "Event".id, "Event".name, "Event".description, "Event".event_date, "Category".name as category_name, "Place".map FROM "Event"
    JOIN "Category" ON "Category".id = "Event".category_id
    JOIN "Place" ON "Place".id = "Event".place_id
    WHERE "Event".author_id = $1;`,
    selectByIdArr: `SELECT "Event".id, "Event".name, "Event".description, "Event".event_date, "User".name as user_name, "Category".name as category_name, "Place".map FROM "Event"
    JOIN "User" ON "User".id = "Event".author_id
    JOIN "Category" ON "Category".id = "Event".category_id
    JOIN "Place" ON "Place".id = "Event".place_id
    WHERE "Event".id = ANY ($1);`,
    selectByNotIdArr: `SELECT "Event".author_id, "Event".id, "Event".name, "Event".description, "Event".event_date, "User".name as user_name, "Category".name as category_name, "Place".map FROM "Event"
    JOIN "User" ON "User".id = "Event".author_id
    JOIN "Category" ON "Category".id = "Event".category_id
    JOIN "Place" ON "Place".id = "Event".place_id
    WHERE NOT ("Event".id = ANY ($1));`,
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

async function post(event) {

            const query = await pool.query(
                queryStrings.insert,
                [event.author_id, event.name, event.category_id, event.place_id, event.description, event.event_date]);
            if (query.rows.length < 1) {
                return null;
            }
            else
            {
                return query.rows[0];
            }

}

async function put(id, event) {
    const query = await pool.query(
            queryStrings.update,
            [event.author_id, event.name, event.category_id, event.place_id, event.description, event.event_date, id]);
        if (query.rows.length < 1) {
            return null;
        }
        else
        {
            return query.rows[0];
        }
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

async function getByAuthorId(id)
{
    const query = await pool.query(
        queryStrings.selectByAuthorId,
        [id]);
    if (query.rows.length < 1) {
        return [];
    }
    return query.rows;
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

async function getByNotIdArr(arr)
{
    const query = await pool.query(
        queryStrings.selectByNotIdArr,
        [arr]);
    if (query.rows.length < 1) {
        return [];
    }
    return query.rows;
}

module.exports = { getAll, get, post, put, remove, getByIdArr, getByAuthorId, getByNotIdArr}