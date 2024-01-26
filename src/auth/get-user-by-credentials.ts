import * as bcrypt from 'bcrypt-ts';

// TODO: migrate to a real DB
type UserFromDB = {
  id: string,
  username: string,
  passwordHash: string,
  name: string,
  email: string,
};
export type UserFromDB_Safe = Omit<UserFromDB, "passwordHash">;



export const getUserByCredentials = async (credentials: { username: string, password: string; }) => {

  const users: UserFromDB[] = [
    {
      id: "324567gbh65gfbgd",
      username: "luke",
      passwordHash: await bcrypt.hash('hhhh', 10),
      name: 'Luke',
      email: "luje@gmail.com",
    }
  ];

  // search user in db awith provided username
  const userFromDb = users.find(item => item.username === credentials.username);

  // user does not exists ...
  if (!userFromDb) {
    // but to prevent "TIMING ATTACK" (more in `./docs/AUTH-BEST-PRACTICE.md`)
    // we hash the passowrd anyway to do not reveal theat the user is not existing
    // DETAILS: hasing passwrod is slow, so if we don't hash notinhg,  execution time
    // will be much shorter that wehn the user exits in the db. The execution time can
    // be used to understand when a user exists or not to create a whitelist of user 
    // by an attacker
    await bcrypt.compare(credentials.password, "fake-password-hash-to-prevent-timing-attack");
    return null;
  }

  // check if password is correct
  const passwordIsCorrect = await bcrypt.compare(credentials.password, userFromDb.passwordHash);

  // password is incorrect
  if (!passwordIsCorrect) return null;

  // user exists and password is correct
  return {
    id: userFromDb.id,
    email: userFromDb.email,
    name: userFromDb.name,
    username: userFromDb.username,
  } satisfies UserFromDB_Safe;
};