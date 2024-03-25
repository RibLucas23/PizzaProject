import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema(
	{
		name: { type: String },
		email: { type: String, required: true, unique: true },
		password: { type: String },
		image: { type: String },
		phone: { type: String },
		streetAddress: { type: String },
		city: { type: String },
		country: { type: String },
		zipCode: { type: String },
		admin: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

UserSchema.post('validate', function (user) {
	const notHashedPassword = user.password;
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync('B4c0//', salt);
	const hashedPassword = bcrypt.hashSync(notHashedPassword, salt);
	user.password = hashedPassword;
});
const userModel = mongoose.models.User || mongoose.model('User', UserSchema);

export { userModel };
