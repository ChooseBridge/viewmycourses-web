import Head from 'next/head';

export default ({ children, title, className }) =>
  <div className={className}>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <title>{title && `${title} - `}桥选校园</title>
      <link rel='stylesheet' href='https://unpkg.com/antd@3/dist/antd.min.css' />
      <link rel="stylesheet" href="/_next/static/style.css" />
      <link href="https://cdn.bootcss.com/social-share.js/1.0.16/css/share.min.css" rel="stylesheet" />
    </Head>
    {children}
    <script src="https://cdn.bootcss.com/social-share.js/1.0.16/js/social-share.min.js"></script>
  </div>