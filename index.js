var cors = require("cors");
const multer = require("multer")();

const { app, server } = require("./server/server");
const { transcribe } = require("./server/routes/Transcribe");
const {
  getTranscriptionStatusById,
} = require("./server/routes/GetTranscriptionStatus");
const { getTranscription } = require("./server/routes/GetTranscription");
const { decodeToken } = require("./server/utils/Helpers");
const { deleteTranscription } = require("./server/routes/DeleteJob");

app.use(cors());

const PORT = process.env.PORT || 8000;

const appServer = server.listen(PORT, () => {
  console.log("listening");
});

appServer.timeout = 60 * 60 * 1000;

app.post("/transcribe", multer.single("file"), transcribe);

app.get("/getTranscriptionStatusById/:id", getTranscriptionStatusById);

app.get("/getTranscriptionById/:id", getTranscription);

app.delete("/deleteJob/:id", deleteTranscription);

app.get("/token", (req, res) => {
  const data = Buffer.from("mustafa ali");
  const token = data.toString("base64");
  res.status(400).send({ decode: token, encode: decodeToken(token) });
});
