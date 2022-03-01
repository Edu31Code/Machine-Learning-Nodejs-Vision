import { computerVision } from "../../helpers/computerVision";

export default async function tasks(res, res) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        const query = "SELECT * FROM tasks";
        const response = await conn.query(query);
        return res.status(200).json(response.rows);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    case "POST":
      try {
        const { url } = body;
        const response = await computerVision(url);
        return res.status(200).json(response);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json("invalid method");
  }
}
