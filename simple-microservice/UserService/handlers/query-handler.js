const Mongodb = require('./../config/db');
const jwt = require("jsonwebtoken");

class QueryHandler {
  constructor() {
    this.Mongodb = Mongodb.MongoDB;
  }

  login(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const [DB, ObjectID, DBClient] = await this.Mongodb.onConnect();
        DB.collection('user').findOneAndUpdate(
          data,
          {
            $set: {
              online: 'Y',
            },
          },
          (error, result) => {
            DBClient.close();
            if (error) {
              reject(error);
            }
            var response = {
              _id: result.value._id,
              email: result.value.email,
              token: this.getJWTToken(result.value)
            }
            result.lastErrorObject.updatedExisting ? resolve(response) : resolve(null);
          },
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  getJWTToken(user){
    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m",
      }
    )
    return token
  }

  getUserDetails(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const [DB, ObjectID, DBClient] = await this.Mongodb.onConnect();
        DB.collection('user').aggregate([
          {
            $match: { _id: ObjectID(userId) },
          },
          {
            $project: {
              name: true,
              email: true,
              lastname: true,
              online: true,
              _id: false,
              id: '$_id',
            },
          },
        ]).toArray((error, result) => {
          DBClient.close();
          if (error) {
            reject(error);
          }
          let userDetails = null;
          if (result.length > 0) {
            userDetails = result[0];
          }
          resolve(userDetails);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  registerUser(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const [DB, ObjectID, DBClient] = await this.Mongodb.onConnect();
        DB.collection('user').insertOne(data, (err, result) => {
          DBClient.close();
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new QueryHandler();
