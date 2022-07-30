const router = require("express").Router();
const {
  getTaskById,
  getTask,
  addTask,
  deleteTask,
  updateTask,
} = require("../controllers/todoController");

router.route("/").get(getTask).post(addTask);
router.route("/:id").get(getTaskById).delete(deleteTask).put(updateTask);

module.exports = router;
