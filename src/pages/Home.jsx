import React, { useEffect, useState } from "react";
import "./Home.css";
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [questionOfTheDay, setQuestionOfTheDay] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let result = [];
    const test = [
      { question: "test", tag: "tag" },
      {
        question: "aha",
        tag: "hej",
      },
    ];
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "questions"));
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        result.push({ ...doc.data(), id: doc.id });
        console.log(doc.data());
      });
    };

    fetchData().catch((err) => console.log(err.message));
    console.log(result);
  }, []);
  return (
    <div className="container">
      <h2>Question of the day:</h2>
      <p>{questionOfTheDay}</p>
      <h2>Conversation starters:</h2>
      <h2>Ready to ask?</h2>
      <button className="btn" onClick={() => navigate("/play")}>
        New game
      </button>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam gravida
        pellentesque est. Vestibulum blandit metus non mauris fermentum, nec
        lobortis dui pulvinar. Quisque pulvinar ipsum arcu, ut varius ipsum
        laoreet eu. Aliquam quis massa non magna faucibus sagittis. Pellentesque
        a tempor ante, ut dapibus nisl. Duis tempor sed nisl nec venenatis. Sed
        id justo porta, interdum orci quis, pulvinar lectus. Morbi vestibulum
        accumsan nibh non commodo. Fusce vitae imperdiet elit. Pellentesque nec
        sem aliquet, venenatis magna in, posuere felis. Nulla a dictum risus.
        Curabitur sollicitudin mi libero, sit amet vestibulum velit laoreet sed.
        Proin sagittis leo vel elit dapibus, vehicula finibus ex maximus.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam gravida
        pellentesque est. Vestibulum blandit metus non mauris fermentum, nec
        lobortis dui pulvinar. Quisque pulvinar ipsum arcu, ut varius ipsum
        laoreet eu. Aliquam quis massa non magna faucibus sagittis. Pellentesque
        a tempor ante, ut dapibus nisl. Duis tempor sed nisl nec venenatis. Sed
        id justo porta, interdum orci quis, pulvinar lectus. Morbi vestibulum
        accumsan nibh non commodo. Fusce vitae imperdiet elit. Pellentesque nec
        sem aliquet, venenatis magna in, posuere felis. Nulla a dictum risus.
        Curabitur sollicitudin mi libero, sit amet vestibulum velit laoreet sed.
        Proin sagittis leo vel elit dapibus, vehicula finibus ex maximus.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam gravida
        pellentesque est. Vestibulum blandit metus non mauris fermentum, nec
        lobortis dui pulvinar. Quisque pulvinar ipsum arcu, ut varius ipsum
        laoreet eu. Aliquam quis massa non magna faucibus sagittis. Pellentesque
        a tempor ante, ut dapibus nisl. Duis tempor sed nisl nec venenatis. Sed
        id justo porta, interdum orci quis, pulvinar lectus. Morbi vestibulum
        accumsan nibh non commodo. Fusce vitae imperdiet elit. Pellentesque nec
        sem aliquet, venenatis magna in, posuere felis. Nulla a dictum risus.
        Curabitur sollicitudin mi libero, sit amet vestibulum velit laoreet sed.
        Proin sagittis leo vel elit dapibus, vehicula finibus ex maximus.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam gravida
        pellentesque est. Vestibulum blandit metus non mauris fermentum, nec
        lobortis dui pulvinar. Quisque pulvinar ipsum arcu, ut varius ipsum
        laoreet eu. Aliquam quis massa non magna faucibus sagittis. Pellentesque
        a tempor ante, ut dapibus nisl. Duis tempor sed nisl nec venenatis. Sed
        id justo porta, interdum orci quis, pulvinar lectus. Morbi vestibulum
        accumsan nibh non commodo. Fusce vitae imperdiet elit. Pellentesque nec
        sem aliquet, venenatis magna in, posuere felis. Nulla a dictum risus.
        Curabitur sollicitudin mi libero, sit amet vestibulum velit laoreet sed.
        Proin sagittis leo vel elit dapibus, vehicula finibus ex maximus.
      </p>
    </div>
  );
}
