---
title: 'How to create a PHP login system'
date: '2021-02-28'
categories: ['php', 'web-dev']
---

> Please note that this post is for educational purposes only. As it was created in 2021, the code may be outdated. Please use it as a reference and update it as needed.

Today I will tell you how to create a login system with PHP.

Okay let's get started.

## 1st step

First watch this video to get a idea.

https://www.youtube.com/watch?v=76aHMLfEti0

Okay now first create a database named "demo".

Then add this code into the SQL console.

```sql
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
```

That's all download this file and extract to the location you want to execute the login system .

[Link](https://drive.google.com/drive/folders/1VOnH-BsQ2eGcpy4GRCXV5sqHVZPj0vKz?usp=sharing)
