const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
  } = process.env;

  module.exports = {
    dbUrl: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@db.kvves.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  };
