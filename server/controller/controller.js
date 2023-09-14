const userModel = require('../model/schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const otpGenerator = require('otp-generator')
/** middleware for verify user */
exports.verifyUser = async (req, res, next) => {
    try {

        const { userName } = req.method == "GET" ? req.query : req.body;
        //console.log('userName',userName);
        // check the user existance
        let exist = await userModel.findOne({ userName });
        if (!exist) return res.status(404).send({ error: "Can't find User!" });
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
}



exports.postRegister = async (req, res) => {

    const { userName, password, email, profile } = req.body;

    try {
        const existingUser = await userModel.findOne({ email })
        console.log("ex", existingUser);
        if (existingUser !== null) {
            return res.send({ error: "Please use unique email" })
        }

        bcrypt.hash(password, 10)
            .then(hashPassword => {
                userModel.insertMany({
                    userName: userName,
                    password: hashPassword,
                    email: email,
                    profile: profile || ''
                }).then((result) => {
                    return res.status(201).send({ msg: "User registration successfull" })
                })
                    .catch((err) => {
                        console.log("Error", err); // Failure

                    });

            })
            .catch(err => console.error(err.message))



    }
    catch (error) {
        return res.status(500).send(err)
    }

}

exports.RegisterMail = async (req, res) => {
    res.send("register successfull");
    await todoModel.findOne({ userName: req.body.todo }).then(() => {
        res.send({ todo: req.body.todo, message: "Todo inserted", done: false })
    })
        .catch((err) => {
            console.log(err); // Failure

        });

}


exports.login = async (req, res) => {
    const { userName, password } = req.body
    console.log('data',req.body);
    try {
        userModel.findOne({ userName }).then((user) => {
            bcrypt.compare(password, user.password).then((checkpass) => {
                if (!checkpass) return res.status(400).send({ error: "Invalid Password !" })
                const token = jwt.sign({
                    id: user._id,
                    username: user.userName
                }, process.env.JWT_SECRET, { expiresIn: "24h" })

                return res.status(200).send({ msg: "Login success", userName: user.userName, token: token })

            }).catch((err) => {
                return res.status(400).send({ error: "Invalid Password !" })
            })
        }).catch(() => {
            res.status(400).send({ error: "Username not found" })
        });
    } catch (error) {
        res.status(500).send({ error })
    }
    

}

exports.getUser = async (req, res) => {
    const { userName } = req.params;
    try {
        if (!userName) return res.status(501).send({ error: "Invalid userName" })

        userModel.findOne({ userName }).then((user) => {
            if (!user) return res.status(501).send({ error: "Couldn't Find the User" });
            const { password, ...rest } = Object.assign({}, user.toJSON())
            return res.status(201).send(rest)
        }).catch((err) => {
            return res.status(500).error({ err });
        })

    } catch (error) {
        return res.status(404).send({ error: "Cannot find user data" })
    }

}
exports.generateOTP = async (req, res) => {

    try{
        req.app.locals.OTP = await otpGenerator.generate(6,{ upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false })
        return res.status(201).send({ code: req.app.locals.OTP })
    }catch(error)
    {
        return res.status(404).send({ error: "Something went wrong" })
    }
   

}
exports.verifyOTP = async (req, res) => {
        const {code} = req.params

        if(parseInt(req.app.locals.OTP)===parseInt(code))
        {
            req.app.locals.OTP = null;
            req.app.locals.resetSession = true;
            return res.status(201).send({ msg: "Verify successfully !" })
        }
        return res.status(400).send({ error: "Invalid OTP " })
    //    await todoModel.insertMany({todo:req.body.todo}).then(() =>{
    //     res.send({todo:req.body.todo, message:"Todo inserted", done:false})
    //   })
    //   .catch((err) =>{
    //     console.log(err); // Failure

    //   });

}
exports.createResetSession = async (req, res) => {
    if(req.app.locals.resetSession){
        req.app.locals.resetSession=false;

        return res.status(201).send({ msg : 'Access granted'})
   }
   return res.status(440).send({error : "Session expired!"})

}
exports.updateUser = async (req, res) => {
    try {
        const {id} = req.user

        if (id) {
            const body = req.body
        

            userModel.findByIdAndUpdate({_id:id}, {
                "email":body.email,
                "firstName": body.firstName,
                "lastName": body.lastName,
                "mobile": body.mobile,
                "address": body.address,
                "profile": body.profile

            }).then((result) => {
                if(result)
                {
                    
                    return res.status(200).json({ success: 'user Updated' });
                }
                
            })
                .catch((err) => {
                    console.log(err); // Failure

                });


        }
        else {
            res.status(401).send({ error })
        }
    }
    catch (error) {
        res.status(401).send({ error })
    }

}
exports.resetPassword = async (req, res) => {
   try{
    if(!req.app.locals.resetSession) return res.status (440).send({error : "Session expired!"});
        const {userName,password} = req.body;
        userModel.findOne({userName}).then((user)=>{
            bcrypt.hash(password,10).then((hashPassword)=>{
                userModel.updateOne({userName:user.userName},{password:hashPassword}).then((data)=>{
                    if(data.modifiedCount>0) {
                        req.app.locals.resetSession=false;
                        return res.status(201).send({msg:"Record updated"})
                    }
                    
                }).catch((err)=>{
                    return res.status(500).send({err2:err})})

            }).catch((err)=>{
                return res.status(500).send({error:"Unable to hash password"})
            })
        }).catch((err)=>{
            return res.status(401).send({error:"Username not found"})
        })
   }catch(error)
   {
    return res.status(401).send({error})
   }
    //    await todoModel.insertMany({todo:req.body.todo}).then(() =>{
    //     res.send({todo:req.body.todo, message:"Todo inserted", done:false})
    //   })
    //   .catch((err) =>{
    //     console.log(err); // Failure

    //   });

}
