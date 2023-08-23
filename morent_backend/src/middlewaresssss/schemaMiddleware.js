import { UserModel } from '../models/userModel.js';
const schemaMiddleware = (schema, data) => {
  const definedAttr = Object.keys(schema.paths);

  const allowedAttr = {};

  for (const key in definedAttr) {
    // if (Object.hasOwnProperty(key)) {
    //   const element = object[key];
    //   return true;
    // }

    // console.log(data.hasOwnProperty(key));
    // console.log(data.hasOwnProperty(definedAttr[key]));

    if (data.hasOwnProperty(definedAttr[key])) {
      console.log('Suraj');
    }

    // console.log(definedAttr[key]);
  }
};

export default schemaMiddleware;
