import React from 'react';
import { NavLink } from 'react-router-dom';
import { typRef } from '../../fire/fire';
import Header from '../Header/Header';
import Post from '../Post/Post';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

export default class Explore extends React.Component {
  state = {
    posts: false,
  }

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
      typRef.off();
  }

  getData() {
    const typPosts = [];
      typRef.on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;
        typPosts.push(item);
      });
      typPosts.reverse();
      this.setState({ posts: typPosts });
    });
  };

  render() {
    const { posts } = this.state;
    if (!posts) {
      return (
        <Loader />
      );
    }

    const postsList = posts.map(post => (
      <Post
        typFilter={post.filter}
        key={post.key}
        uid={post.uid}
        user={post.userName}
        title={post.title}
        typ={post.typ}
        visible
      />));
    return (
      <React.Fragment>
        <Header posts>
          <NavLink
            to="/info"
            activeClassName="current"
            aria-label="Get info about typ"
          >
            <i className="fas fa-info-circle"></i>
          </NavLink>
        </Header>
        <section className="explore content__box">
          <h2>
            Enjoy the latest <em>typ_</em>s {` `}
            <span role="img" aria-label="thumb up">
            👍
            </span>
          </h2>
          {postsList}
        </section>
      </React.Fragment>
    );
  }
}
