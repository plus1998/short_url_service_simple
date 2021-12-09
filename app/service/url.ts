import { Service } from 'egg';

const alphabets = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/

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
      lock = await app.redlock.lock([ 'REDLOCK:URL_INDEX' ], 2000);
      // 查索引 默认从10000开始
      const curIndex: string = await app.redis.get('URL_INDEX') || '10000';
      // 数字62
      const newIndex = parseInt(curIndex) + 1;
      const data62 = await this.num62(newIndex);
      // 再加上随机字符串 使链接不可预测
      const code = data62 + await this.randStr(3);
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
      let shortUrl;
      if (domain.startsWith('http')) shortUrl = `${domain}${code}`; // 带协议头的 整个链接都是自定义 只在后面拼接code 方便自己设置跳转任何参数链接
      else shortUrl = `http://${domain || 'localhost'}/${code}`;
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
  /**
   * @description 62数据
   * @param num
   * @return
   */
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

  /**
   * @description 随机字符串
   * @param length
   * @return
   */
  public async randStr(length: number) {
    let str = '';
    for (let i = 0; i < length; i++) {
      str += alphabets[Math.floor(Math.random() * alphabets.length)];
    }
    return str;
  }
}
