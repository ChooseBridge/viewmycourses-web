const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const cookieParser = require('cookie-parser');
const url = require('url');
const userInfo = require('./middleware/user-info');
const config = require('./config');
const checkLogin = require('./middleware/check-login');
const api = require('./common/api');

app.prepare()
  .then(() => {
    const server = express();

    const render = (req, res, page, params = {}) => {
      const uri = req.protocol + '://' + req.get('host') + req.originalUrl;
      return app.render(req, res, page, Object.assign({}, params, {
        loginUrl: `${config.loginUrl}${uri}`
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

    // server.use(userInfo);

    server.get('/', userInfo, (req, res) => {
      render(req, res, '/index', { user: req.user });
    });

    server.get('/professor/create', userInfo, checkLogin, (req, res) => {
      render(req, res, '/professor/create', { user: req.user });
    });

    server.get('/professor/:id/rate', userInfo, checkLogin, (req, res) => {
      render(req, res, '/professor/rate', {
        user: req.user,
        id: req.params.id
      });
    });

    server.get('/professor/:id', userInfo, (req, res, next) => {
      api.getProfessorDetail({
        query: {
          professor_id: req.params.id
        },
        headers: {
          token: req.cookies.token
        }
      }).then(professor => {
        render(req, res, '/professor/home', {
          user: req.user,
          professor,
          id: req.params.id
        });
      }, () => {
        next('')
      });
    });

    server.get('/school/create', userInfo, checkLogin, (req, res) => {
      render(req, res, '/school/create', { user: req.user });
    });

    server.get('/school/rate', userInfo, checkLogin, (req, res) => {
      render(req, res, '/school/rate', {
        user: req.user,
        id: req.param('id')
      });
    });

    server.get('/school/:id', userInfo, (req, res) => {
      render(req, res, '/school/home', {
        user: req.user,
        id: req.params.id
      });
    });

    server.get('/user/message', userInfo, (req, res) => {
      render(req, res, '/user/message', { user: req.user });
    });

    server.get('/user/:id', userInfo, (req, res) => {
      render(req, res, '/user/home', { user: req.user });
    });

    server.get('/search', userInfo, (req, res) => {
      render(req, res, '/search', { user: req.user, condition: req.query });
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  });