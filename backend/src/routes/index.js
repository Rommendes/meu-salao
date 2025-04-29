import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("API do Meu Salão está funcionando!");
});

export default router;
