const router = require("express").Router();
const { Controller } = require("../controllers/controller");
const { authentication } = require("../middlewares/authentication");

router.get("/", (req, res) => {
  res.json({
    Hello: "Welcome to my website by Joshua",
    "Click here to see GC1": "https://rmt56.juang.site/pub/products",
    "Click here to see IP": "http://localhost:3000/ip/drugs",
  });
});

router.post("/ip/register", Controller.register);
router.post("/ip/login", Controller.login);

router.use(authentication);
router.post("/ip/createprofile", Controller.createProfile);
router.get("/ip/drugs", Controller.getAllDrugs);
router.get("/ip/drugs/:id", Controller.getDrugById);
router.get("/ip/profile/", Controller.getProfile);
router.put("/ip/profile/", Controller.updateProfile);
router.get("/ip/currentdrugs", Controller.getCurrentDrugs);
router.post("/ip/currentdrugs", Controller.addCurrentDrugs);
router.put("/ip/currentdrugs/:id", Controller.updateCurrentDrugs);
router.delete("/ip/currentdrugs/:id", Controller.deleteCurrentDrugs);
router.get("/ip/pastdrugs", Controller.getPastDrugs);

module.exports = router;
