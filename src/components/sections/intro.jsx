import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { CATEGORIES } from "../../constants/constants";
import GameContext from "../../context/game/gameContext";
import TopBar from "../layout/topBar";

const Intro = () => {
  const history = useHistory();
  const { addUserInfo, showError, errorForm } = useContext(GameContext);

  const [userInfo, saveUserInfo] = useState({
    nickName: "",
    category: "",
  });

  const routeChange = () => { 
    let path = `game`; 
    history.push(path);
  }

  const onChangeUserInfo = (e) => {
    saveUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const submitUserInfo = (e) => {
    e.preventDefault();

    if (userInfo.nickName === "" || userInfo.category === "") {
      showError("please provide all data");
      return;
    }
    addUserInfo(userInfo);
    routeChange();
  };

  return (
    <>
      <TopBar></TopBar>
      <div className="big-container flex-row">
        <div className="section flex-column">
          <div className="title yellow">
            Wellcome to triviapp, the competitive trivia application for
            everyone
          </div>
          <form className="flex-column box bg-yellow" onSubmit={submitUserInfo}>
            <div className="flex-row input-container">
              <div className="label pink">Nickname: </div>
              <input
                type="text"
                name="nickName"
                value={userInfo.nickName}
                onChange={onChangeUserInfo}
                className="input bg-pink yellow"
              />
            </div>
            <div className="flex-row input-container">
              <div className="label pink">Category: </div>
              <select
                className="input bg-pink yellow select"
                name="category"
                value={userInfo.category}
                onChange={onChangeUserInfo}
              >
                <option disabled value=''>Select</option>
                {Object.entries(CATEGORIES).map((c) => (
                  <option key={c[1]} value={c[1]}>{c[0]}</option>
                ))}
              </select>
            </div>
            {errorForm != "" ? <p className="error">{errorForm}</p> : null}
            <button className="button pink border-pink bg-yellow">START</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Intro;
