import { pbkdf2 } from "crypto";
import { promisify } from "util";

const SALT_ROUNDS = 1000;
const DIGEST = "sha512";
const KEY_LEN = 64;

const pbkdf2Async = promisify(pbkdf2);

const getPasswordHash = async (
  password: string,
  salt: string
): Promise<string> => {
  const hashedPasswordBuffer = await pbkdf2Async(
    password,
    salt,
    SALT_ROUNDS,
    KEY_LEN,
    DIGEST
  );
  return hashedPasswordBuffer.toString("hex");
};

const verifyPasswordHash = async (
  password: string,
  salt: string,
  hashedPassword: string
): Promise<boolean> => {
  const currentPasswordHash = await getPasswordHash(password, salt);
  return currentPasswordHash === hashedPassword;
};

export default {
  getPasswordHash,
  verifyPasswordHash,
};
