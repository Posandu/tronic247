---
title: Simple static site generator with Rust
date: '2022-09-06'
categories: ['rust']
tags: ['html', 'rust']
img: /wp-content/uploads/2022/09/Create-a-simple-static-site-generator-1.png
updated: '2024-06-13'
excerpt: A simple static site generator written in Rust.
---

This is a simple static site generator written in Rust. It is a simple example of how to use Rust programming to create fast and efficient static site generators. PS: I made this for fun and learning purposes, so don't expect it to be perfect.



## Getting started

First, I'll create a new project with Cargo:

```sh
cargo new my-site
```

Then, I'll add the following dependencies to the `Cargo.toml` file:

```toml
[dependencies]
comrak = "0.14"
```

## Project structure

The project structure will be as follows:

```
hello-world
 ┣ content
 ┃ ┣ out
 ┃ ┗ src
 ┃ ┃ ┣ about.md
 ┃ ┃ ┗ home.md
 ┣ src
 ┃ ┗ main.rs
 ┣ .gitignore
 ┣ Cargo.lock
 ┣ Cargo.toml
```

## Writing the code

First, we'll import the libraries we need:

```rust
use comrak::markdown_to_html; // Markdown parser
use std::fs; // File system
```

Then, we'll create a struct to hold the content of the markdown files.

```rust
struct File {
    name: String,
    content: String,
}
```

After that, in the `main` function, we'll define some variables and constants.

```rust
// Constants
let src_dir = String::from("./content/src");
let out_dir = String::from("./content/out");

// The vector of files to be processed
let mut files: Vec<File> = vec![];
let mut files_compiled: Vec<File> = vec![];
let mut index = String::from("<ul>");
```

We will create a function to read the files in the `src` directory and add them to the `files` vector.

```rust
fn add_files(files: &mut Vec<File>, path: String) {
    // Read the directory
    fs::read_dir(path).unwrap().for_each(|entry| {
        let entry = entry.unwrap();
        let path = entry.path();
        let name = path.file_name().unwrap().to_str().unwrap().to_string();

        // If the entry is a file, add it to the vector
        if path.is_dir() {
            // .. Ignore directories
        } else {
            let content = fs::read_to_string(path).unwrap();
            files.push(File { name, content });
        }
    });
}
```

Now, we'll call the `add_files` function to add the files to the `files` vector.

```rust
add_files(&mut files, src_dir);
```

Now, If we add `#[derive(Debug)]` to the `File` struct, we can print the files to the console.

```rust
println!("{:#?}", files);
```

If did everything correctly, you should see something like this:

```bash
[
    File {
        name: "about.md",
        content: "# About\n\nThis is the about page.\n",
    },
    File {
        name: "home.md",
        content: "# Home\n\nThis is the home page.\n",
    },
]
```

Now, we'll add compiled files to the `files_compiled` vector.

```rust
for file in files {
    let content = markdown_to_html(&file.content, &comrak::ComrakOptions::default());

    files_compiled.push(File {
        name: file.name,
        content,
    });
}
```

And finally, we'll write the compiled files to the `out` directory.

```rust
files_compiled.iter().for_each(|file| {
    fs::write(
        format!("{}/{}", out_dir, file.name.replace(".md", ".html")),
        &file.content,
    )
    .unwrap();
    println!("Wrote file: {}", file.name);
});
```

To finish, we'll add the files to the `index` variable.

```rust
for file in &files_compiled {
    index.push_str(&format!(
        "<li><a href=\"{}\">{}</a></li>",
        file.name.replace(".md", ".html"),
        file.name.replace(".md", "")
    ));
}
index.push_str("</ul>");
fs::write(format!("{}/{}", out_dir, "index.html"), &index).unwrap();
```

Now, if we run the program, the `out` directory should look like this:

```
out
 ┣ about.html
 ┣ home.html
 ┗ index.html
```

## Improvements

We'll add some messages to the console to make it more user-friendly. The final code should look like this:

```rust
use comrak::markdown_to_html;
use std::fs;

#[derive(Debug)]
struct File {
    name: String,
    content: String,
}

fn main() {
    // Constants
    let src_dir = String::from("./content/src");
    let out_dir = String::from("./content/out");

    // The vector of files to be processed
    let mut files: Vec<File> = vec![];
    let mut files_compiled: Vec<File> = vec![];
    let mut index = String::from("<ul>");

    // Delete the output directory
    println!("Deleting old files...");
    fs::remove_dir_all(&out_dir).unwrap_or_else(|_| {
        println!("No old files to delete.");
    });

    // Create the output directory
    fs::create_dir(&out_dir).unwrap();

    // Read the files in the source directory
    println!("Reading files...");
    add_files(&mut files, src_dir);

    // Compile the files
    println!("Compiling files...");

    for file in files {
        let content = markdown_to_html(&file.content, &comrak::ComrakOptions::default());

        files_compiled.push(File {
            name: file.name,
            content,
        });
    }

    // Write the compiled files to the output directory
    println!("Writing files...");
    files_compiled.iter().for_each(|file| {
        fs::write(
            format!("{}/{}", out_dir, file.name.replace(".md", ".html")),
            &file.content,
        )
        .unwrap();

        println!("Wrote file: {}", file.name);
    });

    // Write the index file
    println!("Writing index...");
    for file in &files_compiled {
        index.push_str(&format!(
            "<li><a href=\"{}\">{}</a></li>",
            file.name.replace(".md", ".html"),
            file.name.replace(".md", "")
        ));
    }
    index.push_str("</ul>");
    fs::write(format!("{}/{}", out_dir, "index.html"), &index).unwrap();

    // Done
    println!("Done!");
}

fn add_files(files: &mut Vec<File>, path: String) {
    // Read the directory
    fs::read_dir(path).unwrap().for_each(|entry| {
        let entry = entry.unwrap();
        let path = entry.path();
        let name = path.file_name().unwrap().to_str().unwrap().to_string();

        // If the entry is a file, add it to the vector
        if path.is_dir() {
            // .. Ignore directories
        } else {
            let content = fs::read_to_string(path).unwrap();
            files.push(File { name, content });
        }
    });
}
```

## Conclusion

I made an executable from this and to compile 100 md files it took less than 1ms! In case you need all the source code, get it from [here](https://github.com/Posandu/simple-static-site-generator).
