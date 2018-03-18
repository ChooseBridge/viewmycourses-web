const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const cookieParser = require('cookie-parser');
const url = require('url');
const userInfo = require('./middleware/user-info');

app.prepare()
  .then(() => {
    const server = express();

    // server.use((req, res, next) => {
    //   res.locals({
    //     loginUrl: 'https://i.viewmycourses.com/oauth/authorize?client_id=bridge-campus&redirect_uri=http://school.anyquestion.top/callback&response_type=code&state=http://test.com'
    //   });
    //   next();
    // });

    const render = (req, res, page, params = {}) => {
      const uri = req.protocol + '://' + req.get('host') + req.originalUrl;
      return app.render(req, res, page, Object.assign({}, params, {
        loginUrl: `https://i.viewmycourses.com/oauth/authorize?client_id=bridge-campus&redirect_uri=http://school.anyquestion.top/callback&response_type=code&state=${uri}`
      }));
    };

    server.use(cookieParser());

    // 授权 callback 处理
    server.use((req, res, next) => {
      const token = req.query && req.query.token;

      if (token) {
        req.cookies.token = token;
        res.cookie('token', token, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) });

        const uri = url.parse(req.protocol + '://' + req.get('host') + req.originalUrl);

        return res.redirect(301, `${uri.protocol}//${uri.host}${uri.pathname}`);
      }

      next();
    });

    server.get('/', userInfo, (req, res) => {
      render(req, res, '/index', { user: req.user });
    });

    // error handler
    // server.use((err, req, res) => {
    //   // console.log(err);
    //   // res.send(err);
    //
    //   return res.send(err);
    //
    // });

    server.get('professor/create', (req, res) => {
      render(req, res, 'professor/create');
    });

    server.get('school/create', (req, res) => {
      render(req, res, 'school/create');
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });