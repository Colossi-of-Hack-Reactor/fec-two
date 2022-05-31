import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NameDiv = styled.div`
  grid-column-start: 1;
  font-size: 12px;
  font-weight: 200;
`;

const NameDate = function NameDate({ info }) {
  const name = info.answerer_name;
  let date = new Date(info.date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  date = date.toLocaleDateString('en-us', options);
  if (name === 'seller' || name === 'Seller') {
    return (
      <NameDiv>
        by
        {' '}
        <strong>{name}</strong>
        {' '}
        ,
        {date}
      </NameDiv>
    );
  }
  return (
    <NameDiv>
      by
      {' '}
      {name}
      ,
      {' '}
      {date}
    </NameDiv>
  );
};

export default NameDate;
