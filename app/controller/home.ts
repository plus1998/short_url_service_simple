import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async redirect() {
    const { ctx } = this;
    const { code } = ctx.params;
    if (!code) {
      ctx.status = 404;
      return;
    }
    const { data } = await ctx.service.url.reduct(code);
    if (!data) {
      ctx.status = 404;
      return;
    }
    ctx.redirect(data);
  }
  public async shortenUrl() {
    const { ctx } = this;
    const { url, domain } = ctx.query;
    if (!url) {
      ctx.body = { code: -1, message: '参数错误', success: false };
      return;
    }
    ctx.body = await ctx.service.url.shorten(url, domain);
  }
  public async reductUrl() {
    const { ctx } = this;
    const { code } = ctx.query;
    if (!code) {
      ctx.body = { code: -1, message: '参数错误', success: false };
      return;
    }
    ctx.body = await ctx.service.url.reduct(code);
  }
}
