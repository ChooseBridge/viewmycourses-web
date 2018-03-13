import Head from 'next/head';

export default ({ children, title }) =>
  <div>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <title>{title}</title>
      <link rel='stylesheet' href='https://unpkg.com/antd@3/dist/antd.min.css' />
      <link rel="stylesheet" href="/_next/static/style.css" />
    </Head>
    <style jsx global>{`
      body {
      }
    `}</style>
    {children}
  </div>