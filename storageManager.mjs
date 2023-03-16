import * as pg from 'pg';
const { Client } = pg.default;

class StorageManager {

    constructor(credentials) {
        if (!StorageManager.#instance) {
            console.log(Client);
            StorageManager.#instance = this;
            this.#credentials = {
                connectionString: credentials,
                ssl: {
                    rejectUnauthorized: false
                }
            };

        }

        return StorageManager.#instance;
    }

    async createUser(username) {
        const client = new Client(this.#credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."users"("username") VALUES($1) RETURNING "user_id"', [username]);
            results = results.rows[0].id;
            client.end();
        } catch (err) {
            results = err;
        } finally {
            client.end();
        }

        return results;
    }

    async retrieveUser(username) {
        const client = new Client(this.#credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('SELECT * from "users" where username=$1', username);
            results = results.rows[0];
            client.end();
        } catch (err) {
            client.end();
            results = err;
        }
    }




}

export default StorageManager;