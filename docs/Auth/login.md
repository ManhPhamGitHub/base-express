# Login

**Description** : used to log in to the system.

**URL** : `/api/v1/users/login`

**Method** : `POST`

**Auth required** : NO

**Access rights** : All

**URL Parameters**

| Parameter   | Type        | Required        | Description                      |
| :---------- | :---------- | :-------------- | :------------------------------- |

**Data constraints**

| Field          | Type           | Required        | Default value   | Description                      |
| :------------- | :------------- | :-------------- | :-------------- | :--------------------------------|
|  **email**        |    *string*      |    **true**         |                 |  email used to log in            |
|   **password**     |    *string*      |    **true**         |                 |  password used to log in         |

**Data example** 

```json
{
    "email": "admin@ex.io",
    "password": "123456789"
}
```


## Success Response

**Condition** : If everything is OK.

**Code** : `200 CREATED`

**Content constraints**

| Field          | Type           | Description                        |
| :------------- | :------------: |  :-------------------------------- |
|   **token**        |    *string*      |  the current login account's token |
|   **name**         |    *string*      |  the current login account's name  |
|   **_id**          |    *string*      |  the current login account's id    |

**Content example**

```json
{
    "code": 200,
    "message": "login.success",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTJlMzVlNmViNTRlNGIzZjU4YWYwMWMiLCJpYXQiOjE2MzA1NzQ0ODgsImV4cCI6MTYzMzE2NjQ4OH0.xW8tPL-wOzak2updU5A6p4rkLus9NJ9eHFw5Pkq9u-0",
        "name": "Admin",
        "_id": "612e35e6eb54e4b3f58af01c"
    }
}
```

## Error Responses

| Code        | Message                     | Description                      |
| :---------- | :-------------------------- | :------------------------------- |
|   **1002**      |    *email.not_found*          |   Email not existed              |
|   **1006**      |    *password.not_match*       |   password wrong                 |
|   **1010**      |    *user.notVerified*       |   unverified user if type other than "admin"   |
|   **1000**      |    *email.required*       |   email is required   |
|   **1000**      |    *password.required*       |   password is required   |
