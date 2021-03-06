import Head from 'next/head';

export default ({ children, title, className }) =>
  <div className={className}>
    <Head>
      <meta charSet='utf-8' />
      <title>{title && `${title} | `}桥选校园</title>
      <link href="https://cdn.bootcss.com/antd/3.5.2/antd.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="/_next/static/style.css" />
      <link href="https://cdn.bootcss.com/social-share.js/1.0.16/css/share.min.css" rel="stylesheet" />
    </Head>
    {children}
    <script src="https://cdn.bootcss.com/social-share.js/1.0.16/js/social-share.min.js"></script>
  </div>