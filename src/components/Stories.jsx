import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useGlobalContext } from '../context';
import StoryCard from './StoryCard';
import NavigateBtn from './NavigateBtn';

export default function Stories() {
  const { isLoading, hits, removeStory, error } = useGlobalContext();

  if (isLoading) return <div className="loading" />;

  let content;

  if (error.state) {
    content = (
      <ErrorContainer>
        <img
          src="./images/Error.png"
          width="200px"
          height="200px"
          alt="Error"
        />
        <center>
          <p>{error.message}</p>
        </center>
      </ErrorContainer>
    );
  } else
    content = (
      <>
        <NavigateBtn />
        <StoriesSection>
          {hits.map((story) => {
            const {
              objectID,
              title,
              num_comments: numComments,
              url,
              points,
              author,
              created_at: createAt,
            } = story;

            const date = format(new Date(createAt), 'MMM d, yyyy KK:mm aa');

            return (
              <StoryCard
                key={objectID}
                {...{
                  title,
                  numComments,
                  removeStory,
                  url,
                  points,
                  author,
                  date,
                  objectID,
                }}
              />
            );
          })}
        </StoriesSection>
      </>
    );

  return content;
}
const ErrorContainer = styled.section`
  width: 90vw;
  max-width: 1170px;
  margin: 0 auto;
  padding: 0 2em;
  p {
    font-size: 1.8rem;
  }
  img {
    margin: 0 auto;
    width: 200px;
    margin-bottom: 2em;
  }
`;

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
  }
`;
