import React from 'react';
import {
  NewsItemContainer,
  Border,
  NewsTitle,
  NewsDescription,
  NewsDateLinkContainer,
  NewsDate,
  NewsLink,
} from './NewsItem.styled.js';

const NewsItem = ({ title, description, date, url }) => {
  return (
    <NewsItemContainer>
      <Border />
      <NewsTitle>{title}</NewsTitle>
      <NewsDescription>{description}</NewsDescription>
      <NewsDateLinkContainer>
        <NewsDate>{date}</NewsDate>
        <NewsLink href={url} target="_blank" rel="noopener noreferrer">
          Read More
        </NewsLink>
      </NewsDateLinkContainer>
    </NewsItemContainer>
  );
};

export default NewsItem;