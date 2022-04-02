const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema(
	{
		name: [{ type: String, require: true }],
	},
	{
		versionKey: false, 
		timestamps: true,
	}
);

let Role;
try {
	Role = mongoose.model("role", roleSchema);
} catch (e) {
	console.log(e.message);
}

module.exports = Role;