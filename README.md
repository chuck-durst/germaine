**Germaine is an ExpressJs middleware that allows you to quickly deploy an API that listens on a given endpoint and serves content from a JSON file.**




# Features

-   dependency free
-   lightweight (3Ko)
-   super-fast
-   delay simulator (for lazy loading tests)
-   dynamic reading
-   Define your endpoints in a funny way :)




# Installing

Using npm:

    $ npm install germaine

Using bower:

    $ bower install germaine




# API

## germaine(path\[, config])

**path**

The path to the file used as database. It can be JSON or JavaScript.



**config**

| **NAME** |                                  **TYPE**                                 | **DESCRIPTION**                                                                                                                                                                                                                    |
| :------- | :-----------------------------------------------------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| isStatic | boolean                                                **Default**: false | By default, the file will be read **each time the url is called**. This allows you to update the content at any time without having to restart the whole server. You can disable this feature by setting **isStatic** to **true**. |
| delay    | int,object                                             **Default**: 0     | You can add a custom delay (**ms**) to the requests. This is useful to simulate lazy loading for example.  You can also provide an object with the **min** and **max** properties to randomise the delay.                          |






# Example

    const express  = require('express');

    const germaine = require('../index');

    const path     = require('path');

    const app = express();

    app.get(

      '/germaine/*', 

      germaine(path.resolve(__dirname, './example-database.json'))

    );

    app.listen(3030, function () {

      console.log('germaine listening on localhost:3030/germaine!');

    });




# How it works

Let's assume that this JSON represents your database:



    {

      "pages": {

        "home": {

          "title": "Home page",

          "content": {

            "intro": "..."

          }

        },

        "bio": {

          "title": "About myself"

        },

        "content": {

          "lastProject": "Germaine"

        }

      }

    }



With germaine, you can get access at **any depth segment** of the file from the url.



For example, you can **get the content of the homepage** this way :

    GET /germaine/pages/home



But you can also **only ask for the page title**!

    GET /germaine/pages/home/title



This let you define more or less complexes structures and **sort your content** very easily! 




# When should I use this?



-   When you only need to get **static content** from a server
-   For building **tests**
-   When you have to build something that needs to make **simple API calls**, but the API has not been developed




# Can I use it on production?

Yes **of course**! Germaine is a **simple middleware for express**, so it's up to you to add any restrictions and controls you which. 




# What about multi-language?

Germaine would like not to overweight. She therefore does not prefer to transform herself into a multi-function toolbox but remain herself, simple. However, it is always possible for you to cheat a little :

    const express  = require('express');

    const germaine = require('../index');

    const path     = require('path');

    const app = express();

    app.get('/germaine/*', (req, res) => {

      if (headers['content-language']) {

        const path = `database-${headers['content-language']}.json`;

        return germaine(path.resolve(__dirname, path)(req, res);

      }

    }));

    app.listen(3030, function () {

     console.log('germaine listening on localhost:3030/germaine!');

    });




# And if I want to use several JSON files?



Germaine would like not to overweight. She therefore does not prefer to transform herself into a multi-function toolbox but remain herself, simple. However, it is always possible for you to cheat a little :



    const express  = require('express');

    const germaine = require('../index');

    const path     = require('path');

    const app = express();

    app.get(

      '/germaine/pages*', 

      germaine(path.resolve(__dirname, './pages-database.json'))

    );

    app.get(

      '/germaine/articles*', 

      germaine(path.resolve(__dirname, './articles-database.json'))

    );

    app.listen(3030, function () {

    console.log('germaine listening on localhost:3030/germaine!');

    });




# License

MIT

