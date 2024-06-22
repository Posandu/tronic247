---
title: 'Creating a Github Gist Clone with PHP'
date: '2021-11-14'
categories: ['css', 'html-tutorials', 'javascript', 'mysql', 'php']
tags: ['css', 'mysql']
updated: '2024-06-13'
excerpt: In this post, we'll create a site like Github Gist using PHP, CSS, and a line of JavaScript!
---

In this post, We'll create a site like [Github Gist](https://gist.github.com) using PHP, CSS and a 1 line of JavaScript! A preview of what we're creating is below.

![A preview of what we're creating](https://user-images.githubusercontent.com/76736580/139574909-3f9d95dc-1934-4a8a-a0a3-29e216650763.gif)

## Contents

## Collecting the stuff we need

Before we begin, you must have these things.

- A local server
- A code editor (I use Visual Studio Code)
- Basic Knowledge of CSS, HTML & PHP
- A MySQL Database

## Getting Started

### Creating the files

Now, let's start. The first thing is to do, create the files. The files are,

- `index.php` - The index file
- `config.php` -The configuration file
- `gist.php` - The gist view/delete file
- `gists.php` - The file that shows all the gists
- `styles.css`\- The stylesheet

### Creating the database

We will create a database named `gists` and create a table named `gists`. The table structure will look like this.

| title  | content    | type        | id     |
| ------ | ---------- | ----------- | ------ |
| unique | mediumtext | varchar(40) | unique |

If you are too lazy to create the table, you can use this SQL code.

```sql
CREATE TABLE `gists` (
  `title` varchar(99) NOT NULL,
  `content` mediumtext NOT NULL,
  `type` varchar(40) NOT NULL,
  `id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `gists`
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `title` (`title`);
COMMIT;
```

## Coding

And It's time for the coding. We'll first define the database connection constants. Put this in your `config.php` file.

```php
$servername =  "localhost";
$username =  "root";
$password =  "";
$database =  "gist";

try {
	$conn =  new  PDO("mysql:host=$servername;dbname=$database", $username, $password);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
	echo  "<div class=\"message error\">Connection failed: "  . $e->getMessage().  "</div>";
	define('ERROR', true);
}

// Generate random string function
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString. = $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
```

We use [PDO](https://www.php.net/manual/en/book.pdo.php) because It's easy & secure.

Then, in all the other PHP files (Not `config.php`) put this code.

```php
<!DOCTYPE  html>
<html  lang="en">
<head>
<meta  charset="UTF-8">
<meta  http-equiv="X-UA-Compatible"  content="IE=edge">
<meta  name="viewport"  content="width=device-width, initial-scale=1.0">
<link  rel="stylesheet"  href="styles.css">
<title>My Own Gist</title>
</head>
<body>
	<div  id="container">
		 <!-- This is where we put code -->
	</div>
</body>
</html>
```

This is the template we're going to use. And for the CSS, you can style yourself (Edit styles.css) or [Go to this link](https://gist.github.com/Posandu/d0e7809ee513aeaf1bdbc7b5703a35c6) to get the demo CSS code.

## Create A New Gist Page

This is the code for the create new gist page. (`index.php`)

```php
require "config.php";
$e=$m="";
if ( isset($_GET['create']) && isset($_POST['title']) && isset($_POST['content']) && isset($_POST['type'])) {
    if (empty($_POST['title']) or empty($_POST['content']) or empty($_POST['type'])) {
        $e=true;
        $m="Please fill all the fields";
    }
    else {
        try {
            $stmt=$conn->prepare("INSERT  INTO gists (`title`, `content`, `type`, `id`)
 VALUES (:title, : content, :type, :id)");
 $stmt->bindParam(':title', $tit);
            $stmt->bindParam(':content', $cont);
            $stmt->bindParam(':type', $type);
            $stmt->bindParam(':id', $id);
            switch ($_POST['type']) {
                case "1": $type="";
                break;
                case "2": $type="css";
                break;
                case "3": $type="javascript";
                break;
                case "4": $type="php";
                break;
                case "5": $type="xml";
                break;
                case "6": $type="jsx";
                break;
                case "7": $type="c#";
                break;
                default: $type="";
            }
            $tit=$_POST['title'];
            $cont=$_POST['content'];
            $type=$type;
            $id=generateRandomString(10);
            $stmt->execute();
            $e=false;
            $m="Gist added";
            header("Location: gist.php?id=".$id);
        }
        catch (PDOException $er) {
            $e=true;
            $m=$er->getMessage();
        }
    }
}
?>
```

Now, I'll explain what this code does. First, it checks if `$_GET["create"]` , `$_GET["title"]` , `$_GET["content"]`,`$_GET["type"]` is present. Then, it will check if the values are empty. If it's empty, set the `$e` variable to `true` else it will try to add the data into the database and if there's a error it'll tell the user.

Now add this inside the `#container` of `index.php`.

```php
<?php if (defined("ERROR")) {
            die("An error occured");
        } ?>
<?php
  if ($e) {
            echo "<div class=\"message error\">" . $m . "</div>";
    }
?>
    <h1 class="heading">Add new Gist</h1>
    <!---- ---->
    <div class="divider"></div>
    <!---- ---->
    <form action="?create" id="newgist" method="POST">
        <!---- ---->
        <label for="gist-title" class="label">Title</label>
        <input type="text" id="gist-title" name="title" class="input">
        <!---- ---->
        <label for="gist-content" class="label">Content</label>
        <textarea id="gist-content" name="content" class="input" style="height: 200px;font-family: monospace;font-size: 15px;"></textarea>
        <!---- ---->
        <label for="gist-type" class="label">Type</label>
        <select name="type" id="gist-type" class="input">
                <option value="1">Plain text</option>
                <option value="2">CSS</option>
                <option value="3">Javascript</option>
                <option value="4">PHP</option>
                <option value="5">HTML</option>
                <option value="6">JSX</option>
                <option value="7">C#</option>
            </select>
        <!---- ---->
        <div class="divider"></div>
        <!---- ---->
        <button type="submit" class="btn">Create Gist</button>
    </form>
    <!---- ---->
    <div class="divider"></div>
    <div class="divider"></div>
    <div class="divider"></div>
    <!---- ---->
<a href="gists.php" class="btn">Show other gists</a>
```

## Single gist page

And in the `gist.php` file, add this code

```php
<?php require "config.php";
if ( !isset($_GET["id"])) {
    die("Not Found");
}

if (isset($_GET["delete"])) {
    if (isset($_GET['confirm'])) {
        try {
            $stmt=$conn->prepare("DELETE FROM Gists WHERE `id` = :id");
            $stmt->bindParam(':id', $_GET["id"]);
            $stmt->execute();
            header("Location: gists.php");
        }
        catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
    die("<a href=\"gist.php?delete&id=" . $_GET["id"] . "&confirm=true\">Click to confirm</a><br><br><br><a class=\"btn\" href=\"gist.php?id=" . $_GET["id"] . "\">Click to go back</a>");
    die();
}

try {
    $stmt=$conn->prepare("SELECT * FROM Gists WHERE `id` = :id");
    $stmt->bindParam(':id', $_GET["id"]);
    $stmt->execute(); // set the resulting array to associative
    $result=$stmt->fetchAll();
    if ( !isset($result[0]['id'])) {
        die("Not found");
    }
    else {
        $title=$result[0]['title'];
        $type=$result[0]['type'];
        $code=$result[0]['content'];
    }
}

catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

?>
<h1 class="heading"><?=htmlspecialchars($title) ?><sup><?=$type ?></sup></h1><pre><code class="language-<?= $type ?>"><?=str_replace("<", "<", $code) ?></code></pre><br><br><a href="gists.php" class="btn">Show other gists</a><a href="index.php" class="btn">Create Gist</a><a href="gist.php?delete&id=<?= $result[0]['id'] ?>" style="background: #ab0000;" class="btn">Delete</a>
```

And for the end of the body, add this code.

```php
<script  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js"></script>
<script>
hljs.highlightAll();
</script>
```

Ok, This is all this is all the hard stuff to do. So you can get the code from below.

## Get the source code.

Github: [https://github.com/Posandu/gist-php](https://github.com/Posandu/gist-php)
