const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render("movies/new-movie", {celebrities});
    } catch (e) {
        next(e)
    }
});

router.get('/movies/create', async (req, res, next) => {
    try {
        res.render('movies/new-movie');
    } catch (e) {
        next(e)
    }
})

router.post('/movies/create', async (req, res, next) => {
    const {title, genre, plot, cast} = req.body;
    try {
        const movies = await Movie.create({title, genre, plot, cast});
        res.redirect('/movies')
    } catch (e) {
        next(e)
    }
})

router.get('/movies', async (req, res, next) => {
    try {
        const allMovies = await Movie.find()
        res.render('movies/movies', {allMovies})
    } catch (e) {
        next(e)
    }
})

router.get('/movies/:id', async (req, res, next) => {
    const {id} = req.params
    try {
        const movieDetail = await Movie.findById(id).populate('cast');
        res.render('movies/movie-details', movieDetail )
    } catch (e) {
        next(e)
    }
  })

  router.post('/movies/:id/delete', async (req, res, next) => {
    const { id } = req.params;
    try {
      const deleteMovie = await Movie.findByIdAndRemove(id);
      res.redirect('/movies');
    } catch (e) {
      next(e);
    }
  });

  router.get('/movies/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    try {
      const editMovie = await Movie.findById(id);
      const allCelebrities = await Celebrity.find();
      res.render('./movies/edit-movie', { id, editMovie,allCelebrities });
    } catch (e) {
      next(e);
    }
  });

  router.post('/movies/:id/edit', async (req, res, next) => {
    const { id } = req.params; 
    const {title, genre, plot, cast} = req.body;
    try {
      const editMovie = await Movie.findByIdAndUpdate(
        id,
        { title, genre, plot, cast },
        { new: true },
      );
      res.redirect(`/movies/${_id}`)
    } catch (e) {
      next(e);
    }
  });

module.exports = router;

