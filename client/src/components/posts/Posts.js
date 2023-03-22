import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostItem from "./PostItem";
import { getPosts } from "../../actions/post";

const Posts = ({ getPosts, post: { posts } }) => {
  const [searchValue, setSearchValue] = useState("");
  const [postsByValue, setPostsByValue] = useState([]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const filterPosts = () => {
    posts.map((post) => {
      if (post.text.toLowerCase().search(searchValue.toLowerCase()) !== -1) {
        if (!postsByValue.find((postByName) => postByName === post)) {
          setPostsByValue((prev) => [...prev, post]);
        }
      }
    });
  };

  useEffect(() => {
    setPostsByValue([]);
    filterPosts();
  }, [searchValue]);

  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <input
        className="search"
        placeholder="Find post"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue !== "" ? (
        <div className="posts">
          {postsByValue.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="posts">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
