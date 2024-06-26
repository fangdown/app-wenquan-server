const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa2-cors");
const mockList = require("./mock/index");

const app = new Koa();
const router = new Router();

async function getRes(fn, ctx) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = fn(ctx);
      resolve(res);
    }, 1000);
  });
}

// 注册 mock 路由
mockList.forEach((item) => {
  const { url, method, response } = item;
  router[method](url, async (ctx) => {
    // const res = response()
    const res = await getRes(response, ctx); // 模拟网络请求的加载状态，1s
    ctx.body = res; // 输入结果
  });
});
app.use(
  cors({
    credentials: true,
  })
);
app.use(router.routes());

app.listen(11011, () => {
  console.log("app start on 11011");
}); // port 端口
