import api from '../../services/api';
import { mockPostsData, mockCategories } from '../mock/mockPosts';

let postsStore = [...mockPostsData];

export const postService = {
  async getCategories() {
    return Promise.resolve(mockCategories);
  },

  async getPosts(categoryFilter = "All") {
    if (categoryFilter === "All") {
      return Promise.resolve(postsStore);
    }
    return Promise.resolve(postsStore.filter(p => p.category === categoryFilter));
  },

  async getPostById(id) {
    const post = postsStore.find(p => p.id === id);
    return Promise.resolve(post || null);
  },

  async createPost(postData) {
    const newPost = {
      id: `post-${Date.now()}`,
      authorName: "Ansh Sharma",
      authorRole: "SE IT Student",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      timeAgo: "Just now",
      category: postData.category || "General",
      title: postData.title,
      content: postData.content,
      votes: 0,
      userVoted: 0,
      commentsCount: 0,
      comments: []
    };
    postsStore.unshift(newPost);
    return Promise.resolve(newPost);
  },

  async votePost(id, direction) {
    postsStore = postsStore.map(p => {
      if (p.id === id) {
        const currentVote = p.userVoted;
        let newVote = direction;
        let newVotesCount = p.votes;

        if (currentVote === direction) {
          // Toggle off
          newVote = 0;
          newVotesCount -= direction;
        } else {
          newVotesCount += (direction - currentVote);
        }

        return { ...p, votes: newVotesCount, userVoted: newVote };
      }
      return p;
    });
    return Promise.resolve(postsStore.find(p => p.id === id));
  },

  async addComment(postId, commentText) {
    const newComment = {
      id: `c-${Date.now()}`,
      authorName: "Ansh Sharma",
      authorRole: "SE IT Student",
      timeAgo: "Just now",
      content: commentText
    };

    postsStore = postsStore.map(p => {
      if (p.id === postId) {
        const updatedComments = [...p.comments, newComment];
        return {
          ...p,
          comments: updatedComments,
          commentsCount: updatedComments.length
        };
      }
      return p;
    });
    return Promise.resolve(newComment);
  }
};
