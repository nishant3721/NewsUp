import React, { Component } from "react";
import NewsItem from "./NewsItem";
import ProgressBar from "./ProgressBar";
import PropTypes from "prop-types";

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

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&&category=${this.props.category}&country=${this.props.country}&apiKey=3538028a157942458c65e9d748a03825&page=1&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalArticles: parseData.totalResults,
      loading: false,
    });
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?&category=${
      this.props.category
    }&country=${
      this.props.country
    }&apiKey=3538028a157942458c65e9d748a03825&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };

  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?&category=${
      this.props.category
    }&country=${
      this.props.country
    }&apiKey=3538028a157942458c65e9d748a03825&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      page: this.state.page + 1,
      loading: false,
    });
  };

  capitalize(word) {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">
          {this.capitalize(this.props.category)} Headlines - Top stories at the
          moment
        </h1>

        {this.state.loading && <ProgressBar />}

        <div className="my-5 row">
          {!this.state.loading &&
            this.state.articles.map((item) => {
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

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            onClick={this.handlePreviousClick}
            type="button"
            className="btn btn-outline-primary"
          >
            &larr; Previous
          </button>

          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalArticles / this.props.pageSize)
            }
            onClick={this.handleNextClick}
            type="button"
            className="mx-3 btn btn-outline-primary"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
