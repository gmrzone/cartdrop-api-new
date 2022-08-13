import path from 'path';
import { Pool } from 'pg';
import { migrate } from 'postgres-migrations';


const getVar = (key: string): string => {
    const value = process.env[key]
    if (!value){
        throw Error(`Please Add Environment variable ${key}`)
    }
    return value
}
const poolConfig = {
    database: getVar('POSTGRES_DB_NAME'),
    user: getVar('POSTGRES_USER'),
    password: getVar('POSTGRES_PASSWORD'),
    port: +getVar('POSTGRES_DB_PORT'),
    host: getVar('POSTGRES_DB_HOST'),
    max: +getVar('DB_POOL_SIZE'),
    idleTimeoutMillis: +getVar('DB_POOL_CLIENT_IDLE_TIMEOUT'),
    connectionTimeoutMillis: +getVar('DB_POOL_CLIENT_CONNECTION_TIMEOUT')
}


class Database {
    _pool: Pool
    constructor() {
        this._pool = new Pool(poolConfig)
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
}