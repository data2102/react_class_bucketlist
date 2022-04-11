// 리액트 패키지를 불러옵니다.
import React from "react";
import styled from "styled-components";

import {useDispatch, useSelector} from 'react-redux';

const BucketList = (props) => {
  console.log(props);
  const bucket_list = useSelector(state => state.bucket.list);
  console.log(bucket_list);

  return (
    <ListStyle>
      {bucket_list.map((list, index) => {
        return (
          <ItemStyle 
            className="list_item" 
            key={index} 
            color={list.completed? "#59d393": "aliceblue"}
            onClick={() => {
              props.history.push("/detail/"+index);
            }}
          >
            {list.text}
          </ItemStyle>
        );
      })}
    </ListStyle>
  );
};

const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const ItemStyle = styled.div`
  padding: 16px;
  margin: 8px;
  background-color: ${props => props.color};
`;

export default BucketList;