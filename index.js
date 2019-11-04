'use strict';

function displayResults(responseJson) {
  // if there are previous results, remove them
  $('#results-list').empty();
  // iterate through the repo array, stopping at the max number of results
  for (let i = 0; i < responseJson.length; i++){
    // for each repo in the array, list with the name and url
    $('#results-list').append(
      `<li><h3>${responseJson[i].name}</h3>
      <p><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(query) {
  const url = `https://api.github.com/users/${query}/repos`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('#js-error-message').text(`Something went wrong: ${error.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const input = $('#js-github-handle').val();
    getRepos(input);
  });
}

$(watchForm);