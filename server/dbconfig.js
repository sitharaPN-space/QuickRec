const config = {
  user: "sa", // sql user
  password: "123@com", //sql user password
  server: "localhost", // if it does not work try- localhost
  database: "QuickRec",

  options: {
    encrypt: false, // for azure
    trustServerCertificate: false, // change to true for local dev / self-signed certs
  },
};

export default config;
