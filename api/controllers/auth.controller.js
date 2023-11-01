import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signUpController = async (req, res, next) => {
    try {
        const {username, email, password} =req.body;
        //  //validations
        //  if(!username){
        //     return res.send({ message: 'Name is required'})
        // }
        // if(!email){
        //     return res.send({ message: 'Email is required'})
        // }
        // if(!password){
        //     return res.send({ message: 'Password is required'})
        // }
        // check user
        const exisitingUser = await User.findOne({email});
        //exisiting user
        if(exisitingUser){
            return res.status(200).send({
                message:"Already Register please login", 
                exisitingUser,
            })
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({username, email, password:hashedPassword});
        await newUser.save();
    
        res.status(201).json({
            success:true,
            message:"User created successfully",
            newUser,
        });
        
    } catch (error) {
        next(error)
        // next(errorHandler(300, "Something went wrong"))
        // console.log(error)
        // res.status(500).send({
        //     success: false,
        //     message:"Error while new User creating",
        //     error: error.message,
        // })    
    } 
};