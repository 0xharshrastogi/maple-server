## Routes

---

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

### Classroom

| Key            |   Type   | Required | Unique  |
| :------------- | :------: | :------: | ------- |
| classID        |  string  |  `true`  | `true`  |
| name           |  string  |  `true`  | `true`  |
| subjectName    |  string  | `false`  | `false` |
| headerImageUrl |  string  | `false`  | `false` |
| description    |  string  | `false`  | `false` |
| admin          | ObjectID |  `true`  | `false` |

---

### ApiError

| Key         |   Type |
| :---------- | -----: |
| statusCode  | number |
| status      | string |
| message     | string |
| description | string |
