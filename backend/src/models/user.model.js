const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//step 2) create a schema
//user schema
const userSchema = new mongoose.Schema(
	{
		name: { type: String, require: true },
		email: { type: String, require: true },
		password: { type: String, require: true },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

let User;
try {
	User = mongoose.model("users", userSchema);
} catch (e) {
	console.log(e.message);
}

userSchema.pre("save", function (next) {
	if (!this.isModified("password")) return next();

	var hash = bcrypt.hashSync(this.password, 8);
	this.password = hash;
	return next();
});

userSchema.methods.checkPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = User;
