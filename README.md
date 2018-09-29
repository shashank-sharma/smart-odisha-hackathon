# Smart Odisha Hackathon

[![Heroku](http://heroku-badges.herokuapp.com/?app=soh-cyber&style=flat)](http://soh-cyber.herokuapp.com/)

1. Virtual Environments
While working with python projects it is important to keep your project environment seperate from your local one. With environment we are talking about the dependencies for any particular project. We keep it seperate so that there is no conflicts, have clean project and use those packages which are required. So we start with empty environment and then we install everything from there.

Assuming you have Linux OS we will do that by:

python -m venv myvenv

Explanation:

python -m <virtual environment> <file-name>

Obviously this is not the only method, there are other ways to do this so try searching for it and use that is comfortable for you.

Now this command will install Virtual environment in that present directory (e-library). Now assuming that you have myvenv folder so we need to activate it. Activation is used to activate that partiuclar environment for present session. So to do that:

source myvenv/bin/activate

Note: Your virtualenv file must be myvenv.

Now as soon as you will type this, you will see that virutal env is activated by showing: (myvenv at left hand side of your command.

Now this needs to be done when you clone this repository, so that you can have all those dependencies seperate which are required by this project and have minimum error while building it. Try typing pip freeze and this will show all the dependencies which are installed on that particular virtual environment.

Note: pip is python package manager, it is used to install packages

2. Installing Dependencies
Ok so we have virtual environment set up, now your next step is to set up all the packages and install it. Normally at starting we do most of the things by hand and typing installation commands but when working in project we avoid these things and we simplify things by creating one file called requirements.txt which tells us that what are the packages we are using in current project and with one line of command we can install it. So to do that:

pip install -r requirements.txt

So it will install all the requirements recursively line by line and it will be much better than typing each command line by line.

3. Database configuration
Database configuration is important because in Django when we create models, we need to migrate them. Which means that whatever rules you have specified in models.py file you need to convert that code into database and create those fields at that time. So creating such tables and database is called migration. So whenever you create/change models in Django you need to migrate them so that changes will get affected in database.

By default Django uses mySQL but right now we will use postgreSQL. Generally there is an advantage using this because in case in future if we will rely of JSON type of request and response then we need to save JSON in database and in this case postgreSQL is much better.

Now to set up:

Installation may vary for Ubuntu/Windows so take help of the internet.

Install Postgresql in your local machine and then later you will be able to access it by 'psql' in command line. In case of error try to search it and find answer.

After using psql in command line, it should look something like this:

psql (9.5.11)
Type "help" for help.

postgres=#
Now here we will type and create our first user with password.

CREATE ROLE name WITH LOGIN PASSWORD 'password';

Explanation:

CREATE ROLE <USER> WITH LOGIN PASSWORD <PASSWORD>

Now create one database which will be use by Django to store data

create database library;

Explanation:

CREATE DATABASE <DATABASE_NAME>

Now we will provide all the privileges for the user so that django can use it and create tables in that database.

GRANT ALL PRIVILEGES ON DATABASE library TO name;

Explanation:

GRANT ALL PRIVILEGES ON DATABASE <DATABASE_NAME> TO <USER>

Now after typing this you will create one postgres url which will be used by django to access/modify/delete/create table from database. Because at the end we need to tell Django where to look up for database. Even URL is really a great way to interact because let us say you need to set up one database online, so you can host one database from another provider and specigy URL over here. By this you will be working on local machine but the database will be hosted online on another server and what you just changed is one URL.

DATABASE_URL: postgresql://name:password@localhost/library

Explanation: postgresql://<user>:<password>@localhost/<database_name>

IMPORTANT: After creating database the tables which will be created by Django will not be modified by you until and unless you know what you are doing.

4. Setting up environemnt secrets
Working in public repository obviously you will not be sharing your secrets. With secrets I am talking about password, secret key or database url. So to avoid that we create one file called .env. This file is usually hidden but can be accessed locally. But usually we don't upload these information in repository and we encourage you to configure it by your own. So currently there are 2 main things you need to add in .env file.

First create .env file and then type:

SECRET_KEY=<YourSecretKey>

To avoid any conflicts you can ask secret key from admin or use your own. And second is:

DATABASE_URL=postgresql://name  :password@localhost/library

If you followed the same procedure as mentioned in Database configuration section then the URL will be same just like this, else if you have choosen different username then edit those fields. Now you have everything set up.

There is one more configuration which is PRODUCTION=False, but if you will not type anything or ignore it then also it will work fine.

Note: When working in git version control system, we have one file called .gitignore, this tells us that what files we need to ignore when pushing the changes. So currently we add .env in gitignore file so that this particular file will never be uploaded in repository and by this you will avoid publishing your secrets.

5. Migration
Now we have database set up, so let's migrate few things. As I mentioned earlier when we migrate something then we change/create database, by default there are models available and used by Django even if you create it from scratch for example: Authentication, Sessions etc. So to migrate those type:

python manage.py makemigrations

python manage.py migrate

These 2 steps are important and make sure you do it correctly. In case if you find error and you are confused what to do next or how to solve it, then seek help with our team. Once you migrate you should see everything saying OK.

Final step, Run the application:

Now you have virtual environemnt, dependencies, database so let's run it. To do that type:

python manage.py runserver
