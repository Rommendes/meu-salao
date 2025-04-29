export default function cors(req, res) {
    return new Promise((resolve) => {
      res.setHeader("Access-Control-Allow-Credentials", true);
      res.setHeader("Access-Control-Allow-Origin", "*"); // Ou colocar o domínio do seu frontend no lugar do *
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,OPTIONS,PATCH,DELETE,POST,PUT"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
      );
  
      if (req.method === "OPTIONS") {
        res.status(200).end();
        return resolve();
      }
  
      return resolve();
    });
  }
  