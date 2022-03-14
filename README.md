# Udacity: Storefront Backend

## Setup

1. run `yarn install .`

2. create two databases

```sql
-- in psql
CREATE DATABASE storeback;
CREATE DATABASE storeback_test;
```

3. to initialize tables in development database run `yarn migrate-up`

4. when finished run `yarn migrate-down`

5. to run all the tests you can use `yarn test`

## Ports

- Database port : 5432
- Backend port : 3000

## Scripts

- `yarn build`
- `yarn start` "to run code"
- `yarn lint`
- `yarn test`
- `yarn migrate-up`
- `yarn migrate-down`

## .env

You can create a folder called `.env` and put in it these variables and adjust them to work with your database.

```env
POSTGRES_DB=store_backend
POSTGRES_DB_TEST=store_backend_test
POSTGRES_HOST=127.0.0.1
POSTGRES_HOST_test=127.0.0.1
POSTGRES_USER=test
POSTGRES_USER_TEST=test
POSTGRES_PASSWORD=test
POSTGRES_PASSWORD_TEST=test
PEPPER=test
SALT_ROUNDS=10
JWT_SECRET=test
ENV=dev
```

## API Endpoints

- The API documentation and endpoints can be found [here](REQUIREMENTS.md).

- You need to create user and attach the given token in the `Authorization` in the request headers to access the routes, which have token required.
