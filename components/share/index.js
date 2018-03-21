export default () => {
  // window.jiathis_config = {
  //   siteNum: 10,
  //   sm: 'tsina,weixin,qzone,fb,twitter',
  //   summary: '',
  //   shortUrl: false,
  //   hideMore: false
  // };

  return (
    <div>
      <div className="jiathis_style">
        <span className="jiathis_txt">分享到：</span>
        <a className="jiathis_button_qzone"></a>
        <a className="jiathis_button_tsina"></a>
        <a className="jiathis_button_tqq"></a>
        <a className="jiathis_button_renren"></a>
        <a className="jiathis_button_kaixin001"></a>
        <a href="http://www.jiathis.com/share" className="jiathis jiathis_txt jiathis_separator jtico jtico_jiathis"
           target="_blank"></a>
        <a className="jiathis_counter_style"></a>
      </div>
      <script type="text/javascript" src="http://v3.jiathis.com/code/jia.js" charset="utf-8"></script>
    </div>
  );
}