import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname); // Sirf naam set kar raha hai Lekin destination set nahi kiya, toh Multer default temporary folder me save karta hai
  },
});

const upload = multer({ storage });

export default upload;
