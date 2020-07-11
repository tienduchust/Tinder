/**
 * Copyright 2020-present, TIENDUC.
 * All rights reserved.
 * @author ductt.it.hust@gmail.com on 11/06/2020.
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import styles from "./card.module.css";
import CardTitle from "./CardTitle";
import CardBody from "./CardBody";
/**
 * Hiển thị thông tin card
 */
const Card = ({style, friend }) => {
  return (
    <div style={style} className={styles.card}>
      <CardTitle picture={friend ? friend.picture : {}} />
      <CardBody info={friend || {}} />
    </div>
  );
};
Card.propTypes = {
  // className: PropTypes.any,
};
export default memo(Card);
