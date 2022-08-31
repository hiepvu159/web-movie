const Movie = require("../models/Movie");

const movieController = {
  addMovie: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const newMovie = new Movie(req.body);
        const saveMovie = await newMovie.save();
        res.status(201).json(saveMovie);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  },
  getAllMovie: async (req, res) => {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies.reverse());
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAMovie: async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getRandomMovie: async (req, res) => {
    let movie;
    try {
      movie = await Movie.aggregate();
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json(err);
    }
  },
  updateMovie: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const updatedMovie = await Movie.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedMovie);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("You are not allowed");
    }
  },
  deleteMovie: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete Successfully");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("You are not allowed to delete");
    }
  },
};

module.exports = movieController;
