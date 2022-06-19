const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  diskSpace: { type: Number, default: 1024 ** 3 * 10 },
  useSpace: { type: Number, default: 0 },
  avatar: { type: String },
  files: [{ type: Schema.Types.ObjectId, ref: "files" }],
});

module.exports = model("users", userSchema);
