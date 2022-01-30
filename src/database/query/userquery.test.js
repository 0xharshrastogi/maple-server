import faker from "@faker-js/faker";
import UserQuery from "./user.query";

const randomNumberString = (size) => {
  let str = "";
  for (let i = 0; i < size; i++) {
    str += Math.floor(Math.round() * 10);
  }
  return str;
};

function randomUser() {
  const userID = randomNumberString(20);
  const firstname = faker.name.firstName();
  const familyname = faker.name.lastName();
  const email = faker.internet.email(firstname, familyname);
  const givenname = firstname + " " + familyname;

  return { userID, firstname, familyname, email, givenname };
}

test("Create User Document", async () => {
  const user = randomUser();
  const result = await UserQuery.create(user);
  expect(result.userID).toBe(user.userID);
});
