import React, { useState, useEffect, useCallback } from "react";
import Card from "../../components/Card";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faCalendar,
  faMap,
  faPhone,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import _ from "lodash";
import { List } from "immutable";
import { Swipeable } from "react-swipeable";
import { $LocalStorage } from "../../utils/helpers";
library.add(faUser, faCalendar, faMap, faPhone, faLock);
const MY_FAVORITE = "MY_FAVORITE";
const padding = {
  padding: "10px 10px",
  margin: "auto",
};
const Tinder = ({ preLoad, preLoadImage }) => {
  const [friends, setFriends] = useState(List());
  const [favors, setFavor] = useState(
    $LocalStorage.sls.getObject(MY_FAVORITE, [])
  );
  const [, setSwipeState] = useState({
    sliding: false,
    action: "right",
  });

  // Handlers

  /**
   * Handler lưu người được chọn vào local storage
   */
  const _handleSaveFriendToLocal = useCallback((friend) => {
    let savedLocalArr = $LocalStorage.sls.getObject(MY_FAVORITE, []);
    savedLocalArr.unshift(friend);
    $LocalStorage.sls.setObject(MY_FAVORITE, savedLocalArr);
    setFavor((prev) => {
      let next = prev;
      next.unshift(friend);
      return next;
    });
  }, []);

  /**
   * Handler vuốt sang phải
   */
  const _handleSwipeRight = useCallback(() => {
    setFriends((prev) => {
      let next = prev;
      // Lấy thông tin người ở đầu mảng để lưu vào local storage
      let choosenFriend = prev.first();
      _handleSaveFriendToLocal(choosenFriend);
      // Xóa phẩn từ vừa lưu khỏi mảng
      next = next.shift();
      return next;
    });
  }, [_handleSaveFriendToLocal]);
  /**
   * Handler convert raw data
   */
  const _handleConverRawData = useCallback((raw) => {
    return {
      user: `${_.get(raw, "name.first")}${_.get(raw, "name.first")}`,
      calendar: _.get(raw, "gender"),
      map: `${_.get(raw, "location.city")}${_.get(raw, "location.state")}`,
      phone: _.get(raw, "phone"),
      lock: _.get(raw, "username"),
      picture: {
        src: _.get(raw, "picture"),
        alt: _.get(raw, "username"),
      },
    };
  }, []);

  /**
   * Handler lấy friend
   */
  const _handleLoadData = useCallback(async () => {
    let result = await axios.get("https://randomuser.me/api/0.4/?randomapi");
    let newFriend = _handleConverRawData(_.get(result, "data.results[0].user"));
    if (newFriend.user) {
      setFriends((prev) => prev.push(newFriend));
    }
  }, [_handleConverRawData]);

  /**
   * Handler vuốt sang trái
   * Xóa phần tử đầu tiên khỏi danh sách bạn đã load
   */
  const _handleSwipeLeft = useCallback(() => {
    setSwipeState({
      sliding: true,
      action: "left",
    });
    setFriends((prev) => prev.shift());
    setTimeout(() => {
      setSwipeState((prev) => ({
        ...prev,
        sliding: false,
      }));
    }, 50);
  }, []);
  /**
   * Handler preload {preLoadImage} images
   * Load trước 3 ảnh tiếp theo
   */
  const _handlePreLoadNextImage = useCallback(() => {
    for (let i = 1; i <= preLoadImage; i++) {
      let friend = friends.get(i);
      if (friend) {
        let img = new Image();
        img.src = friend.picture.src;
      } else {
        break;
      }
    }
  }, [friends, preLoadImage]);
  // Events

  /**
   * Event lấy danh sách bạn preload
   */
  useEffect(() => {
    // Nếu số lượng friend < preload thì gọi api để lấy tiếp
    if (friends.size <= preLoad) {
      _handleLoadData();
    } else {
      _handlePreLoadNextImage();
    }
  }, [_handleLoadData, _handlePreLoadNextImage, friends.size, preLoad]);
  return (
    <div
      className="tinder"
    >
      <div id="myTinder" style={{ display: "flex", height: 400 }}>
        <div style={padding} className="left">
          <button onClick={_handleSwipeLeft} className="btn btn-secondary">
            {"<<"}
          </button>
        </div>

        <Swipeable
          style={{ cursor: "pointer" }}
          preventDefaultTouchmoveEvent={true}
          trackMouse={true}
          onSwipedLeft={_handleSwipeLeft}
          onSwipedRight={_handleSwipeRight}
        >
          <Card style={{ order: 1 }} friend={friends.first()} />
        </Swipeable>
        <div style={padding} className="right">
          <button onClick={_handleSwipeRight} className="btn btn-secondary">
            {">>"}
          </button>
        </div>
      </div>
      <div id="myFavor">
        <ul className="favor-list">
          {_.map(favors, (favor,favorId) => (
            <li key={favorId+favor.user}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="image">
                  <img src={favor.picture.src} alt="" />
                </div>
                <div className="description">
                  <h4>{favor.user}</h4>
                  <em>{favor.phone}</em>
                  <em>{favor.lock}</em>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tinder;
