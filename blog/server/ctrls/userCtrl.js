import bcrypt from "bcrypt"
import User from "../models/userModel.js"
import  jwt  from "jsonwebtoken"
const userCtrl = {
    
    registr: async(req,res) => {
        try{
            const {username , password , confirmPassword} = req.body

            const user = await User.findOne({username})

            if(user){
                return res.json({message: 'имя занято '})
            }
            if(password.length < 6){
                return res.json({message: 'пароль короткий '})
            }
            if(password !== confirmPassword){
                return res.json({message: 'conf passw is wrong'})

            }
            const hashPassword = await bcrypt.hash(password , 4)

            const newUser = new User({
                ...req.body,
                password: hashPassword
            })
            newUser.save()   
            return res.json({message: 'успешно зарег'})         
        } catch(e){
            console.log(e)
        }
    },

    login: async(req,res) =>{
        try{
            const {username, password} = req.body
            const user = await User.findOne({username})
            
            if(!user){
                return res.json({message: 'непр пароль'})
            }
            const isCor = await bcrypt.compare(password,user.password)
            if(!isCor){
                return res.json({message: 'непр пароль'})
            }
            const accessToken = jwt.sign(
                {username,id: user._id,},
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '1d'
                }
            )

            const refreshToken = jwt.sign(
                {username,id: user._id,},
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: "1w"
                }
            )
            if(isCor && user){
            res.cookie("refreshtoken", refreshToken, {
              httpOnly: true,
              path: "/api/refresh_token",
              maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
            });

            res.json({
                username,
                message: 'успех',
                accessToken,
                userId: user._id,
            })                
            }

        } catch(e){
            console.log(e)
        }
    },
    logout: async (req, res) => {
        try {
            localStorage.removeItem('accessToken')
          return res.json({ msg: "Logged out!" });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
    },
    getUser : async (req, res, next) => {
        const token = localStorage.getItem('token');
      
        if (!token) {
          return res.status(401).json({ error: 'No token provided' });
        }
      
        try {
          const decoded = jwt.verify(token, 'yourSecretKey');
          req.userId = decoded.id;
          next();
        } catch (error) {
          return res.status(401).json({ error: 'Invalid token' });
        }
      }
    // generateAccessToken: async (req, res) => {
    //     try {
    //       const rf_token = req.cookies.refreshtoken;
    //       if (!rf_token) return res.status(400).json({ msg: "Please login now." });
    
    //       jwt.verify(
    //         rf_token,
    //         process.env.REFRESH_TOKEN_SECRET,
    //         async (err, result) => {
    //           if (err) return res.status(400).json({ msg: "Please login now." });
    
    //           const user = await Users.findById(result.id)
    //             .select("-password")
    //             .populate(
    //               "followers following",
    //               "avatar username fullname followers following"
    //             );
    
    //           if (!user)
    //             return res.status(400).json({ msg: "This does not exist." });
    
    //           const access_token = createAccessToken({ id: result.id });
    
    //           res.json({
    //             access_token,
    //             user,
    //           });
    //         }
    //       );
    //     } catch (err) {
    //       return res.status(500).json({ msg: err.message });
    //     }
    //   },


}   

export default userCtrl