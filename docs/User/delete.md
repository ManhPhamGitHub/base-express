# Delete a account

**Description** : used to delete a account.

**URL** : `/api/v1/users/:id`

**Method** : `DELETE`

**Auth required** : YES

**Access rights** : All

**URL Parameters**

| Parameter   | Type        | Required        | Description                      |
| :---------- | :---------- | :-------------- | :------------------------------- |
|   **id**      |    *string*      |    **true**        |   The ID of a user |

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

**Content example**

```json
{
    "code": 200,
    "message": "delete.success",
    "data": {}
}
```

## Error Responses

| Code        | Message              | Description             |
| :---------- | :------------------- | :---------------------- |
|   **1002**      |   *object.not_found*      |   id does not exist|