import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/:code', controller.home.redirect);
  router.get('/url/shortlen', controller.home.shortenUrl);
  router.get('/url/reduct', controller.home.reductUrl);

  router.get('/domain/list', controller.domain.list);
  router.get('/domain/add', controller.domain.add);
  router.get('/domain/remove', controller.domain.remove);
  router.get('/domain/clear', controller.domain.clear);
};
