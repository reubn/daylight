module.exports = (user, activityTypes, locationCategories) =>

  `<!DOCTYPE html>
  <html>
  <head>
    <title>daylight 🌍</title>
    <meta charset="utf-8">
    <meta name=viewport content="width=device-width, initial-scale=1">
  </head>
  <body>
    <section id="app"></section>
    <script type="text/javascript">
      window.dUD = ${JSON.stringify(user)}
      window.dAS = ${JSON.stringify({activityTypes, locationCategories})}</script>
    <script type="text/javascript" src="/bundle.js" charset="utf-8"></script>
  </body>
  </html>
`
