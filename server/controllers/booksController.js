import { connectDB } from "./helper.js";

const dynamicQuery = (reqQuery) => {
    const settings = {
        filter: {},
        sort: {},
        skip: 0,
        limit: 100
    }
    if (Object.keys(reqQuery).length) {
        Object.keys(reqQuery).forEach(key => {
            const [action, field, operator] = key.split('_');
            if (action === 'sort') {
                settings.sort[field] = Number(reqQuery[key]);
            } else if (action === 'filter') {
                if (!operator) {
                    if (isNaN(reqQuery[key])) {
                        settings.filter[field] = { $regex: new RegExp(reqQuery[key], 'i') };
                    } else {
                        settings.filter[field] = Number(reqQuery[key]);
                    }
                } else {
                    if (!settings.filter[field]) {
                        settings.filter[field] = {};
                    }
                    const value = isNaN(reqQuery[key]) ? reqQuery[key] : Number(reqQuery[key]);
                    settings.filter[field][`$${operator}`] = value;
                }
            }
        })
    }
    return settings;
}

const getAllBooks = async (req, res) => {
    const client = await connectDB();
    try {
        const settings = dynamicQuery(req.query);
        const DB_RESPONSE = await client.db('BookStore').collection('books').find(settings.filter).sort(settings.sort).skip(settings.skip).limit(settings.limit).toArray();
        res.send(DB_RESPONSE);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err, message: `Something went wrong with servers, please try again later.` });
    } finally {
        await client.close();
    }
}

const getBook = async (req, res) => {
    const { _id } = req.params;
    const client = await connectDB();
    try {
        const DB_RESPONSE = await client.db('BookStore').collection('books').findOne( { _id: _id } );
        if (!DB_RESPONSE) {
            return res.status(404).send({ error: `Book with id ${_id} not found.` });
        }
        res.send(DB_RESPONSE);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err, message: `Something went wrong with server, please try again later.` });
    } finally {
        await client.close();
    }
}

export { getAllBooks, getBook };