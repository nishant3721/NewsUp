import React from "react";

const NewsItem = (props) => {
  let { title, imageUrl, description, newsUrl, author, date, source } = props;
  return (
    <div>
      <div className="card my-3">
        <span
          className="position-absolute top-0 translate-middle badge rounded-pill bg-success"
          style={{
            zIndex: 1,
            left: "50%",
          }}
        >
          {source}
        </span>
        <img
          src={
            imageUrl
              ? imageUrl
              : "https://www.qed42.com/sites/default/files/2021-04/Alt%20News%20Logo.jpg"
          }
          className="card-img-top"
          alt="Something went wrong"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-danger">
              By {author ? author : "Unknown"} on
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={newsUrl} className="btn btn-primary">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
