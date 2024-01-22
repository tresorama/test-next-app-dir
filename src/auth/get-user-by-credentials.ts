import * as bcrypt from 'bcrypt-ts';

export const getUserByCredentials = async (credentials: { username: string, password: string; }) => {
  // TODO: migrate to a real DB
  const users = [
    {
      username: "luke",
      passwordHash: await bcrypt.hash('hhhh', 10),
      name: 'Luke',
      email: "luje@gmail.com",
    }
  ];
  type User = typeof users[number];

  // search user in db awith provided username
  const userFromDb = users.find(item => item.username === credentials.username);

  // user does not exists
  if (!userFromDb) return null;

  // check if password is correct
  const passwordIsCorrect = await bcrypt.compare(credentials.password, userFromDb.passwordHash);

  // password is incorrect
  if (!passwordIsCorrect) return null;

  // user exists and password is correct
  return {
    email: userFromDb.email,
    name: userFromDb.name,
    username: userFromDb.username,
  } satisfies Omit<User, "passwordHash">;
};