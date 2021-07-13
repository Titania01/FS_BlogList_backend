export const dummy = () => {
  return 1;
};

export const totalLikes = (blogs) => {
  const reduced = (acc, blog) => acc + blog.likes;
  return blogs.reduce(reduced, 0);
};
