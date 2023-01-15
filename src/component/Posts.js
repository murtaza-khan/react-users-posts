import Button from "react-bootstrap/Button";
import profile from "../image/SeekPng.com_profile-icon-png_9665493.png";
import Card from "react-bootstrap/Card";
import { IoMdPhotos } from "react-icons/io";

import { useState, useEffect } from "react";
import Post from "./Post";
import { createPost, getPosts, getUser } from "../utils";

function Posts() {
  const [inputData, setInputData] = useState("");
  const [Item, setItem] = useState([]);
  const [users, setUsers] = useState();
  // ################################### Api##################
  // Function to collect data

  useEffect(async () => {
    const response = await getUser();
    const posts = await getPosts();
    setUsers(response.data);
    setItem(posts.data.posts);
  }, []);
  const onChange = (e) => {
    setInputData(e.target.value);
  };
  const addItem = async () => {
    if (inputData) {
      const response = await createPost({
        title: inputData,
        userId: users._id,
      });
      setItem([response.data, ...Item]);
      setInputData("");
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(240, 231, 231)", minHeight: "100vh" }}>
      <div className="container">
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
          return (
            <Post
              post={currentElement}
              key={currentElement._id}
              users={users}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Posts;
