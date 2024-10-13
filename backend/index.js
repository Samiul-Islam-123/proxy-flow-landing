const express = require("express");
const app = express();
const PORT = process.env.PORT || 5500;
const cors = require("cors");
const dotenv = require("dotenv");

const ConnectToDatabase = require("./database/Connection");
const UserModel = require("./database/UserModel");
const model = require("./database/DataModel");
const sendEmail = require("./service/emailSender")

app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.json({
    message: "Everything is working...",
  });
});

app.post("/signup", async (req, res) => {
  const { username, email } = req.body;
  if (username && email) {
    try {
      const user = new model({
        username: username,
        email: email,
        role : 'user'
      });

      await user.save();

      // Send a welcome email
await sendEmail(
    email,
    'Welcome to Our Service!',
    'Thank you for signing up!',
    `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <div style="padding: 20px;">
            <h1 style="color: #333;">Welcome to Our Service!</h1>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
              Thank you for signing up, <strong>${username}</strong>! We're excited to have you on board. 
              You can now start exploring all the features we offer.
            </p>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
              If you have any questions, feel free to <a href="mailto:support@yourservice.com">contact our support team</a>.
            </p>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">Happy exploring!</p>
            <footer style="margin-top: 20px; font-size: 12px; color: #999;">
              &copy; ${new Date().getFullYear()} Your Service. All rights reserved.<br>
              <a href="https://yourservice.com/privacy-policy" style="color: #999;">Privacy Policy</a> | 
              <a href="https://yourservice.com/terms-of-service" style="color: #999;">Terms of Service</a>
            </footer>
          </div>
        </div>
      </body>
    </html>
    `
);


    // Send a notification to admin
await sendEmail(
    'isamiul099@gmail.com',
    'New User Signed Up',
    'Hurray! A new user has signed up.',
    `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <div style="padding: 20px;">
            <h1 style="color: #333;">New User Notification</h1>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
              Hurray! <strong>${username}</strong> has signed up with the email <strong>${email}</strong>.
            </p>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
              Please log in to the admin panel to review the new user details.
            </p>
            <footer style="margin-top: 20px; font-size: 12px; color: #999;">
              &copy; ${new Date().getFullYear()} Your Service. All rights reserved.<br>
              <a href="https://yourservice.com/privacy-policy" style="color: #999;">Privacy Policy</a> | 
              <a href="https://yourservice.com/terms-of-service" style="color: #999;">Terms of Service</a>
            </footer>
          </div>
        </div>
      </body>
    </html>
    `
);


      res.status(201).json({ // Changed to 201 for resource creation
        message: "User saved successfully",
        user: user, // Optional: return the created user data
      });
    } catch (error) {
      // Handle specific MongoDB errors
      console.log(error)
      if (error.code === 11000) {
        return res.status(409).json({ // Conflict for duplicate email
          message: "Email already exists",
        });
      }
      return res.status(500).json({ message: "Server error", error: error });
    }
  } else {
    return res.status(400).json({
      message: "Please enter your username and email",
    });
  }
});

app.post("/add-admin", async (req, res) => {
  const { username, email } = req.body;
  if (username && email) {
    try {
      const user = new model({
        username: username,
        email: email,
        role: "admin",
      });

      await user.save();

      res.status(201).json({ // Changed to 201 for resource creation
        message: "Admin saved successfully",
        user: user,
      });
    } catch (error) {
      // Handle specific MongoDB errors
      if (error.code === 11000) {
        return res.status(409).json({ // Conflict for duplicate email
          message: "Email already exists",
        });
      }
      return res.status(500).json({ message: "Server error", error: error });
    }
  } else {
    return res.status(400).json({
      message: "Please enter your username and email",
    });
  }
});

app.get("/users", async (req, res) => {
  const { key } = req.query;
  
  try {
      const adminData = await model.findOne({
          role: "admin",
          _id: key, // Using the _id to verify admin
      });

      if (adminData) {
          const users = await model.find();
          return res.json({
              message: "Users found",
              users: users,
          });
      } else {
          return res.status(404).json({
              message: "Admin not found",
          });
      }
  } catch (error) {
      console.error("Error fetching users:", error); // Log the error for debugging
      return res.status(500).json({
          message: "Internal Server Error",
      });
  }
});

app.listen(PORT, async () => {
  await ConnectToDatabase(process.env.DATABASE_URL);
  console.log("Server is up and running on PORT : " + PORT);
});
