import nextConnect from "next-connect";
import multer from "multer";

const upload = multer();
const apiRoute = nextConnect({
  onError(error, _, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const uploadMiddleware = upload.single("photo");

apiRoute.use(uploadMiddleware);

apiRoute.post((req, res) => {
  console.log(req.file); // @Todo : pass the blob to the ML model
  res.status(200).json({ data: "success" });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
