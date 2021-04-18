import { Component } from 'react';

import { loadPosts } from '../../utils/loadPosts';
import { Posts } from '../../Components/Posts';
import { Button } from '../../Components/Button';
import { TextInput } from '../../Components/TextInput';

import './styles.css';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
    searchValue: ''
  }

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postAndPhotos = await loadPosts();
    this.setState({
      posts: postAndPhotos.slice(page, postsPerPage),
      allPosts: postAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      posts,
      allPosts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filterdPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase());
      })
      : posts;

    return (
      <section className="container">
        <div className="containerSearch">
          {!!searchValue && (
            <h2>Search Value: {searchValue}</h2>
          )}

          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        {filterdPosts.length > 0 && (
          <Posts posts={filterdPosts} />
        )}

        {filterdPosts.length === 0 && (
          <p>No items found!</p>
        )}

        <div className="containerButton">
          {!searchValue && (
            <Button
              text="Load More Posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

