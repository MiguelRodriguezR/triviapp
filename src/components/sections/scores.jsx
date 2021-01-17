import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CATEGORIES } from "../../constants/constants";
import GameContext from "../../context/game/gameContext";
import Loading from "../layout/loading";
import TopBar from "../layout/topBar";

function Scores() {
  const history = useHistory();
  const { userInfo, scores, loadingService, getScores } = useContext(
    GameContext
  );

  useEffect(() => {
    if (!userInfo.category) {
      let path = ``;
      history.push(path);
      return;
    }
    if (!scores.scores) {
      getScores();
    }
  }, [loadingService]);

  const getCategory = (num) => {
    return 
  }


  if (loadingService) {
    return (<Loading></Loading>);
  }


  return (
    <>
      <TopBar></TopBar>
      <div className="big-container flex-row">
        <div className="section flex-column">
          <div className="title yellow">
          Congratulations you finished the trivia
          here are other people who also have completed the trivia
          </div>
          <div className="flex-column box bg-yellow">
            <table className="score-table">
                <thead>
                    <tr>
                        <th>Nickname</th>
                        <th>Category</th>
                        <th>Trivia Duration</th>
                        <th>Correct Answers</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.scores && scores.scores.map(score => (
                        <tr key={score._id}>
                            <td>{score.nickname}</td>
                            <td>{Object.entries(CATEGORIES).find( c => c[1] == score.category)[0]}</td>
                            <td>{score.trivia_duration} minutes</td>
                            <td>{score.correct_answers}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Scores;
