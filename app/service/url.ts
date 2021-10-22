import { Service } from 'egg';

/**
 * Url Service
 */
export default class Url extends Service {
  /**
   * 缩短链接
   * @param url - origin url
   */
  public async shorten(url: string, domain?: string) {
    const { ctx, app } = this;
    // lock start
    let lock;
    try {
      lock = await app.redlock.lock(['REDLOCK:URL_INDEX'], 2000);
      // 查索引 默认从10000开始
      const curIndex: string = await app.redis.get('URL_INDEX') || '10000';
      // 数字62
      const newIndex = parseInt(curIndex) + 1;
      const code = await this.num62(newIndex);
      // REDIS保存
      await app.redis.set(`URL:${code}`, url, 'EX', 30 * 24 * 60 * 60); // 30 day
      await app.redis.set('URL_INDEX', newIndex);
      // lock end
      await lock.unlock();
      lock = null;
      // REDIS持久化
      try {
        await app.redis.bgsave();
      } catch (error) {
        // redis会判断已经有进程在执行
      }
      // 选域名
      if (!domain) domain = await ctx.service.domain.randomOne();
      const shortUrl = `http://${domain || 'localhost'}/${code}`;
      return { success: true, code, data: shortUrl };
    } catch (error) {
      if (lock) await lock.unlock();
      return { success: false, message: error };
    }
  }
  /**
 * 还原链接
 * @param code - code
 */
  public async reduct(code: string) {
    const { app } = this;
    const url = await app.redis.get(`URL:${code}`);
    return { success: true, data: url };
  }
  public async num62(num: number) {
    const chars: Array<string> = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ'.split('');
    const radix = chars.length;
    let qutient = num;
    const arr: Array<string> = [];
    do {
      const mod = qutient % radix;
      qutient = (qutient - mod) / radix;
      arr.unshift(chars[mod]);
    } while (qutient);
    return arr.join('');
  }
}
