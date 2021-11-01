import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/url.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('ranstr', async () => {
    const num = 10000;
    console.time(num + '');
    for (let i = 0; i < num; i++) {
      const str = await ctx.service.url.randStr(6);
      assert.ok(str);
    }
    console.timeEnd(num + '');
  });

  it('shortlen', async () => {
    const count = 10;
    console.time(`${count}条`);
    for (let i = 0; i < count; i++) {
      const originUrl = `http://MOCK${i}.com?i=${i}`;
      const { success, code, data } = await ctx.service.url.shorten(originUrl);
      console.log(originUrl, '>>', data);
      assert(success);
      assert(code);
      if (code) {
        const { data: url } = await ctx.service.url.reduct(code);
        assert.equal(url, originUrl);
      }
    }
    console.timeEnd(`${count}条`);
  });
});
