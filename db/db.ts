import { MongoClient } from "../deps.ts";
/**
 * Own
 */
// models
import configs from "../config/config.ts";
import Seed from "../seed.ts";

// middlewares
import log from "../middlewares/logger.middleware.ts";

const { dbName, mongoUrl, seed } = configs;

/**
 * Reusable database connection
 */
class Database {
    public client: MongoClient;
    private seeder: Seed = new Seed();

    /**
     * Constructor function for Database
     * @param currentDbName
     * @param url
     */
    constructor(public currentDbName: string, public url: string) {
        this.currentDbName = currentDbName;
        this.url = url;
        this.client = {} as MongoClient;
    }

    /**
     * Function to connect to mongo db
     */
    async connect() {
        log.info("Database connecting...");

        const client: MongoClient = new MongoClient();
        await client.connect(this.url);
        this.client = client;
        log.info("Database connected!");

        if (seed) {
            const ev = setTimeout(async () => {
                await this.seeder.seedCollection();
                log.info("All Seed done");
                clearTimeout(ev);
            }, 10);
        }
    }

    /**
     * returns database
     */
    get getDatabase() {
        return this.client.database(this.currentDbName);
    }
}

const db = new Database(dbName, mongoUrl);
await db.connect();

export default db;
