'use strict';

let posts = [
    {
        'id': 0,
        'author': 'Rick Sanchez',
        'creationDate': '1.5.2023',
        'authorImg': 'img/avatars/avatar1.svg',
        'img': 'img/postImg/burn_house.webp',
        'likes': 13,
        'liked': false,
        'comments': [
            {
                'author': 'Rick Smalls',
                'comment': 'Nice pic!',
            },
            {
                'author': 'John Doe',
                'comment': 'Thanks!',
            }
        ],
    },
    {
        'id': 1,
        'author': 'Randy Marsh',
        'creationDate': '12.7.2023',
        'authorImg': 'img/avatars/avatar2.svg',
        'img': 'img/postImg/harold.jpg',
        'likes': 42,
        'liked': false,
        'comments': [
            {
                'author': 'Eric Cartman',
                'comment': 'Nice pic!',
            },
            {
                'author': 'Jane Doe',
                'comment': 'Thanks!',
            }
        ],
    },
    {
        'id': 2,
        'author': 'Agent Smith',
        'creationDate': '17.12.2023',
        'authorImg': 'img/avatars/avatar3.svg',
        'img': 'img/postImg/nice.webp',
        'likes': 0,
        'liked': false,
        'comments': [
            {
                'author': 'John Doe',
                'comment': 'Nice pic!',
            },
            {
                'author': 'Lola Doe',
                'comment': 'Thanks!',
            }
        ],
    }
];

const createAuthorTemplate = (post) => {
    return /*html*/`
        <div class="post-author">
            <div class="author">
                <img class="author-img" src="${post.authorImg}" alt="author">
                <p class="author-name">${post.author}</p>
                <p class="creation-date">${post.creationDate}</p>
            </div>
            <img class="more" src="img/dots_v.png">
        </div>
    `;
};

const createActionsTemplate = (post) => {
    return /*html*/`
        <div class="actions">
            <div class="left-actions">
                <img class="like-img" id="like-img-${post.id}" src="img/heart.png" onclick="likePost(${post.id})">
                <img src="img/talk.png" alt="" class="talk-img">
                <img src="img/send.png" alt="" class="send-img">
            </div>
            <div class="right-actions">
                <img src="img/bookmark.png" alt="" class="bookmark">
            </div>
        </div>
    `;
};

const createCommentsSectionTemplate = (post) => {
    return /*html*/`
        <div class="comments" id="comments-${post.id}"></div>
        <div class="comment-input-section">
            <input id="comment-${post.id}" type="text" class="comment-input" placeholder="Add a comment...">
            <button class="comment-btn" onclick="saveComment(${post.id})">Send</button>
        </div>
    `;
};

const createPostTemplate = (post) => {
    return /*html*/`
        <article class="post">
            ${createAuthorTemplate(post)}
            <img src="${post.img}" alt="" class="post-img">
            ${createActionsTemplate(post)}
            <p class="likes" id="likes-${post.id}">${post.likes} likes</p>
            ${createCommentsSectionTemplate(post)}
        </article>
    `;
};

const createPost = (post) => {
    const mainSection = document.getElementById('main-section');
    mainSection.innerHTML += createPostTemplate(post);
    createComments(post.comments, post.id);
    likeImage(post.id);
};

const likeImage = (id) => {
    let img = document.getElementById('like-img-'+ id);
    img.src = posts[id].liked ? 'img/red_heart.png' : 'img/heart.png';
};

const createComments = (comments, id) => {
    let commentsSection = document.getElementById('comments-'+ id);
    comments.forEach(comment => {
        commentsSection.innerHTML += /*html*/`
            <div class="comment">
                <p class="author-name"><b>${comment.author}</b></p>
                <p class="comment-text">${comment.comment}</p>
            </div>
        `;
    });
};

const saveComment = (id) => {
    let comment = document.getElementById('comment-'+ id).value,
        commentsSection = document.getElementById('comments-'+ id);

    if (comment === '') {
        return;
    }

    commentsSection.innerHTML += /*html*/`
        <div class="comment">
            <p class="author-name"><b>You</b></p>
            <p class="comment-text">${comment}</p>
        </div>
    `;

    document.getElementById('comment-'+ id).value = '';
    saveCommentToPosts(id, comment);
};

const saveCommentToPosts = (id, comment) => {
    posts[id].comments.push({
        'author': 'You',
        'comment': comment,
    });
    localStorage.setItem('posts', JSON.stringify(posts));
};

const likePost = (id) => {
    if (posts[id].liked) {
        posts[id].liked = false;
        document.getElementById('like-img-'+ id).src = 'img/heart.png';
        posts[id].likes--;
    } else {
        posts[id].liked = true;
        document.getElementById('like-img-'+ id).src = 'img/red_heart.png';
        posts[id].likes++;
    }
    localStorage.setItem('posts', JSON.stringify(posts));
    document.getElementById('likes-'+ id).innerHTML = posts[id].likes + ' likes';
};

const createPosts = () => {
    posts.forEach(post => {
        createPost(post);
    });
};

const load = () => {
    if (localStorage.getItem('posts')) {
        posts = JSON.parse(localStorage.getItem('posts'));
    }

    createPosts();
};

const windowReload = () => {
    window.location.reload();
}
