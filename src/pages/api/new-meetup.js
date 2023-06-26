// /api/new-meetup
// POST / api/new-meetup
import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://admin:joshwa12345@cluster0.25bh1y9.mongodb.net/"
    );

    const db = client.db("meetups");
    const meetupscollection = db.collection("user");

    const result = await meetupscollection.insertOne({ data });
    console.log(result);

    client.close();

    res.status(201).json({ message: "meetup inserted!" });
  }
}

export default handler;
