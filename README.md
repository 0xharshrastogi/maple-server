## Routes

#### Fetch User Data Through ID:

---

**URL**

[http://localhost:8080/v1/user/{{userID}}](http://localhost:8080/v1/user/{{userID}})

**Response Body**

```json
{
  "message": "User Data Fetched Succesfully",
  "_id": "61fa2b64682b1783baadcd8e",
  "userID": "1090",
  "firstname": "John",
  "imageURL": "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
  "email": "smith@example.com",
  "familyname": "Smith",
  "givenname": "John Smith",
  "__v": 0
}
```

## Schema

### User

| Key        |  Type  | Required | Unique  |
| :--------- | :----: | :------: | ------- |
| userID     | string |  `true`  | `true`  |
| email      | string |  `true`  | `true`  |
| firstname  | string |  `true`  | `false` |
| familyname | string |  `true`  | `false` |
| givvename  | string |  `true`  | `false` |
| imageURL   | string | `false`  | `false` |

---

### ApiError

| Key         |   Type |
| :---------- | -----: |
| statusCode  | number |
| status      | string |
| message     | string |
| description | string |
