const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const middleware = require('../middleware/authMiddleware');

// Get all questions
router.get("/", middleware, async (req, res) => {
    try{
        const questions = await Question.find();
        res.json(questions);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
});

// Create a new question
router.post("/", middleware, async(req,res)=>{
    try{
        const newQuestion = new Question(req.body);
        const saved= await newQuestion.save();
        res.json(saved);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
});

//update a question
router.put("/.id",middleware, async(req,res)=>{
    try{
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });

    }catch(err){
        res.status(500).json({ message: err.message });
    }
});

//delete a question

router.delete("/:id", middleware, async(req,res)=>{
    try{
        await Question.findByIdAndDelete(req.params.id);
        res.json({ message: "Question deleted successfully" });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
});
router.put("/:id", middleware, async (req, res) => {
  const updated = await Question.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});


module.exports = router;