import path from 'path';
import { Pool, PoolClient, PoolConfig } from 'pg';
import { migrate } from 'postgres-migrations';


const getVar = (key: string): string => {
    const value = process.env[key]
    if (!value){
        throw Error(`Please Add Environment variable ${key}`)
    }
    return value
}
const poolConfig: PoolConfig = {
    database: getVar('POSTGRES_DB_NAME'),
    user: getVar('POSTGRES_USER'),
    password: getVar('POSTGRES_PASSWORD'),
    port: +getVar('PGPORT'),
    host: getVar('POSTGRES_DB_HOST'),
    max: +getVar('DB_POOL_SIZE'),
    idleTimeoutMillis: +getVar('DB_POOL_CLIENT_IDLE_TIMEOUT'),
    connectionTimeoutMillis: +getVar('DB_POOL_CLIENT_CONNECTION_TIMEOUT')
}

export interface IDATABASE {
    _pool: Pool;
    runMigrations: () => Promise<void>;
    getPoolClient: () => Promise<PoolClient>;
    getQuery: () => Pool;
}

export class Database implements IDATABASE {
    _pool: Pool
    constructor(config: PoolConfig) {
        this._pool = new Pool(config)
    }

    runMigrations = async (): Promise<void> => {
        const client = await this._pool.connect()
        try{
            await migrate({ client }, path.resolve(__dirname, 'migrations/files'))
        }
        catch(e){
            console.log('Migration Failed with err', e)
        }
        finally{
            client.release()
        }
    }

    getPoolClient = async (): Promise<PoolClient> => {
        const client = await this._pool.connect()
        return client
    }

    getQuery = () => {
        return this._pool
    }
}

export default new Database(poolConfig)