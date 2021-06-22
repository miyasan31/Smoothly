export const READ_POSTS = "READ_POSTS";
export const readPostsAction = (posts) => {
  return {
    type: "READ_POSTS",
    payload: posts,
  };
};
export const DELETE_POSTS = "DELETE_POSTS";
export const deletePostsAction = (posts) => {
  return {
    type: "DELETE_POSTS",
    payload: posts,
  };
};
