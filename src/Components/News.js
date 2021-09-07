import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import ProgressBar from "./ProgressBar";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?&category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(30);
    let data = await fetch(url);
    let parseData = await data.json();
    props.setProgress(70);
    setArticles(parseData.articles);
    setTotalArticles(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalize(props.category)} - NewsUp`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    document.title = `${capitalize(props.category)} - NewsUp`;
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?&category=${
      props.category
    }&country=${props.country}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    props.setProgress(30);
    let data = await fetch(url);
    let parseData = await data.json();
    props.setProgress(70);
    setArticles(articles.concat(parseData.articles));
    setLoading(false);
    props.setProgress(100);
  };

  return (
    <>
      <h1
        style={{
          marginTop: `90px`,
          color: props.mode === `light` ? `black` : `white`,
        }}
        className="text-center"
      >
        Headlines - Top stories from {capitalize(props.category)}
      </h1>

      {loading && <ProgressBar />}

      <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={fetchData}
        hasMore={articles.length !== totalArticles}
        loader={<h4>Loading...</h4>}
        // endMessage={
        //   <p style={{ textAlign: "center" }}>
        //     <b>Yay! You have seen it all</b>
        //   </p>
        // }
      >
        <div className="container">
          <div className="my-5 row">
            {articles.map((item) => {
              return (
                <div key={item.url} className="col-md-4">
                  <NewsItem
                    mode={props.mode}
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
};

News.defaultProps = {
  country: "in",
  pageSize: 3,
  category: "general",
};

News.propTypes = {
  category: PropTypes.string,
  country: PropTypes.string,
  pageSize: PropTypes.number,
};

export default News;
