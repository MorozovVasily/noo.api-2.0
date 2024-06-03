# Structure:
* Backand is here: https://github.com/sannnekk/noo.api-2.0
* Frontend is here: https://github.com/sannnekk/noo.web
# How to setup:
## You will need:
<details>
<summary>Fake SMTP</summary>

# Insatall Fake SMTP
For this perpuse you can use any Fake SMTP service

For example https://github.com/mailhog/MailHog
## MacOS:
```sh
brew update && brew install mailhog
```
### Run:
```sh
MailHog
```

<details>
<summary>Tips and Trics</summary>

* Access GUI via http://localhost/phpmyadmin
* CI via `/Applications/XAMPP/xamppfiles/bin/mysql -u root`
</details>

</details>

<details>
<summary>Insatall MySQL DB</summary>

# Insatall MySQL DB
For example you can use [xampp](https://www.google.com/search?q=xampp)

</details>

<details>
<summary>Backand</summary>

# Download
```sh
git clone https://github.com/sannnekk/noo.api-2.0
```
# Setup
### If it's your first time, you need to create schema in DB:
In [DataSource.ts](src/Core/Data/DataSource.ts) change `synchronize: false` -> `synchronize: true`
### Setup all dependencyes:
```sh
pnpm install
```
### Create .env file
With all credentials to your DB
For example:
```sh
DB_HOST=localhost
DB_PORT=3306
DB_NAME=test
APP_PORT=3000
```
### Run
```sh
npm run dev
```

</details>
<details>
<summary>Frontend</summary>

## Install:
```sh
git clone https://github.com/sannnekk/noo.web
```
## Run:
[Read Readme](https://github.com/sannnekk/noo.web)
</details>



<details>
<summary>A</summary>
</details>

