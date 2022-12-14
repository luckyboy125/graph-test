import { useEffect, useState } from "react";
import ColorBtn from "../../../../components/ColorBtn/ColorBtn";
import "./CheckListsShortItem.css";

function CheckListsShortItem({ className, title, type, avatar, user, click }) {
  const handleClick = () => {
    click();
  };
  return (
    <div className={`checkListsShortItem ${className}`}>
      <div className="circleIcon"></div>
      <div className="checkListsShortItemContent">
        <div className="title">{title}</div>
        <div className="des"></div>
        <div className="items">
          <div className="itemsFirst">
            <ColorBtn
              className="itemBtn"
              name="10 Mar"
              color="#FF0000"
              width={128}
            />
            <div className="avatarRoot">
              <img src={avatar} className="avatar" alt="avatar" />
              {user}
            </div>
          </div>
          <div className="deleteIcon">
            <i className="fas fa-trash-alt"></i>
          </div>
        </div>
      </div>
      <div className="dotGroup" onClick={handleClick}>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}

export default CheckListsShortItem;