# Backend

## Endpoints

| Endpoint                       | Method  | Description                                                       |
| ------------------------------ | ------- | ----------------------------------------------------------------- |
| [/companies](#companies)       | `GET`   | Returns an array of all companies                                 |
| [/companies/:\_id](#companies) | `GET`   | Returns company information as object                             |
| [/items](#items)               | `GET`   | Returns an array of given amount and limit requested by user      |
| [/items/:name](#items)         | `GET`   | Returns an array of results of partial or full given name of item |
| [/auth/signup](#auth)          | `POST`  | Creates user and user's cart                                      |
| [/auth/signin](#auth)          | `POST`  | Authenticate user with signin                                     |
| [/auth/logout](#auth)          | `POST`  | Logout user                                                       |
| [/auth/refreshToken](#auth)    | `POST`  | Request a refresh token                                           |
| [/cart](#cart)                 | `GET`   | Get the current user's cart                                       |
| [/cart/checkout](#cart)        | `POST`  | Create new order                                                  |
| [/cart/deleteOne](#cart)       | `PATCH` | Remove item in cart                                               |
| [/cart/update](#cart)          | `PATCH` | Update cart item quantity                                         |
| [/cart/addOne](#cart)          | `PATCH` | Adds item to cart                                                 |

# Companies

## GET `/companies`

Successful requests return an array of objects structured this way:

### Query parameters

```js
start: number; // default 0
limit: number; // default 24
```

### Return

```json
[
  {
    "status": 200,
    "totalItems": 74,
    "start": 0,
    "limit": 74,
    "data": [
      {
        "_id": 19962,
        "name": "Barska",
        "url": "http://www.barska.com/",
        "country": "United States"
      }
    ]
  }
]
```

## GET `/companies/:\_id`

Get one company by id

### Return

```json
{
  "status": 200,
  "data": {
    "_id": 19962,
    "name": "Barska",
    "url": "http://www.barska.com/",
    "country": "United States"
  }
}
```

# Items

## GET `/items`

Get all products as an array

### Query parameters

```js
start: number; // default 0
limit: number; // default 24
```

### Return

```json
[
  {
    "status": 200,
    "totalItems": 348,
    "limit": 1,
    "start": 0,
    "data": [
      {
        "_id": 6543,
        "name": "Barska GB12166 Fitness Watch with Heart Rate Monitor",
        "price": "$49.99",
        "body_location": "Wrist",
        "category": "Fitness",
        "imageSrc": "someImgUrl",
        "numInStock": 9,
        "companyId": 19962
      }
    ]
  }
]
```

## GET `/items/:name`

Get one item by name

### Return

```json
{
  "status": 200,
  "data": [
    {
      "_id": 6561,
      "name": "Jawbone - Up Wristband (large) - Red",
      "price": "$51.99",
      "body_location": "Wrist",
      "category": "Lifestyle",
      "imageSrc": "someImgUrl",
      "numInStock": 3,
      "companyId": 18834
    }
  ]
}
```

# Auth

## POST `/auth/signup`

Create a new user

### Request Body

```json
{
  "email": "string", // required
  "password": "string", // required
  "firstName": "string", // required
  "lastName": "string", // required
  "phoneNumber": "string", // required
  "address": "string" // required
}
```

### Return

```json
{
  "status": "number",
  "message": "string",
  "accessToken": "string",
  "refreshToken": "string"
}
```

## POST `/auth/signin`

Sign in

## Request body

```json
{
  "email": "test1@email.com", // required
  "password": "<plain text>" // required
}
```

## Return

```json
{
  "status": "number",
  "accessToken": "string",
  "refreshToken": "string"
}
```

## POST `/auth/refreshToken`

Request a refresh token when an access token expires

### Request body

```json
{
  "refreshToken": "string" // required
}
```

### Return

```json
{
  "status": "number",
  "accessToken": "string",
  "refreshToken": "string"
}
```

## POST `/auth/logout`

Removes accessToken and refreshToken from redis

### Request body

```json
{
  "token": "string" // access token
}
```

### Return

Status `204`

### Request body

```json
{
  "refreshToken": "string" // required
}
```

### Return

```json
{
  "status": "number",
  "accessToken": "string",
  "refreshToken": "string"
}
```

# Cart

## GET `/cart`

Get the current user's cart

`Requires authorization`

### Return

```json
{
  "status": "number",
  "data": [
    {
      "_id": "number",
      "qty": "number",
      "brand": "string",
      "name": "string",
      "price": "number",
      "body_location": "string",
      "category": "string",
      "imageSrc": "string",
      "numInStock": "number",
      "companyId": "number"
    }
  ]
}
```

## POST `/cart/checkout`

Create a new order

`Requires authorization`

### Request body

```json
{
  "_id": "string", // required
  "creditCard": "number", // required
  "email": "string", // required
  "expiration": "string", // required
  "address": "string", // required
  "city": "string", // required
  "country": "string", // required
  "postalCode": "string" // required
}
```

### Return:

```json
{
  "status": 201,
  "message": "string",
  "orderId": "string" // Use this to redirect to users confirmation page
}
```

## PATCH `/cart/addOne`

Add an item to cart

`Requires authorization`

### Request body

```json
{
  "_id": "string",
  "qty": "number"
}
```

### Return

```json
{
  "status": "number",
  "message": "string"
}
```

## PATCH `/cart/deleteOne`

Remove item from cart

`Requires authorization`

### Request Body

```json
{
  "itemId": "string" // required
}
```

```json
{
  "status": "number",
  "message": "string"
}
```

## PATCH `/cart/update`

Update the quantity of an item in the cart.

`Requires authorization`

### Request body

```json
{
  "_id": "string", // required
  "updateQty": "string" // required
}
```

### Return

```json
{
  "status": "number",
  "message": "string"
}
```
