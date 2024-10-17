import express from "express";
import pg from "pg";
import { v4 as uuidv4 } from "uuid";

const { Pool } = pg;

const app = express();
const port = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cdg",
  password: "",
  port: 5432,
});

app.use(express.json());

app.get("/image", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.image");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.post("/image", async (req, res) => {
  try {
    const { content_image, id_post, isfiltered } = req.body;
    const id_image = uuidv4();
    const result = await pool.query(
      "INSERT INTO public.image (id_image, content_image, id_post, isfiltered) VALUES ($1, $2, $3, $4) RETURNING *",
      [id_image, content_image, id_post, isfiltered]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.put("/image", async (req, res) => {
  try {
    const { id_image } = req.query;
    const { content_image, id_post, isfiltered } = req.body;

    if (!id_image) {
      return res.status(400).send("ID is required");
    }

    const result = await pool.query(
      "UPDATE public.image SET content_image = $1, id_post = $2, isfiltered = $3 WHERE id_image = $4 RETURNING *",
      [content_image, id_post, isfiltered, id_image]
    );
    if (result.rowCount === 0) {
      return res.status(404).send("Image not found");
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.delete("/image", async (req, res) => {
  try {
    const { id_image } = req.query;

    if (!id_image) {
      return res.status(400).send("ID is required");
    }

    const result = await pool.query(
      "DELETE FROM public.image WHERE id_image = $1",
      [id_image]
    );
    if (result.rowCount === 0) {
      return res.status(404).send("Image not found");
    }
    res.status(200).send("Image deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
