module.exports = (user, activityTypes, locationCategories) =>
  `<!DOCTYPE html>
    <title>daylight 🌍</title>
    <meta charset="utf-8">
    <meta name=viewport content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <section id="app"></section>
    <script type="text/javascript">
      window.dUD = ${JSON.stringify(user)}
      window.dAS = ${JSON.stringify({activityTypes, locationCategories})}
    </script>
    <script src="/bundle.js"></script>
  </html>`
