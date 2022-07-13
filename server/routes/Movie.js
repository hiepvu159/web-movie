const movieController = require("../controller/movieController");
const verify = require("../verifyToken");

const router = require("express").Router();

//Add Movie
router.post("/", verify, movieController.addMovie);
//Get All Movie
router.get("/", movieController.getAllMovie);
//Get Random Movie
router.get("/random", movieController.getRandomMovie);
//Get A Movie
router.get("/find/:id", movieController.getAMovie);
//Update Movie
router.put("/:id", verify, movieController.updateMovie);
//Delete Movie
router.delete("/:id", verify, movieController.deleteMovie);

module.exports = router;
