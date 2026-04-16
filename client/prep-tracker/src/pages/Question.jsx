import { useEffect, useState } from "react";
import axios from "axios";
import AddQuestion from "../components/AddQuestion";
import QuestionList from "../components/QuestionList";

function Questions() {
  const [questions, setQuestions] = useState([]);

  const token = localStorage.getItem("token");

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/questions", {
        headers: {
          Authorization: token
        }
      });
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="container">
      <h1>Preparation Tracker</h1>
     
      <QuestionList questions={questions} fetchQuestions={fetchQuestions} />
    </div>
  );
}

export default Questions;