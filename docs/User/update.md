# Update

**Description** : used to update a user's data.

**URL** : `/api/v1/users/:id`

**Method** : `PUT`

**Auth required** : YES

**Access rights** : All

**URL Parameters**

| Parameter   | Type        | Required        | Description                      |
| :---------- | :---------- | :-------------- | :------------------------------- |
|   **id**      |    *string*      |    **true**        |   The ID of a user |

**Data constraints**

| Field          | Type           | Required        | Default value   | Description                      |
| :------------- | :------------- | :-------------- | :-------------- | :--------------------------------|
|   **email**        |    *string*      |    **false**         |                 |  email used to log in            |
|   **password**     |    *string*      |    **false**         |                 |  password used to log in         |
|   **name**     |    *string*      |    **false**         |                 |  user's name         |



**Data example** 

```json
{
    "email": "admin@ex.io",
    "password": "123456789",
    "name": "minh"
}
```


## Success Response

**Condition** : If everything is OK.

**Code** : `200 CREATED`

**Content constraints**

| Field          | Type           | Description                        |
| :------------- | :------------: |  :-------------------------------- |
|   **company**        |    *string*      |  the ID of the company |
|   **name**         |    *string*      | the name of the user |
|   **_id**          |    *string*      |  the ID of the user    |
|   **email**          |    *string*      |  the email of the user |
|   **type**          |    *string*      |  type of the user    |

**Content example**

```json
{
    "code": 200,
    "message": "update.success",
    "data": {
        "_id": "6130b0252d0d459f0db726bf",
        "company": "612e35e6eb54e4b3f58af018",
        "name": "minh",
        "email": "admi123n@ex.io",
        "type": "user"
    }
}
```

## Error Responses

| Code        | Message              | Description             |
| :---------- | :------------------- | :---------------------- |
|   1008      |    password.minLength      |   password length less than 7 characters   |
|   1004      |    email.existed      |   Email already exists     |
|   1001      |    email.invalid      |   format email wrong |
|   1002      |    object.not_found      |  id does not exist |
|   1008      |    password.short      |  password short |
