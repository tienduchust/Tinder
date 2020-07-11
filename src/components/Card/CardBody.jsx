/**
 * Copyright 2020-present, TIENDUC.
 * All rights reserved.
 * @author ductt.it.hust@gmail.com on 11/06/2020.
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import _ from "lodash";
/**
 * Hiển thị card body
 */
const CardBody = ({ info }) => {
  const [actions] = useState([
    {
      icon: "user",
      title: "My account",
      tabId: "user",
    },
    {
      icon: "calendar",
      title: "My info",
      tabId: "calendar",
    },
    {
      icon: "map",
      title: "My address",
      tabId: "map",
    },
    {
      icon: "phone",
      title: "My phone",
      tabId: "phone",
    },
    {
      icon: "lock",
      title: "My username",
      tabId: "lock",
    },
  ]);
  const [selectedTabId, setSelectedTabiId] = useState("user");

  const _renderInfo = [];
  const _renderAction = [];
  _.forEach(actions, (action) => {
    let isActive = action.tabId === selectedTabId;

    _renderInfo.push(
      <div
        key={action.tabId}
        className={classnames({
          [styles.content_item]: true,
          [styles.content_item__active]: isActive,
        })}
      >
        <h4>{action.title}</h4>
        <p>{info[action.tabId]}</p>
      </div>
    );
    _renderAction.push(
      <div
        key={action.tabId}
        className={classnames({
          [styles.action_item]: true,
          [styles.action_item__active]: isActive,
        })}
        onClick={() => setSelectedTabiId(action.tabId)}
      >
        <FontAwesomeIcon
          icon={action.icon}
          size="2x"
          color={isActive ? "#BCD499" : "#DADADA"}
        />
      </div>
    );
  });

  return (
    <div className={styles.card_body}>
      <div className={styles.card_body__info}>
        <div className={styles.content}>{_renderInfo}</div>
      </div>
      <div className={styles.card_body__action}>
        <div className={styles.card_body__action__wrapper}>{_renderAction}</div>
      </div>
    </div>
  );
};
CardBody.propTypes = {
  info: PropTypes.object.isRequired,
};
export default CardBody;
