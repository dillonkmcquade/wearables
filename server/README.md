# Backend

**OPTIONAL: You can document your endpoints in this file.**

## Endpoints

| Endpoint                          | Method | Description                                                       |
| --------------------------------- | ------ | ----------------------------------------------------------------- |
| [/companies](#companies)          | `GET`  | Returns an array of all companies                                 |
| [/companies/:\_id](#companies_id) | `GET`  | Returns company information as object                             |
| [/items](#items)                  | `GET`  | Returns an array of given amount and limit requested by user      |
| [/items/:name](#itemsname)        | `GET`  | Returns an array of results of partial or full given name of item |
| [/signup](#signup)                | `POST` | Creates user and user's cart                                      |
| [/signin](#signin)                | `POST` | Authenticate user with signin                                     |
| [/checkout](#checkout)            | `POST` | Create new order                                                  |
| [/add-item-to-cart/:cartId](#addItemToCart) |  `PATCH` | Adds item to user cart Document |

## /companies

### Query parameters

Requests can be given optional query parameters `start` and `limit` like so:

```js
fetch("/companies?start=5&limit=50");
```

### Return

Successful requests return an array of objects structured this way:

```json
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
```

## /companies/:\_id

Successful requests return an object:

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

## /items

### Optional Parameters: limit=`number`, start=`number`

How to use this endpoint

- To specify the limit and start parameters, append them to the URL as query parameters.
  Example: /items?limit=10&start=20
- The "limit" parameter determines the maximum number of items to retrieve (default is 25).
- The "start" parameter determines the index to start retrieving items from (default is 0).
- Adjust the values of "limit" and "start" as per your requirements.
- By default the start is 0 and the limit is 25
- the return of the data will be in an array

```json
{
  "status": 200,
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
  ],
  "totalItems": 348,
  "limit": 1,
  "start": 0
}
```

## /items/:name

How to use this endpoint

Parameters:

- This endpoint searches for items with a name that matches the provided value. The search is case-insensitive.

Example Usage:

### `will get specific item`

- GET /items/Jawbone - Up Wristband (large) - Red

### `will get all items with jawbone in the name`

- GET /items/Jawbone

- the return of the data will be in an array

```json
this is specific name search
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

```json
this is partial name search
this search left out the color
{
  "status": 200,
	"data": [
    {
			"_id": 6789,
			"name": "Jawbone - Up Wristband (large) - Onyx",
			"price": "$57.99",
			"body_location": "Wrist",
			"category": "Lifestyle",
			"imageSrc": "someImgUrl",
			"numInStock": 12,
			"companyId": 18834
		},
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

## /signup

### All parameters must be provided : [email, password, firstName, lastName, phoneNumber, address ]

- This endpoint creates an authorization object which contains an encrypted version of the password and the provided email as \_id.
- The endpoint also creates an user object containing email, first name, last name, phone number, address, a cart Id, and an array of orders.
- After that the endpoint also creates a cart object, which will have the same id provided to the user.

```json
{
  "status": 201,
  "message": "Account successfully created"
}
```

## /signin

## Expected body:

```json
{
  "email": "test1@email.com",
  "password": "<plain text>"
}
```

## Return

```js
{
  "status": 200,
  "data": {
    "email": "test1@email.com",
    "firstName": "firstname1",
    "lastName": "lastname1",
    "cartId": "6b6fb3b0-a903-48d6-b961-ff4a0b15c8be" //save this in localStorage
  }
}
```

## /checkout

### Expected body:

```js
{
  "_id": "bc2a3675-33e0-40e4-a132-b6418bf62b1c", //user's cartId from localStorage
  "creditCard": 12323123123123,
  "email": "test1@email.com",
  "expiration": "04/27",
  "address": "test street",
  "city": "Laval",
  "country": "Canada",
  "postalCode": "H7N 2S7"
}
```

### Return:

```js
{
    "status": 201,
    "message": "Success",
    "orderId": "6495bae535db3b44bda5a668" //Use this to redirect to users confirmation page
}
```

## /addItemToCart/:cartId

- This endpoint add the chosen amount of a specific item to the user's cart.
- The cartId needs to be passed as URL param.
- The item id and the amount of items need to be passed in the body.

```json
{
  "status": 200,
  "message": "Item added to the cart"
}
```

## /cart/:cartId/delete

- This endpoint deletes the chosen item from user's cart.
- The cartId needs to be passed as URL param.


```json
The ID of the item in the cart items array needs to be passed in the body 

{ 
  "itemId": "6553"
}
```

```json
The ID of the item in the cart items array needs to be passed in the body 

{ 
	"status": 200,
	"message": "Item deleted from cart"
}
```
