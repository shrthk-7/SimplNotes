const { query } = require("../utils/mysql");

const find = async ({ username, user_id }) => {
  if (!username) {
    throw new Error("Incomplete data");
  }

  if (username) {
    return (
      await query("SELECT * FROM User WHERE username = ?", [username])
    )[0];
  }

  if (user_id) {
    return (await query("SELECT * FROM User WHERE user_id = ?", [user_id]))[0];
  }
};

const create = async ({ username, password }) => {
  if (!username || !password) {
    throw new Error("Incomplete Data");
  }
  const { insertId } = await query(
    "INSERT INTO User(username, password) VALUES (?, ?)",
    [username, password]
  );
  const result = await query("SELECT * FROM User WHERE user_id = ?", [
    insertId,
  ]);
  return result[0];
};

module.exports = { find, create };
