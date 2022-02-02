## Routes

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
