/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const schemas = {
  "1.0": require("./schema/s1_0")
};

module.exports = (obj) => {
  if (obj.version) {
    if (schemas[obj.version]) {
      return schemas[obj.version](obj);
    } else {
      return false;
    }
  } else {
    return false;
  }
};