export const dummy = () => {
  return 1;
};

export const totalLikes = (blogs) => {
  const reduced = (acc, blog) => acc + blog.likes;
  return blogs.reduce(reduced, 0);
};

export const favoriteBlog = (blogs) => {
  const favourite = Math.max(...blogs.map((blog) => blog.likes));
  return blogs
    .filter((blog) => blog.likes === favourite)
    .map(({ title, author, likes }) => ({ title, author, likes }))[0];
};
