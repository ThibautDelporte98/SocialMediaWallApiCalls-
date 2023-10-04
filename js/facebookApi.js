// Facebook API
function getFacebookPosts() {
    let accessToken = 'EABaUZCnzTXaUBAJsgS647PMGIvf630Toj3d1BwaStzfKJim9ONQp4w5G5ikGLvWaeIYjqvyF8qQzW7E9COG2iQmc0xna5ZA6uzAmWozUbZAbS5qdiITu4O5xZCI4HLX1QO2cz0HZBWzIlTNp177lQTf34t9XLeNsFj5FTpd2xJ9Kciflu3Ob4TKGcfHFHMUXEZAC840KM7tQZDZD'; // hier moetde access token van insta komen
    let pageId = '144666895288661'; // hier moetde user id van facebook komen
    let limit = 10;
    let apiUrl = `https://graph.facebook.com/v17.0/${pageId}?fields=id,name,picture,posts{full_picture,message,created_time,permalink_url,type,source}&access_token=${accessToken}&limit=${limit}.`;
    console.log(apiUrl);

  // Make the API request
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      let userName = data.name;
      let posts = data.posts.data;
      let userImage = data.picture.data.url;
      const countLimit = Math.min(data.posts.data.length, 10);
      const count = Object.keys(data.posts.data).length;
      let morePosts= count - countLimit;
      
     // Sort posts by created_time in descending order (most recent first)
        posts.sort((a, b) => {
          return new Date(b.created_time) - new Date(a.created_time);
       });
        // Get the first 10 posts (most recent posts)
         let recentPosts = posts.slice(0, limit);
      

      recentPosts.forEach(post => {
        let givenDateTime = new Date(post.created_time);
        let currentTime = new Date();
        let fullPictureUrl = post.full_picture;    
        let sourceVideo = post.source;
        let type = post.type;
        let timeDifference = currentTime.getTime() - givenDateTime.getTime();
        let message = post.message;
        let caption = message === undefined ? "" : message;
        // Convert the time difference to the desired format
        let seconds = Math.floor(timeDifference / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);
        let timeAgo;
          if (days !== 0) {
            timeAgo = `${days} dagen geleden.`;
          } else if (hours !== 0) {
            timeAgo = `${hours} uur geleden.`;
          } else if (minutes !== 0) {
            timeAgo = `${minutes} minuten geleden.`;
          } else {
            timeAgo = `${seconds} seconden geleden.`;
          }
          // string when day is not multiple days.
          if (days === 1) {
            timeAgo = `${days} dag geleden.`;
          }
        console.log(days)

        switch (type) {
          case "video":
              let containerVideo = document.getElementById('post-container');
              if (!containerVideo) {
                console.log('Error: Container element not found');
                return;
              }
              // Create a div element for the post
              let postElementVideo = document.createElement('div');
              postElementVideo.classList.add('grid-item','grid-item--width2');
              // Create the HTML structure for the post content
              postElementVideo.innerHTML = `
              <a href="${post.permalink_url}" target="_blank">
                      <div class="grid-postImg">
                          <div class="post-img post-img--2">
                              <div class="overlay-posts--2">
                                  <div class="overlay-text">
                                  ${morePosts} ${morePosts === 1 ?'ander bericht' : 'andere berichten'}
                                  </div>
                              </div>
                              <video class="img-2" width="100" height="100" controls>
                                  <source src="${sourceVideo}" type="video/mp4">
                              </video>
                          </div>
                      </div> 
                      <div class="grid-profiel">
                          <div class="grid-profielImg">
                              <img  src="${userImage}" alt="">
                          </div>
                          <div class="grid-profielInfo">
                              <div class="grid-profielName">
                              ${userName}
                              </div>  
                              <div class="grid-profielTime">
                              ${timeAgo}
                              </div>  
                          </div>
                              <div class="grid-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 35 35">
                                <image id="icons8-facebook-48_2_" data-name="icons8-facebook-48 (2)" width="30" height="30" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADYUlEQVR4nO2ZzU4TURTHeYHSe2c6idG9r2BYu5GYYOnM9JMCYeXGxBWJaxcVsNAWKi2lgIDAyp1bwiPIA5jwYQyYGCRojBE95k5n2unMnZnOvQPpYk7y33T1+92cO+dMZ2AgrLDCCqsvKzK18zgyufs5MrkHg5O7enZgcMLIOz3bEB03smXKJkTzJG+1IC0bgMaMrOtZA5RrBeeanWRXtaBM4xRn68P+BSb2TiNtcJ/weX/w2AEeZxtaUHblxL9An8DjbAOEzAr4FggMfowfXmAX6A94gU3ACu4Ev+kBb4Cv65e1CTizAihVBaRWIKqUACllPRVAyaoFvq7Fv8BNwGcacC9fgxfrB3BweAxfvl3BxdUvLSdfL+Hw0zlE5QUbPKOAP3jUA/yD51twfH4JboUS8zZ4IV3jEQgAPteEu2PLcHT23RW+I9ANzyHgNqDM8Bsu8GuAMzWYXt2HXgolijZ4Ib3MIhAQfK6pXdj9j0c22LOLH/BwehuwPK+dPIHH2h3ohhdZBIKC1wTUCpxf/LQJPC1/ACFV7e75tB2eUSAYeJKoXILff65tAvenapZ+p8OLqTc8AnzwZDgRAVqJit4uXS1jgk+14NkF8sFslOTZ7nph0+7wYqrKIMCxlKHkknbqrSxANFGkC4zOARp9bcocCGrZBs8hwLbXOLWMV73cOgBRXbTBi0kmAfaljFVgvPAexOSSDZ78xiTgPl2t8KuePe9VQ8+aLWALfIxFgBWebJIsAtd//8EdtUiFjyUXGQR6hW+Dm14ByWqc6ExXcjlpheMzgOOz7QhykQrPIeAfnrbLEwm6wCz1wlrhYyqTgPeAssKb36DME5Y8It0Fqjr8EhU+plY4BDjhyXByF6h6wrML8MCb9hq3OyD2AB9TywwCAcGT1QC7CSQNcGd4ZoEg4Mleg+MOAk9e9QQvKQwCfv7y8NooSa/TSmgLGPAVKryklDgEOOHJU8ZdYNETnl0gAPiWwIyDQKEneElZYBBggO+8QXWvw44CI4We4DkEnKerM7wB3hlQQnxOu7CkZcipaxkpgEhayAZfssFLMpNAMPBOqwH95EtUeEmeZxe4DXhJcYdnEiBfRvoFXpKL/j9w4FR9GKfrpzcDX3aGl83gLXhptPjIt0BYYYUV1sBt1H9ja3+JK6NR4QAAAABJRU5ErkJggg=="/>
                              </svg>
                              </div>
                          </div>
                          <div class="grid-txt">
                              <div class="text-hidden">
                              ${caption}                  
                              </div>
                          </div>
                      </a>  
              `;
              // Append the post element to the container
              containerVideo.appendChild(postElementVideo);
          break;
  
          case "photo":
              
              let imageNew = new Image();
              imageNew.src = fullPictureUrl;
  
  
              // Wait for the image to load
              imageNew.onload = function() {
                  let imageSize = {
                  width: imageNew.width,
                  height: imageNew.height
                  };
  
                  
                  if (imageSize.height <= 720) {
                      let container = document.getElementById('post-container');
                      if (!container) {
                      console.log('Error: Container element not found'); 
                      return;
                      }
                      // Create a div element for the post
                      let postElement = document.createElement('div');
                      postElement.className = 'grid-item';
  
                      // Create the HTML structure for the post content
                      postElement.innerHTML = `
                      <a href="${post.permalink_url}" target="_blank">
                         <div class="grid-postImg">
                             <div class="post-img">
                                 <div class="overlay-posts">
                                     <div class="overlay-text">
                                     ${morePosts} ${morePosts === 1 ?'ander bericht' : 'andere berichten'}
                                     </div>
                                 </div>
                                 <img class="img" src="${post.full_picture}" alt="">                     
                             </div>
                         </div> 
                         <div class="grid-profiel">
                             <div class="grid-profielImg">
                                 <img  src="${userImage}" alt="">
                             </div>
                             <div class="grid-profielInfo">
                                 <div class="grid-profielName">
                                 ${userName}
                                 </div>  
                                 <div class="grid-profielTime">
                                 ${timeAgo}
                                 </div>  
                             </div>
                                 <div class="grid-icon">
                                     <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 35 35">
                                         <image id="icons8-facebook-48_2_" data-name="icons8-facebook-48 (2)" width="30" height="30" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADYUlEQVR4nO2ZzU4TURTHeYHSe2c6idG9r2BYu5GYYOnM9JMCYeXGxBWJaxcVsNAWKi2lgIDAyp1bwiPIA5jwYQyYGCRojBE95k5n2unMnZnOvQPpYk7y33T1+92cO+dMZ2AgrLDCCqsvKzK18zgyufs5MrkHg5O7enZgcMLIOz3bEB03smXKJkTzJG+1IC0bgMaMrOtZA5RrBeeanWRXtaBM4xRn68P+BSb2TiNtcJ/weX/w2AEeZxtaUHblxL9An8DjbAOEzAr4FggMfowfXmAX6A94gU3ACu4Ev+kBb4Cv65e1CTizAihVBaRWIKqUACllPRVAyaoFvq7Fv8BNwGcacC9fgxfrB3BweAxfvl3BxdUvLSdfL+Hw0zlE5QUbPKOAP3jUA/yD51twfH4JboUS8zZ4IV3jEQgAPteEu2PLcHT23RW+I9ANzyHgNqDM8Bsu8GuAMzWYXt2HXgolijZ4Ib3MIhAQfK6pXdj9j0c22LOLH/BwehuwPK+dPIHH2h3ohhdZBIKC1wTUCpxf/LQJPC1/ACFV7e75tB2eUSAYeJKoXILff65tAvenapZ+p8OLqTc8AnzwZDgRAVqJit4uXS1jgk+14NkF8sFslOTZ7nph0+7wYqrKIMCxlKHkknbqrSxANFGkC4zOARp9bcocCGrZBs8hwLbXOLWMV73cOgBRXbTBi0kmAfaljFVgvPAexOSSDZ78xiTgPl2t8KuePe9VQ8+aLWALfIxFgBWebJIsAtd//8EdtUiFjyUXGQR6hW+Dm14ByWqc6ExXcjlpheMzgOOz7QhykQrPIeAfnrbLEwm6wCz1wlrhYyqTgPeAssKb36DME5Y8It0Fqjr8EhU+plY4BDjhyXByF6h6wrML8MCb9hq3OyD2AB9TywwCAcGT1QC7CSQNcGd4ZoEg4Mleg+MOAk9e9QQvKQwCfv7y8NooSa/TSmgLGPAVKryklDgEOOHJU8ZdYNETnl0gAPiWwIyDQKEneElZYBBggO+8QXWvw44CI4We4DkEnKerM7wB3hlQQnxOu7CkZcipaxkpgEhayAZfssFLMpNAMPBOqwH95EtUeEmeZxe4DXhJcYdnEiBfRvoFXpKL/j9w4FR9GKfrpzcDX3aGl83gLXhptPjIt0BYYYUV1sBt1H9ja3+JK6NR4QAAAABJRU5ErkJggg=="/>
                                       </svg>
                                 </div>
                             </div>
                             <div class="grid-txt">
                                 <div class="text-hidden">
                                     ${caption}                  
                                 </div>
                             </div>
                         </a>  
                      `;
  
                      // Append the post element to the container
                      container.appendChild(postElement);
                  }else{
                      let container = document.getElementById('post-container');
                      if (!container) {
                      console.log('Error: Container element not found');
                      return;
                      }
                      // Create a div element for the post
                      let postElement = document.createElement('div');
                      postElement.classList.add('grid-item','grid-item--width2');
                      // Create the HTML structure for the post content
                      postElement.innerHTML = `
                      <a href="${post.permalink_url}" target="_blank">
                      <div class="grid-postImg">
                          <div class="post-img">
                              <div class="overlay-posts--2">
                                  <div class="overlay-text">
                                  ${morePosts} ${morePosts === 1 ?'ander bericht' : 'andere berichten'}
                                  </div>
                              </div>
                              <img class="img-2" src="${post.full_picture}" alt="">                     
                          </div>
                      </div> 
                      <div class="grid-profiel">
                          <div class="grid-profielImg">
                              <img  src="${userImage}" alt="">
                          </div>
                          <div class="grid-profielInfo">
                              <div class="grid-profielName">
                              ${userName}
                              </div>  
                              <div class="grid-profielTime">
                              ${timeAgo}
                              </div>  
                          </div>
                              <div class="grid-icon">
                                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 35 35">
                                      <image id="icons8-facebook-48_2_" data-name="icons8-facebook-48 (2)" width="30" height="30" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADYUlEQVR4nO2ZzU4TURTHeYHSe2c6idG9r2BYu5GYYOnM9JMCYeXGxBWJaxcVsNAWKi2lgIDAyp1bwiPIA5jwYQyYGCRojBE95k5n2unMnZnOvQPpYk7y33T1+92cO+dMZ2AgrLDCCqsvKzK18zgyufs5MrkHg5O7enZgcMLIOz3bEB03smXKJkTzJG+1IC0bgMaMrOtZA5RrBeeanWRXtaBM4xRn68P+BSb2TiNtcJ/weX/w2AEeZxtaUHblxL9An8DjbAOEzAr4FggMfowfXmAX6A94gU3ACu4Ev+kBb4Cv65e1CTizAihVBaRWIKqUACllPRVAyaoFvq7Fv8BNwGcacC9fgxfrB3BweAxfvl3BxdUvLSdfL+Hw0zlE5QUbPKOAP3jUA/yD51twfH4JboUS8zZ4IV3jEQgAPteEu2PLcHT23RW+I9ANzyHgNqDM8Bsu8GuAMzWYXt2HXgolijZ4Ib3MIhAQfK6pXdj9j0c22LOLH/BwehuwPK+dPIHH2h3ohhdZBIKC1wTUCpxf/LQJPC1/ACFV7e75tB2eUSAYeJKoXILff65tAvenapZ+p8OLqTc8AnzwZDgRAVqJit4uXS1jgk+14NkF8sFslOTZ7nph0+7wYqrKIMCxlKHkknbqrSxANFGkC4zOARp9bcocCGrZBs8hwLbXOLWMV73cOgBRXbTBi0kmAfaljFVgvPAexOSSDZ78xiTgPl2t8KuePe9VQ8+aLWALfIxFgBWebJIsAtd//8EdtUiFjyUXGQR6hW+Dm14ByWqc6ExXcjlpheMzgOOz7QhykQrPIeAfnrbLEwm6wCz1wlrhYyqTgPeAssKb36DME5Y8It0Fqjr8EhU+plY4BDjhyXByF6h6wrML8MCb9hq3OyD2AB9TywwCAcGT1QC7CSQNcGd4ZoEg4Mleg+MOAk9e9QQvKQwCfv7y8NooSa/TSmgLGPAVKryklDgEOOHJU8ZdYNETnl0gAPiWwIyDQKEneElZYBBggO+8QXWvw44CI4We4DkEnKerM7wB3hlQQnxOu7CkZcipaxkpgEhayAZfssFLMpNAMPBOqwH95EtUeEmeZxe4DXhJcYdnEiBfRvoFXpKL/j9w4FR9GKfrpzcDX3aGl83gLXhptPjIt0BYYYUV1sBt1H9ja3+JK6NR4QAAAABJRU5ErkJggg=="/>
                                    </svg>
                              </div>
                          </div>
                          <div class="grid-txt">
                              <div class="text-hidden">
                                  ${caption}                  
                              </div>
                          </div>
                      </a>  
                      `;
  
                      // Append the post element to the container
                      container.appendChild(postElement);
                  }
              }
              break;
          default:
              console.log("Invalid input.");
          break;
      }

        
    
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

  
  // getFacebookPosts();              
  document.addEventListener('DOMContentLoaded', getFacebookPosts() );