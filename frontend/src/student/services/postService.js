import api from '../../services/api';

export const postCategories = ['General', 'Academics', 'Placements', 'Campus Life', 'Events', 'Technology', 'First Year'];

function timeAgo(value) {
  if (!value) return 'Recently';
  const parsed = new Date(value.replace(' ', 'T'));
  if (Number.isNaN(parsed.getTime())) return value;
  const minutes = Math.max(0, Math.floor((Date.now() - parsed.getTime()) / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
  return `${Math.floor(minutes / 1440)}d ago`;
}

function mapComment(comment) {
  return { ...comment, timeAgo: timeAgo(comment.createdAt), authorRole: 'Campus member' };
}

function mapPost(post, comments = []) {
  return {
    ...post,
    timeAgo: timeAgo(post.createdAt),
    authorRole: 'Campus member',
    authorAvatar: null,
    votes: post.voteCount || 0,
    userVoted: 0,
    comments: comments.map(mapComment),
    commentsCount: comments.length
  };
}

export const postService = {
  async getCategories() { return postCategories; },

  async getPosts(categoryFilter = 'All') {
    const [response, commentResponse] = await Promise.all([
      api.get('/posts'),
      api.get('/comments')
    ]);
    const records = categoryFilter === 'All'
      ? response.data
      : response.data.filter((post) => post.category === categoryFilter);
    const commentsByPost = commentResponse.data.reduce((grouped, comment) => {
      const postComments = grouped.get(comment.postId) || [];
      postComments.push(comment);
      grouped.set(comment.postId, postComments);
      return grouped;
    }, new Map());
    return records.map((post) => mapPost(post, commentsByPost.get(post.id) || []));
  },

  async getPostById(id) {
    const [post, comments] = await Promise.all([
      api.get(`/posts/${id}`),
      api.get('/comments', { params: { postId: id } })
    ]);
    return mapPost(post.data, comments.data);
  },

  async createPost(postData) {
    const response = await api.post('/posts', postData);
    return mapPost(response.data);
  },

  async updatePost(id, data) {
    const response = await api.put(`/posts/${id}`, data);
    return mapPost(response.data);
  },

  async deletePost(id) { await api.delete(`/posts/${id}`); },

  async votePost(id, direction) {
    const response = await api.post(`/posts/${id}/vote`, null, { params: { delta: direction } });
    return mapPost(response.data);
  },

  async addComment(postId, content) {
    const response = await api.post('/comments', { postId, content });
    return mapComment(response.data);
  }
};
