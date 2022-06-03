import React, { useState } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import styled from "styled-components";
import ImgPopup from './imgModal.jsx';

const Entry = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 40px 0 20px;
`;

const Title = styled.label`
  font-family: Arial, Helvetica Neue;
  font-size: 20px;
`;

const Small = styled.span`
  font-family: Arial, Helvetica Neue;
  font-size: 13px;
`;

const Text = styled.label`
  font-family: Arial, Helvetica Neue;
  font-size: 16px;
  margin-bottom: 20px;
`;

const Help = styled.label`
  text-decoration: underline;
  &:hover {
    color: rgb(230, 67, 47);
  }
`;

const Footer = styled.div`
  padding-top: 15px;
  font-family: Arial, Helvetica Neue;
  font-size: 13px;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
  margin-top: 10px;
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
          <hr />
          <Entry>
            <Header>
              <StarRatings
                rating={review.rating}
                starDimension="15px"
                starSpacing="2px"
                starRatedColor="DimGray"
                starEmptyColor="Gainsboro"
              />
              <div>
                <Small>
                  {review.reviewer_name.charAt(0).toUpperCase() + review.reviewer_name.slice(1)}
                  ,&nbsp;
                  {(new Date(review.date)).toString().slice(4, 16)}
                </Small>
              </div>
            </Header>
            <div>
              <Title>{review.summary}</Title>
            </div>
            <div>
              <p>{review.body}</p>
            </div>
            <div>
              {review.recommend ?
                <Text>&#10003;&nbsp;I recommend this product</Text>
                : null}
            </div>
            <div>
              {
                review.photos.length !== 0 ? (
                  <PhotoContainer>
                    {review.photos.map((photo, i) => (
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
                    ))}
                  </PhotoContainer>
                ) : (null)
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
        </>
      ) : (null)}
    </div>
  );
}
