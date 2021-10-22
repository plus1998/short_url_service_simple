import { Service } from 'egg';

/**
 * Url Service
 */
export default class Url extends Service {
  public async randomOne() {
    const { app } = this;
    return await app.redis.srandmember('DOMAINS') || 'localhost';
  }
  public async list() {
    const { app } = this;
    return await app.redis.smembers('DOMAINS');
  }
  public async add(domain: string) {
    const { app } = this;
    return await app.redis.sadd('DOMAINS', domain);
  }
  public async remove(domain: string) {
    const { app } = this;
    return await app.redis.srem('DOMAINS', domain);
  }
  public async clear() {
    const { app } = this;
    return await app.redis.del('DOMAINS');
  }
}
