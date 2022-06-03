import React, { useState } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import styled from "styled-components";
import ImgPopup from './imgModal.jsx';

const Entry = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 0 0 20px;

`;

const Footer = styled.div`
  padding-top: 20px;
  font: small;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Help = styled.label`
  text-decoration: underline;
  &:hover {
    color: rgb(230, 67, 47);
  }
`;

export default function ReviewListEntry({ review, filter }) {
  const [yes, setYes] = useState(review.helpfulness);
  const [report, setReport] = useState(false);
  const [show, setShow] = useState(false);
  const showModal = () => {
    setShow(true);
    document.documentElement.style.overflow = 'hidden';
  };
  const hideModal = () => {
    setShow(false);
    document.documentElement.style.overflow = 'scroll';
  };

  const handleClickYes = () => {
    axios.put(`/reviews/${review.review_id}/helpful`, {
      params: { review_id: review.review_id },
    })
      .then(() => {
        setYes(yes + 1);
      })
      .catch((err) => {
        console.log('Error putting helpful review', err);
      });
  };

  const handleClickReport = () => {
    axios.put(`/reviews/${review.review_id}/report`, {
      params: { review_id: review.review_id },
    })
      .then(() => {
        setReport(true);
      })
      .catch((err) => {
        console.log('Error putting report review', err);
      });
  };

  return (
    <div>
      {report === false
        && (filter[review.rating] !== undefined || Object.keys(filter).length === 0) ? (
        <>
          <Header>
            <div>
              <StarRatings
                rating={review.rating}
                starDimension="15px"
                starSpacing="2px"
                starRatedColor="DimGray"
                starEmptyColor="Gainsboro"
              />
            </div>
            <div>
              {review.reviewer_name.charAt(0).toUpperCase() + review.reviewer_name.slice(1)}
              ,&nbsp;
              {(new Date(review.date)).toString().slice(4, 16)}
            </div>
          </Header>
          <Entry>
            <div>
              <h3>{review.summary}</h3>
            </div>
            <div>
              <p>{review.body}</p>
            </div>
            <div>
              {review.recommend ?
                <span>&#10003;&nbsp;I recommend this product</span>
                : null}
              {review.response ? <p>{review.response}</p> : null}
            </div>
            <div>
              {
                review.photos.length !== 0
                  ? review.photos.map((photo, i) => (
                    <div key={i}>
                      <img
                        src={photo.url}
                        width="100"
                        alt="header img"
                        onClick={showModal}
                        style={{ cursor: "zoom-in" }}
                      />
                      <ImgPopup show={show} handleClose={hideModal}>
                        <img
                          src={photo.url}
                          width="400"
                          alt="header img"
                        />
                      </ImgPopup>
                    </div>
                  )) : (null)
              }
            </div>
            <Footer>
              Helpful?
              &nbsp;
              <Help>
                <span onClick={handleClickYes} data-testid="yes" style={{ cursor: "pointer" }}>Yes</span>
              </Help>
              {' '}
              (
              <span data-testid="yesCount">{yes}</span>
              )&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <Help>
                <span onClick={handleClickReport} style={{ cursor: "pointer" }}>Report</span>
              </Help>
            </Footer>
          </Entry>
          <hr />
        </>
      ) : (null)}
    </div>
  );
}
