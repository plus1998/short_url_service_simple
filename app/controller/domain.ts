import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async add() {
    const { ctx } = this;
    const { domain } = ctx.query;
    if (!domain) {
      ctx.body = { success: false, message: '参数错误' };
      return;
    }
    ctx.body = await ctx.service.domain.add(domain);
  }
  public async remove() {
    const { ctx } = this;
    const { domain } = ctx.query;
    if (!domain) {
      ctx.body = { success: false, message: '参数错误' };
      return;
    }
    ctx.body = await ctx.service.domain.remove(domain);
  }
  public async clear() {
    const { ctx } = this;
    ctx.body = await ctx.service.domain.clear();
  }
  public async list() {
    const { ctx } = this;
    ctx.body = await ctx.service.domain.list();
  }
}
