---
title: 'Create a SPA with PHP'
date: '2022-04-07'
categories: ['css', 'html-tutorials', 'tricks-and-tips', 'php']
tags: ['php', 'spa', 'javascript']
img: /wp-content/uploads/2022/05/Create-a-SPA-with-PHP.png
---

Today, we will create an SPA with PHP. Our output will look like this. (Ignore the speed of the GIF, compressing it made it look slower than it is somehow)
![](https://user-images.githubusercontent.com/76736580/165043071-fb26a311-1828-4464-8200-b3d7edd5bc49.gif)

## Contents

## Getting started

Our directory structure will be like this.

```php
spa
 ┣ about.php // A page
 ┣ footer.php  // Footer
 ┣ header.php  // Header
 ┣ index.php // The index page
 ┣ instantclick.min.js  // Our secret weapon
 ┗ utils.php // Some utils
```

Now create those files. Then, we'll make the header and footer templates.

`header.php`

```php
<header>
    <h1>
        PHP SPA
    </h1>
</header>
```

`footer.php`

```php
<footer>
    <p>
        Acme Inc
    </p>
</footer>
```

Now put that code in the correct PHP files (`header.php`, `footer.php`)
After that, we will make our utils in `utils.php`.
The first function is a utility for showing the title and adding styles.

```php
<?php
function head($title, $activepage)
{
    ob_start();
?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?= $title; ?></title>
        <style>
            * {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            .nav {
                display: flex;
                width: max-content;
            }

            .item {
                flex: 1;
                margin-right: 10px;
                background: #f6f6f6;
                font-size: 18px;
                padding: 7px 18px;
                border-radius: 4px;
                text-decoration: none;
                color: #504f4f;
            }

            .item:hover {
                background: #e7e7e7;
            }

            .item.active {
                background: #d9e8ff;
                color: #1f57dd;
            }

            .item.active:hover {
                background: #c7ddff;
            }
        </style>
    </head>

    <body>

    <?php
        require_once 'header.php';
        $pages = array("index", "about");
        echo "<div class='nav'>";

    foreach ($pages as $page) {
        if ($page == $activepage) {
            echo "<a href='$page.php' class='item active'>$page</a>";
        } else {
            echo "<a href='$page.php' class='item'>$page</a>";
        }
    }

    echo "</div>";
    return ob_get_clean();
}
```

Then we create another function to show the footer and require the javascript files.

```php
function footer()
{
    ob_start();
    require_once 'footer.php';
?>
        <script src="instantclick.min.js"></script>
        <script data-no-instant>
            InstantClick.init();
        </script>
    </body>

    </html>
<?php
    return ob_get_clean();
}
```

Now, we add these two functions to `utils.php`.

## Adding some pages

Now we add some pages so we can test our SPA.

### `index.php`
```php
<?php
require_once 'utils.php';
echo head('Home', 'index');
?>

<h1>
    Home!
</h1>
<p>
    Welcome to my website!
</p>

<pre id="javascript"></pre>

<style>
    h1 {
        color: #4a4f56;
    }
</style>

<script>
    document.getElementById('javascript').innerHTML = 'Hey! I\'m JavaScript!';
</script>

<?php
echo footer();
```

### `about.php`
```php
<?php
require_once 'utils.php';
echo head('Home', 'about');
?>

<h1>
    About!
</h1>
<p>
    Contact
</p>

<div id="form">
    <textarea id="message" cols="30" rows="10"></textarea>
    <button id="submit">
        Submit
    </button>
</div>

<style>
    #form {
        max-width: 400px;
    }

    #message {
        width: 100%;
        height: 100px;
        border: 1px solid #ccc;
    }

    #submit {
        padding: 10px 20px;
        margin-top: 10px;
        background-color: #4a4f56;
        color: #fff;
        border: none;
        border-radius: 100px;
    }
</style>

<script>
    document.getElementById('submit').onclick = _ => alert("Message: " + document.getElementById('message').value);
</script>

<?php
echo footer();
```

Now let's see what we've got!

![](https://user-images.githubusercontent.com/76736580/165046398-f090b8fc-b6d8-482c-8c3b-a1cbf362ccf6.png)

Now we'll add our SPA functionality. We will use the [Instantclick](http://instantclick.io/) library for this. Just download [this file](http://instantclick.io/v3.1.0/instantclick.min.js) and replace the `instantclick.min.js` file in our project!

That's all you need to do. You now have created an SPA with PHP.

## Conclusion

You can check the source code [here](https://github.com/Posandu/php-single-page-application).
