# Get

**Description** : used to get information of all users.

**URL** : `/api/v1/users`

**Method** : `GET`

**Auth required** : YES

**Access rights** : All

**URL Parameters**

| Parameter   | Type        | Required        | Description                      |
| :---------- | :---------- | :-------------- | :------------------------------- |

**Data constraints**

| Field          | Type           | Required        | Default value   | Description                      |
| :------------- | :------------- | :-------------- | :-------------- | :--------------------------------|

**Data example** 

```json
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
|   **email**          |    *string*      |  the email of the user    |
|   **type**          |    *string*      |  type of the user    |

**Content example**

```json
{
    "code": 200,
    "message": "get.success",
    "data": [
      {
          "_id": "6130b0252d0d459f0db726bf",
          "company": "612e35e6eb54e4b3f58af018",
          "name": "nhin thoi",
          "email": "inh@ex.io",
          "type": "user"
      }
    ]
}
```

## Error Responses

| Code        | Message              | Description             |
| :---------- | :------------------- | :---------------------- |