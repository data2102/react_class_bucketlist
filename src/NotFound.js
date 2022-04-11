import React from "react";

const NotFound = (props) => {

    return (
        <div>
            <h1>잘못된주소입니다!!</h1>
            <button onClick={() => {props.history.goBack();}}>뒤로가기</button>
        </div>
    );
};

export default NotFound;