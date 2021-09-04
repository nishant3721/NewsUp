import React, { Component } from "react";
import NewsItem from "./NewsItem";
import ProgressBar from "./ProgressBar";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 3,
    category: "general",
  };

  static propTypes = {
    category: PropTypes.string,
    country: PropTypes.string,
    pageSize: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles: 0,
    };
    document.title = `${this.capitalize(this.props.category)} - NewsUp`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(30);
    let data = await fetch(url);
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalArticles: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
  };

  capitalize(word) {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  render() {
    return (
      <>
        <h1 className="my-3 text-center">
          Headlines - Top stories from {this.capitalize(this.props.category)}
        </h1>

        {this.state.loading && <ProgressBar />}

        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={
            this.state.articles.length !== this.state.totalArticles.length
          }
          loader={<ProgressBar />}
        >
          <div className="container">
            <div className="my-5 row">
              {this.state.articles.map((item) => {
                return (
                  <div key={item.url} className="col-md-4">
                    <NewsItem
                      title={item.title}
                      imageUrl={item.urlToImage}
                      description={item.description}
                      newsUrl={item.url}
                      author={item.author}
                      date={item.publishedAt}
                      source={item.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
