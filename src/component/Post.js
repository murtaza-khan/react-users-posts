import React from "react";
import { ImLocation } from "react-icons/im";
import { FaCommentDots, FaTrash, FaPencilAlt, FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IoIosHeart, IoMdSend } from "react-icons/io";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import profile from "../image/SeekPng.com_profile-icon-png_9665493.png";
import Card from "react-bootstrap/Card";
import { BASE_API_URL } from "../constants";

const Post = ({ post,users }) => {
  const [show, setShow] = useState(false);
  const [updated, setUpdated] = useState("");
  const [comment, setComment] = useState(post.comments);
  const [like, setLike] = useState(post.liked);
  console.log('>>>>>>.',);
  const isLiked = async (id, liked) => {
    await fetch(`${BASE_API_URL}/post/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        liked: liked,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
    post.liked = liked;
    setLike(liked);
  };
  const secONChange = (e, id) => {
    const { value } = e.target;
    setUpdated(value);
  };
  const addComment = async (id, newComment) => {
    if (newComment === "") return true;
    let content = [...comment, newComment];
    const postComments = await fetch(`${BASE_API_URL}/post/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        comments: content,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
    setComment(postComments.data.comments);
    setUpdated("");
  };

  return (
    <Card className="mt-5 center col-lg-6 col-md-10 col-sm-12 col-xs-12 center">
      <div className="upper-div " style={{ margin: "3%" }}>
        <Card.Img
          variant="top"
          src={profile}
          style={{ width: "4rem", height: "4rem", float: "left" }}
        />
        <div style={{ float: "left", marginLeft: "3%" }}>
          <h5 style={{ marginBottom: "0" }}>{`${users.firstName} ${users.lastName}`}</h5>
          <a style={{ textDecoration: "none", fontWeight: "bold" }} href="/">
            {" "}
            <ImLocation /> OH, USA
          </a>
          <p style={{ marginBottom: "0" }}>Time</p>
        </div>
        <BsThreeDots style={{ float: "right" }} />
      </div>
      <div style={{ marginLeft: "2%" }}>
        <p style={{ fontWeight: "bold" }}>{post.title}</p>
        <p style={{ marginBottom: "0" }}>{like ? like : 0} Like . 0 Comment</p>
      </div>
      <hr style={{ margin: "0" }} />
      <div>
        <div>
          <Button
            variant="light"
            onClick={() => isLiked(post._id, post.liked ? post.liked + 1 : 1)}
            style={{ color: "gray", background: "white" }}
          >
            <IoIosHeart /> Like
          </Button>
          <Button
            variant="light"
            onClick={() => setShow(!show)}
            style={{
              marginLeft: "3rem",
              color: "gray",
              background: "white",
            }}
          >
            {" "}
            <FaCommentDots /> Comment
          </Button>
        </div>
      </div>
      {show ? (
        <div className="container">
          <Card.Img
            variant="top"
            src={profile}
            style={{ width: "2rem", height: "2rem", float: "left" }}
          />
          <input
            className="removeOutline"
            type="text"
            value={updated}
            onChange={(e) => secONChange(e, post._id)}
            placeholder="Comment here"
            style={{
              paddingLeft: "1rem",
              border: "none",
              fontWeight: "bold",
              width: "70%",
              backgroundColor: "rgb(240, 231, 231)",
              borderRadius: "30px",
              marginLeft: "1rem",
            }}
          />
          <IoMdSend
            onClick={() => addComment(post._id, updated)}
            style={{
              float: "right",
              marginRight: "5%",
              marginTop: "1%",
            }}
          />
        </div>
      ) : null}
      {comment?.map((currentComment, id) => {
        return (
          <div key={id} className="upper-div " style={{ margin: "3%" }}>
            <Card.Img
              variant="top"
              src={profile}
              style={{
                width: "2rem",
                height: "2rem",
                float: "left",
                marginTop: "1.8rem",
              }}
            />
            <div
              className="container"
              style={{
                float: "left",
                width: "90%",
                marginLeft: "3%",
                backgroundColor: "rgb(240, 231, 231)",
                borderRadius: "5px",
                paddingTop: "2%",
              }}
            >
              <h5 style={{ marginBottom: "0" }}>Patrick Shuff</h5>
              <a
                style={{ textDecoration: "none", fontWeight: "bold" }}
                href="/"
              >
                professional-Student
              </a>
              <p style={{ marginBottom: "0", fontWeight: "bold" }}>
                {currentComment}
              </p>
              <div style={{ display: "flex" }}>
                <p>0 Like</p> |
                <p style={{ marginLeft: "3%" }}>
                  <FaHeart /> Like
                </p>{" "}
                |
                <p style={{ marginLeft: "3%" }}>
                  <FaPencilAlt /> Edit
                </p>{" "}
                |
                <p style={{ marginLeft: "3%" }}>
                  <FaTrash /> Delete
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </Card>
  );
};

export default Post;
