
const config = require("./src/assets/config.json");


function build() {

  var fs = require('fs');

  const Strings = require(`./src/assets/translations/${config.language}.json`);
  /**
   * RR
   * 31|June|2020
   * This will create new html file and override existing as you run - npm run build
   */

    var htmlContent = `<!DOCTYPE html>
    <html lang="en">
    
    <head>  
      <meta property="og:description"
        content="${Strings.app.OgTagDescription}" />
      <meta property="og:site_name" content="${Strings.app.OgTagTitle}">
      <meta property="og:image"
      content="${process.argv.slice(2)[0]}">
      <meta property="og:title" content="${Strings.app.OgTagTitle}">
      <meta name="title" content="${Strings.app.OgTagTitle}">
      <meta name="description" content="${Strings.app.OgTagDescription}">
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#000000" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <!-- <meta http-equiv="Pragma" content="no-cache">
      <meta http-equiv="Expires" content="-1"> 
      <meta http-equiv="CACHE-CONTROL" content="NO-STORE"> -->
      <link rel="icon" type="image/png" href="/favicon.ico" />
      <!--
          manifest.json provides metadata used when your web app is added to the
          homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
        -->
    
   
      <title id="title"></title>
      <script src="https://js.stripe.com/v3/"></script>
      <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en"></script>
      <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.de"></script>
      <style type="text/css">
        @import url("https://themes.googleusercontent.com/fonts/css?kit=kHIgBl0eSuyQT30pt5ZYzlRjgJFPsk0t0o3vJ6NSyOs");
    
        .lst-kix_list_2-6>li:before {
          content: "0025cf  ";
        }
    
        .lst-kix_list_2-7>li:before {
          content: "o  ";
        }
    
        ul.lst-kix_list_1-0 {
          list-style-type: none;
        }
    
        .lst-kix_list_2-4>li:before {
          content: "o  ";
        }
    
        .lst-kix_list_2-5>li:before {
          content: "0025aa  ";
        }
    
        .lst-kix_list_2-8>li:before {
          content: "0025aa  ";
        }
    
        ul.lst-kix_list_2-8 {
          list-style-type: none;
        }
    
        ul.lst-kix_list_1-3 {
          list-style-type: none;
        }
    
        ul.lst-kix_list_2-2 {
          list-style-type: none;
        }
    
        .lst-kix_list_1-0>li:before {
          content: "0025cf  ";
        }
    
        ul.lst-kix_list_1-4 {
          list-style-type: none;
        }
    
        ul.lst-kix_list_2-3 {
          list-style-type: none;
        }
    
        ul.lst-kix_list_1-1 {
          list-style-type: none;
        }
    
        ul.lst-kix_list_2-0 {
          list-style-type: none;
        }
    
        ul.lst-kix_list_1-2 {
          list-style-type: none;
        }
    
        ul.lst-kix_list_2-1 {
          list-style-type: none;
        }
    
        ul.lst-kix_list_1-7 {
          list-style-type: none;
        }
    
        ul.lst-kix_list_2-6 {
          list-style-type: none;
        }
    
        .lst-kix_list_1-1>li:before {
          content: "o  ";
        }
    
        .lst-kix_list_1-2>li:before {
          content: "0025aa  ";
        }
    
        ul.lst-kix_list_1-8 {
          list-style-type: none;
        }
    
        ul.lst-kix_list_2-7 {
          list-style-type: none;
        }
    
        ul.lst-kix_list_1-5 {
          list-style-type: none;
        }
    
        ul.lst-kix_list_2-4 {
          list-style-type: none;
        }
    
        ul.lst-kix_list_1-6 {
          list-style-type: none;
        }
    
        ul.lst-kix_list_2-5 {
          list-style-type: none;
        }
    
        .lst-kix_list_1-3>li:before {
          content: "0025cf  ";
        }
    
        .lst-kix_list_1-4>li:before {
          content: "o  ";
        }
    
        .lst-kix_list_1-7>li:before {
          content: "o  ";
        }
    
        .lst-kix_list_1-5>li:before {
          content: "0025aa  ";
        }
    
        .lst-kix_list_1-6>li:before {
          content: "0025cf  ";
        }
    
        .lst-kix_list_2-0>li:before {
          content: "0025cf  ";
        }
    
        .lst-kix_list_2-1>li:before {
          content: "o  ";
        }
    
        .lst-kix_list_1-8>li:before {
          content: "0025aa  ";
        }
    
        .lst-kix_list_2-2>li:before {
          content: "0025aa  ";
        }
    
        .lst-kix_list_2-3>li:before {
          content: "0025cf  ";
        }
    
        ol {
          margin: 0;
          padding: 0;
        }
    
        table td,
        table th {
          padding: 0;
        }
    
        .c9 {
          margin-left: 36pt;
          padding-top: 5pt;
          padding-left: 0pt;
          padding-bottom: 5pt;
          line-height: 1;
          orphans: 2;
          widows: 2;
          text-align: left;
        }
    
        .c1 {
          margin-left: 36pt;
          padding-top: 5pt;
          padding-bottom: 5pt;
          line-height: 1;
          orphans: 2;
          widows: 2;
          text-align: justify;
        }
    
        .c12 {
          margin-left: 35.5pt;
          padding-top: 5pt;
          padding-bottom: 5pt;
          line-height: 1;
          orphans: 2;
          widows: 2;
          text-align: justify;
        }
    
        .c6 {
          margin-left: 21.3pt;
          padding-top: 5pt;
          padding-bottom: 5pt;
          line-height: 1;
          orphans: 2;
          widows: 2;
          text-align: justify;
        }
    
        .c11 {
          margin-left: 72pt;
          padding-top: 5pt;
          padding-bottom: 5pt;
          line-height: 1;
          orphans: 2;
          widows: 2;
          text-align: justify;
        }
    
        .c3 {
          color: #363636;
          font-weight: 400;
          text-decoration: none;
          vertical-align: baseline;
          font-size: 7pt;
          font-family: "Open Sans", sans-serif;
          font-style: normal;
        }
    
        .c2 {
          color: #363636;
          font-weight: 400;
          text-decoration: none;
          vertical-align: baseline;
          font-size: 11.5pt;
          font-family: "Open Sans", sans-serif;
          font-style: normal;
        }
    
        .c0 {
          color: #363636;
          font-weight: 700;
          text-decoration: none;
          vertical-align: baseline;
          font-size: 11.5pt;
          font-family: "Open Sans", sans-serif;
          font-style: normal;
        }
    
        .c13 {
          margin-left: 36pt;
          padding-top: 5pt;
          padding-bottom: 0pt;
          line-height: 1.15;
          orphans: 2;
          widows: 2;
          text-align: justify;
        }
    
        .c14 {
          padding-top: 5pt;
          padding-bottom: 5pt;
          line-height: 1;
          orphans: 2;
          widows: 2;
          text-align: center;
        }
    
        .c31 {
          padding-top: 0pt;
          padding-bottom: 0pt;
          line-height: 1;
          orphans: 2;
          widows: 2;
          text-align: left;
        }
    
        .c32 {
          padding-top: 0pt;
          padding-bottom: 12pt;
          line-height: 1;
          orphans: 2;
          widows: 2;
          text-align: left;
        }
    
        .c23 {
          padding-top: 0pt;
          padding-bottom: 12pt;
          line-height: 1;
          orphans: 2;
          widows: 2;
          text-align: justify;
        }
    
        .c39 {
          padding-top: 5pt;
          padding-bottom: 5pt;
          line-height: 1;
          orphans: 2;
          widows: 2;
          text-align: left;
        }
    
        .c5 {
          color: #000000;
          text-decoration: none;
          vertical-align: baseline;
          font-style: normal;
        }
    
        .c28 {
          font-weight: 400;
          font-size: 12pt;
          font-family: "Open Sans", sans-serif;
        }
    
        .c30 {
          -webkit-text-decoration-skip: none;
          text-decoration: underline;
          text-decoration-skip-ink: none;
        }
    
        .c8 {
          text-decoration: none;
          vertical-align: baseline;
          font-style: normal;
        }
    
        .c21 {
          font-size: 11pt;
          font-family: "Open Sans", sans-serif;
          font-weight: 400;
        }
    
        .c33 {
          font-weight: 400;
          font-size: 11pt;
          font-family: "Georgia";
        }
    
        .c35 {
          font-weight: 400;
          font-size: 28pt;
          font-family: "Open Sans", sans-serif;
        }
    
        .c22 {
          font-weight: 400;
          font-size: 12pt;
          font-family: "Helvetica Neue";
        }
    
        .c38 {
          font-weight: 400;
          font-size: 8pt;
          font-family: "Open Sans", sans-serif;
        }
    
        .c26 {
          font-weight: 400;
          font-size: 11.5pt;
          font-family: "Arimo";
        }
    
        .c20 {
          font-weight: 700;
          font-size: 11.5pt;
          font-family: "Open Sans", sans-serif;
        }
    
        .c4 {
          font-size: 11.5pt;
          font-family: "Open Sans", sans-serif;
          font-weight: 400;
        }
    
        .c17 {
          font-weight: 700;
          font-size: 7pt;
          font-family: "Open Sans", sans-serif;
        }
    
        .c18 {
          font-weight: 400;
          font-size: 7pt;
          font-family: "Open Sans", sans-serif;
        }
    
        .c24 {
          text-decoration: none;
          vertical-align: baseline;
          font-style: italic;
        }
    
        .c25 {
          color: inherit;
          text-decoration: inherit;
        }
    
        .c34 {
          max-width: 451pt;
          padding: 72pt 72pt 72pt 72pt;
        }
    
        .c36 {
          margin-left: 45pt;
          text-indent: -45pt;
        }
    
        .c40 {
          padding: 0;
          margin: 0;
        }
    
        .c7 {
          background-color: #ffffff;
        }
    
        .c19 {
          height: 12pt;
        }
    
        .c29 {
          text-indent: -7.1pt;
        }
    
        .c15 {
          margin-left: 28.4pt;
        }
    
        .c27 {
          background-color: #ff0000;
        }
    
        .c10 {
          color: #363636;
        }
    
        .c37 {
          color: #e06666;
        }
    
        .c16 {
          background-color: #ffff00;
        }
    
        .tnctexts {
          text-align: justify !important;
        }
    
        .tncbox {
          max-width: 80%;
          margin-left: 10%;
          text-align: justify;
        }
    
        .tnclistsitem {
          margin-left: 1.5%;
          text-align: justify;
        }
    
        .innertnclistsitem {
          margin-left: 2%;
          text-align: justify;
        }
      </style>
    </head>
    
    <body>
      <noscript>
        This is a test Site.
      </noscript>
      <div id="root"></div>
    
    </body>
    
    </html>`;

  fs.writeFile('public/index.html', htmlContent, (error) => { /* handle error */ });

}
build();
// export default build;