# Demo Backend Project(Management Portal)

## Description

This project demonstrates backend service using NodeJS and ExpressJS.

### Code Structure

This project mainly 4 sub folders:-

1. `configs` - files related to config such as database
2. `controllers` - files related to controller which will be used at route and handle response
3. `middlewares` - files related to services used before api logic called such input or jwt validation
4. `repositories` -  files keep any query and database calls
5. `routes` - files to maintain all api route
6. `services` - files keep all the logic for all the api
7. `utils` - files keep util service such as logger with winston
4. `validations` - files keep all api validation schema

> **\*Note**:\* > _Deployed in AWS 
> Lambda Endpoint: https://ciqddmcspj.execute-api.ap-southeast-1.amazonaws.com/

## Stack and lib used

- NodeJS
- ExpressJS
- JWT
- BcryptJS
- Axios
- Node Postgres
- Lodash
- Winston

## Requirement

- Node
- Yarn
- PostgresSQL database
- Docker

## Usage

### Deployment

Install dependencies with:

```
yarn install
```
Run locally: 

```
yarn start:dev
```

## API

Below are list of API routes in this project:-
| No. | Method | Path                  | Remark                                               |
|-----|--------|-----------------------|------------------------------------------------------|
| 1   | GET    | /health               | Health check & used to test connection               |
| 2   | GET    | /auth/login           | User login                                           |
| 3   | POST   | /auth/                | Create new user                                      |
| 4   | POST   | /auth/refresh-token   | Get new access token                                 |
| 5   | GET    | /category             | Get all category                                     |
| 6   | GET    | /category/:categoryId | Get single category by category id                   |
| 7   | POST   | /category             | Create new category                                  |
| 8   | POST   | /category             | Update category by category id                       |
| 9   | DELETE | /category/:categoryId | Delete category by category id                       |
| 10  | GET    | /post                 | Get all post                                         |
| 11  | GET    | /post/:postId         | Get single post by category id                       |
| 12  | POST   | /post                 | Create new post                                      |
| 14  | POST   | /post                 | Update post by post id                               |
| 15  | DELETE | /post/:postId         | Delete post by post id                               |
| 16  | POST   | /membership/purchase  | To upgrade to Premium membership                     |
| 17  | POST   | /membership/callback  | For Billplz server to call once the payment complete |