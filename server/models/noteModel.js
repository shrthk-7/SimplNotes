const { query } = require("../utils/mysql");

const create = async ({ heading, body, user_id }) => {
  const { insertId } = await query(
    "INSERT INTO Note(heading, body, user_id) VALUES(?, ?, ?)",
    [heading, body, user_id]
  );
  const result = await query("SELECT * FROM Note WHERE note_id = ?", [
    insertId,
  ]);
  return result[0];
};

const update = async ({
  note_id,
  user_id,
  heading,
  body,
  backgroundColor,
  color,
}) => {
  if (!backgroundColor) backgroundColor = "var(--teal-950)";
  if (!color) color = "var(--teal-50)";

  const note = (
    await query("SELECT * FROM Note WHERE note_id = ?", [note_id])
  )[0];

  if (!note || note.user_id != user_id) {
    throw new Error("Invalid Access");
  }

  await query(
    "UPDATE Note SET heading = ?, body = ?, backgroundColor = ?, color = ? WHERE note_id = ?",
    [heading, body, backgroundColor, color, note_id]
  );

  const updatedNote = (
    await query("SELECT * FROM Note WHERE note_id = ?", [note_id])
  )[0];
  return updatedNote;
};

const remove = async ({ note_id, user_id }) => {
  await query("DELETE FROM Note WHERE note_id = ? AND user_id = ?", [
    note_id,
    user_id,
  ]);
  return;
};

const find = async ({ note_id, user_id }) => {
  if (!note_id || !user_id) {
    throw new Error("Incomplete Data");
  }
  const result = (
    await query("SELECT * FROM Note WHERE note_id = ? AND user_id = ?", [
      note_id,
      user_id,
    ])
  )[0];
  return result;
};

const getAllNotesOfUser = async (user_id) => {
  const result = await query("SELECT * FROM Note WHERE user_id = ?", [user_id]);
  return result;
};

module.exports = { create, getAllNotesOfUser, update, remove, find };
