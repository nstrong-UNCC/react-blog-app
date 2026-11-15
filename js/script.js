"use strict";

const MAX_LENGTH = 200;

const authors = ['Tyrone', 'Ava', 'Elijah', 'Lucas', 'Ebony', 'Keisha', 'Jemila', 'Daniel'];

const articles = [
  {
    title: 'CSS Selectors',
    author: 'Tyrone',
    date: new Date(2023, 1, 20),
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, dolore? Eveniet numquam quam qui quae laboriosam maxime deleniti aperiam quasi culpa veniam, voluptatibus molestias soluta error ratione assumenda sunt. Sapiente doloribus, nulla a tempora assumenda nostrum est enim corporis fugit quasi ipsam eveniet distinctio impedit dolorum eum dolor. Distinctio, reiciendis!'
  },

  {
    title: 'Cascading',
    author: 'Jemila',
    date: new Date(2023, 2, 1),
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, voluptatum iste? Nisi exercitationem, consectetur unde ab placeat nemo deserunt consequuntur.'
  },

  {
    title: 'CSS Grid',
    author: 'Larry',
    date: new Date(2023, 2, 12),
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur laboriosam aliquam debitis dolores dolorem corporis ipsum itaque culpa, et eaque? Aliquam, est eveniet voluptatem nemo doloremque esse odit dolorum dicta consectetur ipsam corrupti perspiciatis voluptas cupiditate et sapiente. Eligendi modi fugiat pariatur facere, molestiae nihil accusamus animi a impedit laboriosam tempora, eum in iure tenetur fugit praesentium consectetur mollitia ut obcaecati delectus ipsa dolores commodi? Rerum, temporibus velit eum iste praesentium modi amet molestiae illum enim quos pariatur quasi vero quidem, minus placeat assumenda recusandae fugit sunt voluptatem est neque qui! Ut optio quis accusamus placeat ipsa laboriosam laborum debitis.'
  }
];

articles.forEach(article=>{
  addEntry(article);
});


/**
 * This function creates a DOM elment with information from the article object, and adds the element into the DOM.
 * @param {object} article - an article
 */

function addEntry(article) {
  // Create article container
  const articleElement = document.createElement('article');
  articleElement.classList.add('article-container');

  const articlesWrapper = document.querySelector('.articles-wrapper');
  articlesWrapper.append(articleElement);

  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'x';
  deleteButton.classList.add('delete-btn');
  articleElement.append(deleteButton);

  // Create article header
  const articleHeader = document.createElement('div');
  articleHeader.classList.add('article-header');

  // Create avatar
  const avatar = document.createElement('img');
  avatar.classList.add('avatar');
  avatar.alt = 'avatar picture';

  // Find the author's index to determine the avatar filename
  const authorIndex = authors.indexOf(article.author);

  if (authorIndex !== -1) {
    avatar.src = `images/avatar${authorIndex}.png`;
  } else {
    avatar.src = 'images/default.jpeg';
  }

  // Create author name and date
  const authorInfo = document.createElement('div');
  authorInfo.textContent =
    `${article.author} · ${article.date.toDateString()}`;

  // Addavata r and author information to the header
  articleHeader.append(avatar, authorInfo);
  articleElement.append(articleHeader);

  // Create article body
  const articleBody = document.createElement('div');
  articleBody.classList.add('article-body');

  // Create the title
  const heading = document.createElement('h3');
  heading.textContent = article.title;

  // Create the paragraph
  const paragraph = document.createElement('p');

  if (article.content.length <= MAX_LENGTH) {
    // Short content: display everything
    paragraph.textContent = article.content;

    articleBody.append(heading, paragraph);
  } else {
    // Long content: split it into two parts
    const firstPart = article.content.substring(0, MAX_LENGTH);
    const secondPart = article.content.substring(MAX_LENGTH);

    paragraph.textContent = firstPart;

    // Create the ellipsis
    const dots = document.createElement('span');
    dots.textContent = '...';

    // Create the hidden portion
    const hiddenText = document.createElement('span');
    hiddenText.classList.add('hidden');
    hiddenText.textContent = secondPart;

    paragraph.append(dots, hiddenText);

    // Create Read More button
    const readMoreButton = document.createElement('button');
    readMoreButton.classList.add('btn');
    readMoreButton.textContent = 'Read More';

    // Add article elements to the body
    articleBody.append(heading, paragraph, readMoreButton);
  }

  // Add the body to the article
  articleElement.append(articleBody);
}

const form = document.querySelector('#new-article-section form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const content = document.querySelector('#content').value;

  const date = new Date();
  const article = { title, author, content, date };

  articles.push(article);
  addEntry(article);

  form.reset();
});

const articlesWrapper = document.querySelector('.articles-wrapper');

articlesWrapper.addEventListener('click', function(event) {
  // Check whether the clicked element is a delete button
  if (event.target.classList.contains('delete-btn')) {
    // Get the article containing the delete button
    const articleElement = event.target.parentElement;

    // Get the title of the article
    const title = articleElement.querySelector('h3').textContent;

    // Remove the article from the DOM
    articleElement.remove();

    // Remove the matching article from the array
    const index = articles.findIndex(article => article.title === title);

    if (index !== -1) {
      articles.splice(index, 1);
    }
  }
});

articlesWrapper.addEventListener('click', function(event) {
  // Check whether the clicked element is a Read More button
  if (event.target.classList.contains('btn')) {
    // Get the paragraph before the button
    const paragraph = event.target.previousElementSibling;

    // Get all span elements inside the paragraph
    const spans = paragraph.querySelectorAll('span');

    // Toggle the hidden class on each span
    spans.forEach(span => {
      span.classList.toggle('hidden');
    });

    // Change the button text
    if (event.target.textContent === 'Read More') {
      event.target.textContent = 'Read Less';
    } else {
      event.target.textContent = 'Read More';
    }
  }
});