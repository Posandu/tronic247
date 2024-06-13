export default {
	files: {
		'index.html': `<!DOCTYPE html>
<html>

<head>
  <title>My first HTML page</title>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="/styles.css" />
</head>

<body>
  <h1>Hello world</h1>

  <script src="/index.js"></script>
</body>

</html>`,
    'styles.css': "h1 { color: red; }",
		'index.js': "console.log('Hello, world!');"
	}
};
