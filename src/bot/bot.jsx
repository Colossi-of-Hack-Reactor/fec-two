/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Bot() {
  const [pid, setPid] = useState(37311);

  useEffect(() => {
    axios({
      method: 'get',
      url: `/products/${pid}/styles`,
    })
      .then(() => {
        setTimeout(() => {
          setPid((p) => (p + 1));
        }, 400);
      })
      .catch((err) => {
        console.log('axios get products error', err);
      });
  }, [pid]);

  return (
    <div>
      {pid}
    </div>
  );
}

export default Bot;

// SCRAPE ONLY FOR PRODUCTS ON SALE

// useEffect(() => {
//   if (pid <= 38321) {
//     axios.get(`/products/${pid}/styles`)
//       .then((response) => {
//         const styles = response.data;
//         for (let i = 0; i < styles.length; i++) {
//           if (styles[i].sale_price) {
//             console.log(styles[i]);
//           }
//         }
//       })
//       .then(() => {
//         setTimeout(() => {
//           setPid((p) => (p + 1));
//         }, 400);
//       })
//       .catch((err) => {
//         console.log('axios get products error', err);
//       });
//   } else {
//     console.log('DONE!');
//   }
// }, [pid]);

// SCRAPE ALL PRODUCTS

// useEffect(() => {
//   axios({
//     method: 'get',
//     url: '/products',
//     params: {
//       count: 2000,
//     },
//   })
//     .then(() => {
//     })
//     .catch((err) => {
//       console.log('axios get products error', err);
//     });
// }, [pid]);

// SCRAPE FOR STYLES, PHOTOS, SKUS

// useEffect(() => {
//   axios({
//     method: 'get',
//     url: `/products/${pid}/styles`,
//   })
//     .then(() => {
//       setTimeout(() => {
//         setPid((p) => (p + 1));
//       }, 400);
//     })
//     .catch((err) => {
//       console.log('axios get products error', err);
//     });
// }, [pid]);
