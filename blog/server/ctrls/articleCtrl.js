import Article from "../models/articleModel.js";
import jwt from 'jsonwebtoken'

const articleCtrl = {
  create: async (req, res) => {
    const { files , title, content, category } = req.body;
    const token = req.header("Authorization").replace("Bearer ", ""); 
    
    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 
      const userId = decodedToken.id; 
      const newArticle = await Article.create({
        title: title.toLowerCase(),
        content: content,
        title: title,
        files: files,
        user: userId,
      });
  
      res.json({ msg: "Статья успешно создана", article: newArticle });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  // likePost: async (req, res) => {
  //   try {
  //     const post = await Article.find({
  //       _id: req.params.id,
  //       likes: req.user._id,
  //     });
  //     if (post.length > 0)
  //       return res.status(400).json({ msg: "You liked this post." });

  //     const like = await Article.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $push: { likes: req.user._id },
  //       },
  //       { new: true }
  //     );

  //     if (!like)
  //       return res.status(400).json({ msg: "This post does not exist." });

  //     res.json({ msg: "Liked Post!" });
  //   } catch (err) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // },


 

  getArticles: async (req, res) => {
    try {
      const articles = await Article.find();
      res.status(200).json({
        articles,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getOnePost: async (req, res) => {
    try {
      const post = await Article.findById(req.params.id);


      if (!post)
        return res.status(404).json({
          message: 'Пост не найден',
        });
      return res.json({
        message: 'Пост найден',
        post,
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteBlog: async (req, res) => {

    // if (!req.user) return res.status(404).json({ msg: "Ошибка авторизвции" });

    try {
      const article = await Article.findOneAndDelete({
        _id: req.params.id,
      });

      // if (!article) return res.status(404).json({ msg: "Ошибка авторизвции" });

      res.json({ msg: "Delete Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },


}
export default articleCtrl