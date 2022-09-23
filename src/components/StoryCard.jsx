import React from 'react';
import styled from 'styled-components';

export default function StoryCard({
  objectID,
  title,
  author,
  url,
  date,
  points,
  numComments,
  removeStory,
}) {
  return (
    <Article className="story-card">
      <h4 className="title">{title}</h4>
      <p className="info">
        {points} points by <span>{author} | </span>
        {numComments} comments
      </p>
      <p className="info">{date}</p>

      <div className="btn">
        <a
          href={url}
          className="readMore"
          target="_blank"
          rel="noopener noreferrer"
        >
          read more
        </a>
        <button
          type="button"
          className="removeBtn"
          onClick={() => removeStory(objectID)}
        >
          remove
        </button>
      </div>
    </Article>
  );
}

const Article = styled.article`
  background: var(--clr-white);
  border-radius: var(--radius);
  padding: 1rem 2rem;

  .title {
    line-height: 1.5;
    margin-bottom: 0.25rem;
  }

  .info {
    margin-bottom: 0.5rem;
    color: var(--clr-grey-5);
  }

  .btn {
    .readMore {
      font-size: 0.85rem;
      margin-right: 0.75rem;
      text-transform: capitalize;
      color: var(--clr-primary-5);
    }

    .removeBtn {
      background: transparent;
      color: var(--clr-red-dark);
      border-color: transparent;
      cursor: pointer;
      text-transform: capitalize;
      font-size: 0.85rem;
    }
  }
`;
