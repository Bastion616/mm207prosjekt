import express from 'express'
import * as pg from 'pg'
const { Client } = pg.default;
const wishlistRoute = express.Router();

const db = process.env.DATABASE_URL;

const credentials = {
    connectionString: db,
    ssl: {
        rejectUnauthorized: false
    }
};

wishlistRoute.post('/add', async (req, res) => {
    console.log('Add to wishlist request received');
    const client = new Client(credentials);
    let results = null;
    const { userId, pokemonId } = req.body;

    console.log("A");
    
    try {
        client.connect();
        const query = 'INSERT INTO wishlist(user_id, pokemon_id) VALUES ($1, $2)'   ;
        const values = [userId, pokemonId];
        results = await client.query(query, values);
        console.log("Results of INSERT query: ", results);
        res.status(201).json({ message: 'Pokémon added to wishlist.' })
    } catch (error) {
        console.error("Error adding Pokémon to wishlist: ", error);
        res.status(500).json({ message: 'Error adding Pokémon to wishlist.' });
    } finally {
        console.log("Response being sent back to client: ", res);
        await client.end();
    }

    console.log("Å")
});


wishlistRoute.delete('/delete', async (req, res) => {
    const client = new Client(credentials);
    let results = null;
    const { userId, pokemon_id } = req.body;

    try {
        client.connect();
        const query = 'DELETE FROM wishlist WHERE user_id = $1 and pokemon_id = $2';
        const values = [userId, pokemon_id];
        results = await client.query(query, values);
        res.status(200).json({ message: 'Pokémon removed from wishlist.' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing Pokémon from wishlist.' });
    } finally {
        await client.end();
    }
});


wishlistRoute.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const client = new Client(credentials);
  
    try {
      client.connect();
      const query = 'SELECT * FROM wishlist WHERE user_id = $1';
      const values = [userId];
      const result = await client.query(query, values);
      console.log(result.rows);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      res.status(500).json({ message: 'Error fetching wishlist.' });
    } finally {
      await client.end();
    }
  });
  

export default wishlistRoute;