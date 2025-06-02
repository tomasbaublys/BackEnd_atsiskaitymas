import { connectDB } from "./helper.js";

const dynamicQuery = (reqQuery) => {
    const settings = {
        filter: {},
        sort: {},
        skip: 0,
        limit: 50
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

export { getAllBooks };