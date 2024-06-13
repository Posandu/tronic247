---
title: 'PHP Login System'
date: '2021-02-28'
categories: ['php', 'web-dev']
img: /wp-content/uploads/2021/02/hqdefault.jpg
updated: '2024-06-13'
---

{% component OldNotice/oldnotice.svelte %}

Today I will tell you how to create a login system with PHP.

Okay let's get started.

## 1st step

First watch this video to get a idea.

{% youtube id="76aHMLfEti0" title="PHP Login System" %}

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
