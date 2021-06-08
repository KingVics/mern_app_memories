import express from "express"

//import Controllers
import { getPosts, createPosts, updateRoute, deletePost, likePost} from "../controllers/posts.js"

//MIDDLEWARE
import auth from "../middleware/auth.js"
const router = express.Router();

router.get('/', getPosts)
router.post('/', auth,createPosts)
router.patch('/:id',  auth, updateRoute)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)


export default router;