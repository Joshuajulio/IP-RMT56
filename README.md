# IP-RMT56

Theme : Health

# <b>SehatKu</b> : API Documentation

## Endpoints

List of available endpoints;

- `GET /ip/register`
- `GET /ip/login`

Routes below need authentication:

- `POST /ip/createprofile`
- `GET /ip/drugs/:id`
- `GET /ip/profile/`
- `PUT /ip/profile/`
- `GET /ip/currentdrugs`
- `POST /ip/currentdrugs`
- `PUT /ip/currentdrugs/:id`
- `DELETE /ip/currentdrugs/:id`
- `GET /ip/pastdrugs`

## 1. POST /ip/register

Description:

- Register a new user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Validation error message"
}
```

&nbsp;

## 2. POST /ip/login

Description:

- Login a user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
```

OR

```json
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST /ip/createprofile

Description:

- Create a user profile (need authentication)

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "string",
  "age": "integer",
  "personalHistory": "string",
  "familyHistory": "string",
  "foodAllergy": "string",
  "drugAllergy": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "name": "string",
  "age": "integer",
  "personalHistory": "string",
  "familyHistory": "string",
  "foodAllergy": "string",
  "drugAllergy": "string",
  "recommendation": "string",
  "message": "Profile with name <name> added successfully"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Validation error message"
}
```

&nbsp;

## 4. GET /ip/drugs

Description:

- Get all drugs (need authentication)

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

query:

```json
{
  "q": "string",
  "sort": "ASC" || "DESC",
  "limit": "integer",
  "page": "integer"
}
```

_Response (200 - OK)_

```json
{
  "page": "integer",
  "data": [
    {
      "id": "integer",
      "name": "string",
      "imgUrl": "string"
    }
  ],
  "totalData": "integer",
  "totalPage": "integer"
}
```

&nbsp;

## 5. GET /ip/drugs/:id

Description:

- Get a drug by id (need authentication)
  Request:
- headers:

````json
{
  "Authorization": "Bearer <access_token>"
}
- params:
```json
{
  "id": "integer"
}
````

_Response (200 - OK)_

```json
{
  "id": "integer",
  "name": "string",
  "description": "string",
  "imgUrl": "string",
  "composition": "string",
  "dosage": "string"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Drug not found"
}
```

&nbsp;

## 6. GET /ip/profile/

Description:

- Get user profile (need authentication)

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "name": "string",
  "age": "integer",
  "personalHistory": "string",
  "familyHistory": "string",
  "foodAllergy": "string",
  "drugAllergy": "string",
  "recommendation": "string"
}
```

&nbsp;

## 7. PUT /ip/profile/

Description:

- Update user profile (need authentication)

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "string",
  "age": "integer",
  "personalHistory": "string",
  "familyHistory": "string",
  "foodAllergy": "string",
  "drugAllergy": "string"
}
```

_Response (200 - OK)_

```json
{
  "data": {
    "id": "integer",
    "name": "string",
    "age": "integer",
    "personalHistory": "string",
    "familyHistory": "string",
    "foodAllergy": "string",
    "drugAllergy": "string",
    "recommendation": "string"
  },
  "message": "Profile updated successfully"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Validation error message"
}
```

&nbsp;

## 8. GET /ip/currentdrugs

Description:

- Get current drugs for the user (need authentication)
  Request:
- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "UserId": "integer",
    "DrugId": "integer",
    "quantity": "integer",
    "drinkTime": "string",
    "startDate": "date",
    "endDate": "date",
    "Drug": {
      "id": "integer",
      "name": "string",
      "imgUrl": "string"
    }
  }
]
```

&nbsp;

## 9. POST /ip/currentdrugs

Description:

- Add a new current drug for the user (need authentication)
  Request:
- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "DrugId": "integer",
  "quantity": "integer",
  "drinkTime": "string",
  "startDate": "date",
  "endDate": "date"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "UserId": "integer",
  "DrugId": "integer",
  "message": "Drug has been added successfully"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Validation error message"
}
```

&nbsp;

## 10. PUT /ip/currentdrugs/:id

Description:

- Update a current drug for the user (need authentication)
  Request:
- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "quantity": "integer",
  "drinkTime": "string",
  "startDate": "date",
  "endDate": "date"
}
```

_Response (200 - OK)_

```json
{
  "message": "Drug has been updated successfully"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Validation error message"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Drug not found"
}
```

&nbsp;

## 11. DELETE /ip/currentdrugs/:id

Description:

- Delete a current drug for the user (need authentication)
  Request:
- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Drug has been deleted successfully"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Drug not found"
}
```

&nbsp;

## 12. GET /ip/pastdrugs

Description:

- Get past drugs for the user (need authentication)
  Request:
- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "drinkTime": "string",
    "startDate": "date",
    "endDate": "date",
    "Drug": {
      "id": "integer",
      "name": "string",
      "imgUrl": "string"
    }
  }
]
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
