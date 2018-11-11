<template>
  <div class="posts">
    <h1>Posts</h1>
    <div v-if="posts.length > 0" class="table-wrap">
      <table>
        <tr>
          <td>Title</td>
          <td width="550" align="center">Description</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="post in posts" :key="post._id" >
          <td>{{ post.title }}</td>
          <td>{{ post.description }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'EditPost', params: { id: post._id } }">Edit</router-link>
            <a href="#" @click="deletePosts(post._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no posts.. Lets add one now <br /><br />
    </div>
    <router-link v-bind:to="{ name:'NewPost' }" class="add_post_link">Add Post</router-link>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'posts',
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.posts = response.data.posts
    },
    async deletePosts (id) {
      await PostsService.deletePost(id)
      //this.$router.push({name: 'Posts'})
      location.reload()
    }
  }
}
</script>

<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table {
  margin: 10px auto 50px ;
}
table th, table tr {
  text-align: left;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background:#f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color:#fff;
}
a {
  color: #4d7ef7;
  text-description: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;

}
</style>
