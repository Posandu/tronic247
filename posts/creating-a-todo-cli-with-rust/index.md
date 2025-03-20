---
title: Creating a todo CLI with Rust
date: '2022-09-13'
categories: ['rust']
tags: ['cli', 'rust']
img: /wp-content/uploads/2022/09/Create-a-Todo-CLI-with-Rust.png
updated: '2024-06-13'
excerpt: A small tutorial on how to create a todo CLI application with Rust, using local JSON files to store the data.
---

In this article, we'll build a to-do CLI application with Rust. Local JSON files are used to store the data. Here's a preview of the app:

![todo app preview](https://raw.githubusercontent.com/Posandu/todo-app-rust/main/demo.gif)



Let's get started!

## Getting started

First, we create a new project with Cargo:

```bash
cargo new todo
```

Then, we add the following dependencies to the `Cargo.toml` file:

```toml
chrono = "0.4.22"
colorize = "0.1.0"
rand = "0.8.5"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0.85"
```

Here's what each dependency does:

- `chrono` is used to get the current date and time.
- `colorize` is used to color the output.
- `rand` is used to generate random IDs.
- `serde` and `serde_json` are used to get the data from the JSON file.

## Creating the folder structure

Our `src` folder will look like this:

```bash
src
 ┣ app
 ┃ ┗ mod.rs # The app module
 ┣ structs
 ┃ ┗ mod.rs # The structs
 ┣ todo
 ┃ ┗ mod.rs # Todo related functions
 ┣ utils
 ┃ ┗ mod.rs # Utility functions
 ┗ main.rs # The main file
```

Now, in the `main.rs` file, I'll import all modules:

```rust
mod utils;
mod structs;
mod todo;
mod app;

fn main() {
    // ...
}
```

## Creating the structs

Before we start, let's create the structs that we'll use to store the data. In the `structs/mod.rs` file, we'll create the following structs:

```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Todo {
    pub created_at: String,
    pub title: String,
    pub done: bool,
    pub id: u32,
    pub updated_at: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ConfigFile {
    pub data: Vec<Todo>,
}
```

## Creating the utility functions

In the `utils/mod.rs` file, we'll import the dependencies and create the utility functions:

```rust
use crate::structs;
use chrono;
use colorize::*;
use rand::prelude::*;
use serde_json::from_str;
use serde_json::Result;
use std::{fs, io::Write};
```

The first function is to create the global data file if it doesn't exist:

```rust
pub fn init() {
    // Check if folder exists
    if !fs::metadata("C:\\.todobook").is_ok() {
        fs::create_dir("C:\\.todobook").unwrap(); // Create folder

        // Create file
        let mut file = fs::File::create(DATA_FILE).unwrap();

        // Write to file
        file.write_all(b"{\"data\":[]}").unwrap();

        println!("{} {}", "Created folder and file".green(), DATA_FILE);
    }

    // Check if file exists
    else if !fs::metadata(DATA_FILE).is_ok() {
        // Create file
        let mut file = fs::File::create(DATA_FILE).unwrap();

        // Write to file
        file.write_all(b"{\"data\":[]}").unwrap();

        println!("{} {}", "Created file".green(), DATA_FILE);
    }
}
```

The next function is to read the arguments from the command line. Before creating a function, we define a struct called `Command` in the `structs` module:

```rust
pub struct Command {
    pub command: String,
    pub arguments: String,
}
```

Now, we can create the `get_args` function.

```rust
pub fn get_args() -> structs::Command {
    let args = std::env::args().collect::<Vec<String>>(); // Get arguments and collect them into a vector

    let command = args.get(1).unwrap_or(&"".to_string()).to_string(); // Get command or set it to an empty string
    let arguments = args.get(2).unwrap_or(&"".to_string()).to_string(); // "" arguments or ""

    structs::Command { command, arguments } // Return the command and arguments
}
```

The next function returns a timestamp.

```rust
pub fn get_timestamp() -> String {
    let now = chrono::Local::now();
    let timestamp = now.format("%m-%d %H:%M").to_string();

    timestamp
}
```

After that, we create a function to generate a random ID:

```rust
pub fn get_id() -> u32 {
    // Genrate number between 1 and 1000
    let mut rng = rand::thread_rng();
    let id: u32 = rng.gen_range(1..1000);

    id + rng.gen_range(1..1000)
}
```

The next function is to read the data from the JSON file:

```rust
pub fn get_todos() -> Result<Vec<structs::Todo>> {
    let data = fs::read_to_string(DATA_FILE).unwrap();
    let todos: structs::ConfigFile = from_str(&data)?;

    Ok(todos.data)
}
```

The last function is to write the data to the JSON file:

```rust
pub fn save_todos(todos: Vec<structs::Todo>) {
    let config_file = structs::ConfigFile { data: todos };
    let json = serde_json::to_string(&config_file).unwrap();

    let mut file = fs::File::create(DATA_FILE).unwrap();
    file.write_all(json.as_bytes()).unwrap();
}
```

And, that's it for the utility functions.

## Creating the todo functions

Now, we create the functions that will be used to add, remove, and list todos. In the `todo/mod.rs` file, import the dependencies.

```rust
use crate::structs::Todo;
use crate::utils;
use colorize::*;
```

The first function is to add a todo:

```rust
pub fn add(title: String) {
    if title.len() < 1 { // Check if title is empty
        println!("{}", "No title provided".red());

        return;
    }

    let mut todos = utils::get_todos().unwrap(); // Get todos

    let todo = Todo {
        created_at: utils::get_timestamp(),
        title,
        done: false,
        id: utils::get_id(),
        updated_at: utils::get_timestamp(),
    };

    todos.push(todo); // Push todo to todos

    utils::save_todos(todos); // Save todos

    println!("{}", "Added todo".green());
}
```

The next function is to list todos:

```rust
pub fn list() {
    let todos = utils::get_todos().unwrap();

    if todos.len() == 0 {
        println!("{}", "No todos".red());
        return;
    }

    println!(
        "{0: <5} | {1: <20} | {2: <20} | {3: <20} | {4: <20}",
        "ID", "Title", "Created at", "Updated at", "Done"
    );

    println!();

    for todo in todos {
        println!(
            "{0: <5} | {1: <20} | {2: <20} | {3: <20} | {4: <20}",
            todo.id,
            todo.title,
            todo.created_at,
            todo.updated_at,
            if todo.done { "Completed ?".green() } else { "No ?".red() }
        );
    }
}
```

We then create a function to mark a todo as done:

```rust
pub fn done(id: String) {
    let mut todos = utils::get_todos().unwrap();
    let id = id.parse::<u32>().unwrap_or(0);

    let exists = todos.iter().any(|todo| todo.id == id);

    if !exists {
        println!("{}", "Todo not found".red());
        return;
    }

    for todo in &mut todos {
        if todo.id == id {
            todo.done = true;
            todo.updated_at = utils::get_timestamp();
        }
    }

    utils::save_todos(todos);

    println!("{}", "Marked todo as done".green());
}
```

The next function is to remove a todo:

```rust
pub fn remove(id: String) {
    let mut todos = utils::get_todos().unwrap();
    let id = id.parse::<u32>().unwrap_or(0);

    let exists = todos.iter().any(|todo| todo.id == id);

    if !exists {
        println!("{}", "Todo not found".red());
        return;
    }

    todos.retain(|todo| todo.id != id);

    utils::save_todos(todos);

    println!("{}", "Removed todo".green());
}
```

Now, we have all the functions we need to create a todo app. We should integrate and make it work.

## Integrating the functions

In the `app/mod.rs` file, import the dependencies.

```rust
use crate::todo::*;
use crate::utils;
use colorize::*;
```

We export a start function that will be called in the `main.rs` file.

```rust
pub fn start() {
    // ...
}
```

We first check and create the data file if it doesn't exist:

```rust
utils::init();
```

We then get the command and arguments:

```rust
let args = utils::get_args();
```

We then match the command and call the appropriate function:

```rust
match args.command.as_str() {
    "a" => add(args.arguments),
    "l" => list(),
    "d" => done(args.arguments),
    "r" => remove(args.arguments),
    "q" => std::process::exit(0),
    _ => {
        /// SHOW HELP
    }
}
```

As for the help, we do this.

```rust
println!("{}", "            No command found - Showing help".black());

let help = format!(
    "
    {} {}
    {}
    -----

    Help:

    Command   | Arguments | Description
    {}           text        Add a new todo
    {}                       List all todos
    {}           id          Mark a todo as done
    {}           id          Delete a todo
    ",
    "Welcome to".grey(),
    "TodoBook".cyan(),
    "Simple todo app written in Rust".black(),
    "a".cyan(),
    "l".blue(),
    "d".green(),
    "r".red()
);

println!("{help}");
```

Now, in the `main.rs` file, add this function call:

```rust
fn main() {
    app::start();
}
```

Now, we can run the app using `cargo run`. You should see something like this:

![](https://user-images.githubusercontent.com/76736580/189867561-446dc806-c8b2-46bd-b2db-07ddca4625c9.png)

## Conclusion

Thanks for reading. I hope you enjoyed this tutorial. If you have any questions, feel free to ask in the comments. You can also check out the source code [here](https://github.com/Posandu/todo-app-rust/tree/main).

```

```

```

```
