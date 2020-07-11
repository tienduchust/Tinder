/**
 * Copyright 2020-present, TIENDUC.
 * All rights reserved.
 * @author ductt.it.hust@gmail.com on 11/06/2020.
 */

import React from "react";
import PropTypes from "prop-types";
import styles from "./card.module.css";
/**
 * Hiển thị card title
 */
const CardTitle = ({ picture }) => {
  return (
    <div className={styles.card_title}>
      <div className={styles.card_title__background} />
      <div className={styles.card_title__picture}>
        <img src={picture.src} alt={picture.alt} />
      </div>
    </div>
  );
};
CardTitle.propTypes = {
  className: PropTypes.any,
};
export default CardTitle;
