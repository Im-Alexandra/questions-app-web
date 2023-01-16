import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function Home() {
  const [questionOfTheDay, setQuestionOfTheDay] = useState(null);
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(true);

  return (
    <div className="container">
      <h2>Question of the day:</h2>
      {questionOfTheDay && <p>{questionOfTheDay.question}</p>}
      <h2>Conversation starters:</h2>
      <h2>Ready to ask?</h2>
      <button className="btn" onClick={() => navigate("/new-game")}>
        New game
      </button>
      {isPending && <Spinner color="var(--blue-spinner)" />}
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
