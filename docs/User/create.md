# Create

**Description** : used to create a new account.

**URL** : `/api/v1/users`

**Method** : `POST`

**Auth required** : YES

**Access rights** : All

**URL Parameters**

| Parameter   | Type        | Required        | Description                      |
| :---------- | :---------- | :-------------- | :------------------------------- |

**Data constraints**

| Field          | Type           | Required        | Default value   | Description                      |
| :------------- | :------------- | :-------------- | :-------------- | :--------------------------------|
|   **email**        |    *string*      |    **true**         |                 |  email used to log in            |
|   **password**     |    *string*      |    **true**         |                 |  password used to log in         |
|   **name**     |    *string*      |    **true**         |                 |  account's name         |
|   **type**     |    *enum*      |    **true**         |        `user`         |  account's type         |



**Data example** 

```json
{
    "email": "admin@ex.io",
    "password": "123456789",
    "name": "minh",
    "type": "user"
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
    "message": "create.success",
    "data": {
        "_id": "6130b0252d0d459f0db726bf",
        "name": "nhin thoi",
        "email": "inh@ex.io",
        "type": "user"
    }
}
```

## Error Responses

| Code        | Message              | Description             |
| :---------- | :------------------- | :---------------------- |
|   **1004**      |    *email.existed*      |   Code existed          |
|   **1000**      |    *email.required*      |   Code existed          |
|   **1000**      |    *name.required*      |   Code existed          |
|   **1000**      |    *password.required*      |   Code existed          |
|   **1008**      |    *password.minLength*      |   Code existed          |
|   **1001**      |    *email.invalid*      |   format email false |