import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';

export const signUpController = async (req, res) => {
    try {
        const {username, email, password} =req.body;
        console.log(req.body)
        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({username, email, password:hashedPassword});
        await newUser.save();
    
        res.status(200).json({
            message:"User created successfully"
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message:"Error while new User creating",
            error: error.message,
        })
        
    }
 
} 