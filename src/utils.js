import { BASE_API_URL } from "./constants";

export const getUser = async () => {
  const response = await fetch(
    `${BASE_API_URL}/user/63bdb3a31e10ed9224dd4438`,
    {
      method: "GET",
    }
  ).then((response) => response.json());
  return response;
};

export const getPosts = async () => {
  const posts = await fetch(
    `${BASE_API_URL}/post/63bdb3a31e10ed9224dd4438/posts`,
    {
      method: "GET",
    }
  ).then((response) => response.json());
  return posts;
};

export const createPost = async (data) => {
  const response = await fetch(`${BASE_API_URL}/post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => response.json());
  return response;
};

export const createComment = async (id, content) => {
  const postComments = await fetch(`${BASE_API_URL}/post/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      comments: content,
    }),
  }).then((response) => response.json());
  return postComments;
};

export const addLiked = async (id, liked) => {
  const response = await fetch(`${BASE_API_URL}/post/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      liked: liked,
    }),
  }).then((response) => response.json());
  return response;
};
