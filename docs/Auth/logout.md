# Logout

**Description** : Log out of this account on the current device.

**URL** : `/api/v1/users/logout`

**Method** : `POST`

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
**Content example**

```json
{
    "code": 200,
    "message": "logout.success",
    "data": {}
}
```

## Error Responses

| Code        | Message                     | Description                      |
| :---------- | :-------------------------- | :------------------------------- |
|   **3004**      |    *user.not_found*           |   Wrong token                    |