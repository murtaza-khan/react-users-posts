import Button from "react-bootstrap/Button";
import profile from "../image/SeekPng.com_profile-icon-png_9665493.png";
import {BASE_API_URL} from "../constants";
import Card from "react-bootstrap/Card";
import { IoMdPhotos } from "react-icons/io";

import { useState, useEffect } from "react";
import Post from "./Post";

function Posts() {
  const [inputData, setInputData] = useState("");
  const [Item, setItem] = useState([]);
  const [users, setUsers] = useState();
  // ################################### Api##################
  // Function to collect data
  const getApiData = async () => {
    const response = await fetch(
      `${BASE_API_URL}/user/63bdb3a31e10ed9224dd4438`
    ).then((response) => response.json());
    setUsers(response.data);
    const posts = await fetch(
      `${BASE_API_URL}/post/63bdb3a31e10ed9224dd4438/posts`
    ).then((response) => response.json());
    // update the state
    setItem(posts.data.posts);
  };
  useEffect(() => {
    console.log("info");
    getApiData();
  }, []);
  const onChange = (e) => {
    setInputData(e.target.value);
  };
  const addItem = async () => {
    if (!inputData) {
    } else {
      console.log("UUU", users._id);
      const response = await fetch(`${BASE_API_URL}/post`, {
        method: "POST",
        body: JSON.stringify({
          title: inputData,
          userId: users._id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());
      setItem([response.data, ...Item]);
      setInputData("");
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(240, 231, 231)", minHeight: "100vh" }}>
      <div style={{ padding: "5rem" }}>
        {/* ####################---Div-A-----###################################################################### */}
        <Card
          className="center col-lg-6 col-md-10 col-sm-12 col-xs-12"
          style={{ borderRadius: "10px" }}
        >
          <div className="upper-div" style={{ margin: "3%" }}>
            <Card.Img
              variant="top"
              src={profile}
              style={{ width: "4rem", height: "4rem" }}
            />
            <input
              className="removeOutline"
              style={{ marginLeft: "3%", border: "none", fontWeight: "bold" }}
              type="text"
              value={inputData}
              onChange={onChange}
              placeholder="What is on your mind?"
            />
          </div>
          <hr style={{ margin: "2%" }} />
          <div>
            <div
              className="upload-btn-wrapper float-left"
              style={{ cursor: "pointer" }}
            >
              <Button variant="dark" style={{ borderRadius: "50px" }}>
                <IoMdPhotos /> Photo/Video
              </Button>
              <input type="file" name="myfile" />
            </div>
            <div className="float-right">
              <Button className="btn-post" onClick={addItem}>
                Post It
              </Button>
            </div>
          </div>
        </Card>
        {Item.map((currentElement, index) => {
          return <Post post={currentElement} key={currentElement._id} users={users}/>;
        })}
      </div>
    </div>
  );
}

export default Posts;
