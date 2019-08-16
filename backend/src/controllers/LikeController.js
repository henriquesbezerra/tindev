const Dev = require('../models/Dev');
const mongoose = require('mongoose');

module.exports = {
  async store(req, res){
    
    const { user } = req.headers;
    const { devId } = req.params;    

    

    console.log(mongoose.Types.ObjectId.isValid(devId));
    
    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);


    if(!targetDev){
      return res.status(400).json({error: 'Dev Not Exists'}); // Bad Request
    }

    if(targetDev.likes.includes(user)){
      console.log('deu match');
    }
    
    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return res.json({ok: true, id: devId, header: req.headers.user, loggedDev, targetDev});

  }
}