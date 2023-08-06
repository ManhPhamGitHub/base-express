const Company = require("../models/company");
const User = require("../models/user");

const init = async () => {
  require("../modules/db").connect();
  const company = await Company.create({
    name: 'MinhPV',
  });
  const user = await User.create({
    company,
    name: 'Admin',
    email: 'vugiamanh1997@gmail.com',
    password: '123456',
    type: 'admin'
  });
  await Company.findOneAndUpdate({ _id: company._id }, {
    root: user,
  });

  console.log("Completed ------ Ctrl + C to kill the process!!!");
};

init();