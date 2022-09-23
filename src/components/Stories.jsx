import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useGlobalContext } from '../context';

export default function Stories() {
  const { isLoading, hits, removeStory } = useGlobalContext();

  if (isLoading) return <div className="loading" />;

  return (
    <StoriesSection>
      {hits.map((story) => {
        const {
          objectID,
          title,
          num_comments: NumCm,
          url,
          points,
          author,
          created_at: caAt,
        } = story;

        const date = format(new Date(caAt), 'MMM d, yyyy KK:mm aa');
        return (
          <article key={objectID} className="story-card">
            <h4 className="title">{title}</h4>
            <p className="info">
              {points} points by <span>{author} | </span>
              {NumCm} comments
            </p>
            <p className="info">{date}</p>

            <div className="storyCard-btn">
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
          </article>
        );
      })}
    </StoriesSection>
  );
}

const StoriesSection = styled.section`
  width: 90vw;
  max-width: 1170px;
  margin: 0 auto;
  margin-bottom: 5rem;
  display: grid;
  gap: 2rem;

  @media screen and (min-width: 992px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* align-items: start; */
  }

  .story-card {
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
  }

  .storyCard-btn {
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
