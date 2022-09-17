import { Pool, PoolConfig } from 'pg';

export const pgPoolFactory = (function () {
  let instance: Pool;

  function createInstance(POOL_CONFIG: PoolConfig) {
    return new Pool(POOL_CONFIG);
  }

  return {
    getInstance: (POOL_CONFIG: PoolConfig) => {
      if (!instance) {
        instance = createInstance(POOL_CONFIG);
      }
      return instance;
    },
  };
})();
