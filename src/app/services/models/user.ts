import mongoose, { Schema } from "mongoose";

/**
 * Represents the credential schema for a user.
 */
const credentialSchema = new Schema(
  {
    user_id: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const Credential = mongoose.models.user_credentials || mongoose.model('user_credentials', credentialSchema);

export default Credential;