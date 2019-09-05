let user = (userId,firstName,lastName,emailAddress,address1,address2,city,state,zipCode,country) => {
  userModel = {

    userId: userId,
    firstName:firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    password:password,
    address1: address1,
    address2:address2,
    city:city,
    state:state,
    zipCode:zipCode,
    country:country,

  };
  return userModel;
};

module.exports = user;
