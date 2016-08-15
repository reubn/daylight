module.exports = (user, activityTypes) =>

  `<!DOCTYPE html>
  <html>
  <head>
    <title>daylight 🌍</title>
    <meta charset="utf-8">
  </head>
  <body>
    <section id="app"></section>
    <script type="text/javascript">
      window.dUD = ${JSON.stringify(user)}
      window.dAT = ${JSON.stringify(activityTypes)}</script>
    <script type="text/javascript" src="/bundle.js" charset="utf-8"></script>
  </body>
  </html>
`
