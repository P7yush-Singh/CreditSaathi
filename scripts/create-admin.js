import connectDB from "../lib/db.js";
import Admin from "../models/Admin.js";

async function createAdmin() {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@creditsaathi.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    // Create new admin
    const admin = new Admin({
      email: "admin@creditsaathi.com",
      password: "admin123" // This will be automatically hashed by the pre-save middleware
    });

    await admin.save();
    console.log("Admin created successfully");
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    process.exit();
  }
}

createAdmin();
