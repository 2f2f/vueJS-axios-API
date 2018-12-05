var profileComponent = {
    data : function() {
        return {
            isError : false,
            loading : true,
            users : null,
            activeUser : '',
            postData : null,
            postError : false,
            postLoading : true,
            comData : null,
            comError : false,
            comLoading : true
            
            
        }
    },
    mounted() {
        axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => (this.users = response.data))
        .catch(error => {console.log(error);this.isError = true})
        .finally(() => {console.log('GET request from users');this.loading = false})
     },
     watch : {
        activeUser : function () {
        axios
        .get('https://jsonplaceholder.typicode.com/posts?userId=' + this.activeUser.id)
        .then(response => (this.postData =response.data))
        .catch(error=> {console.log(error);this.postError = true})
        .finally(() => {console.log('GET request from posts');this.postLoading = false})
         }
    },
    methods : {
        getComments : function (id){
            axios
            .get('https://jsonplaceholder.typicode.com/posts/' + id + '/comments')
            .then(response => (this.comData =response.data))
        }
    },
    template : `
    <div class="profile">
        <div v-if="isError">
            <h3>There was an error</h3>
        </div>
        <div v-else>

           <div class="profile-select bg-light mt-2">
                
                <h4>Fully reactive VueJS SPA</h4>
                <p>Data is got through the free api from jsonplaceholder.typicode (BIG thanks!)<br>
                Select a username to begin<br>
                Each post in the below section has a comment button</p>
                <select v-model="activeUser" class="custom-select my-3 w-25">
                     <option v-for="user in users" v-bind:value="user">{{ user.name }}</option>
                </select>
           </div>

           <div class="profile-main">

                <div class="row my-4">
                    <div class="col-sm-12">
                        <h3 class="text-center">{{ activeUser.name ? activeUser.name : 'No User Selected' }}</h3>
                    </div>
                </div>

                <div class="row">

                    <div class="col">
                        <div class="bg-light rounded">
                            <h5 class="text-center py-2"> Details</h5>
                            <span> {{ activeUser != '' ? 'Username is: ' + activeUser.username + ' ,email is ' + activeUser.email : ''}}</span>                  
                        </div>
                    </div>
                    
                    <div class="col">
                        <div class="bg-light rounded">
                            <h5 class="text-center py-2"> Address  </h5>
                            <p> {{ (activeUser && activeUser.address)? activeUser.address.street + ',' + activeUser.address.city + ',' +  activeUser.address.zipcode: ''}} </p>
                        </div>
                    </div>

                    <div class="col">
                        <div class="bg-light rounded">
                            <h5 class="text-center py-2"> Company</h5>
                            <p> {{ (activeUser && activeUser.company)? activeUser.company.name : ''}} </p>
                        </div>                           
                    </div>

                </div>
            </div>
            <div class="posts">

                <div class="my-4">
                    <h3 class="text-center">Users Posts</h>
                </div>

                <div v-if="postError">
                    Error
                </div>

                <div v-else-if="postLoading">
                    Loading
                </div>

                <div v-else>
                    <div v-for="post in postData" class="bg-light rounded mb-4">
                        <div class="row">
                            <div class="col-sm-12">
                                <h6><strong>{{ post.title }}<strong></h6>
                            </div>                    
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <p>{{ post.body }}</p>
                                <button 
                                    v-bind:id='post.id' 
                                    v-on:click='getComments(post.id)' 
                                    data-toggle="modal" 
                                    data-target="#comments"
                                    type="button" 
                                    class="btn btn-light text-primary">View comments</button>
                            </div>
                        </div>                     
                    </div>
                </div>
            </div>          
        </div>
        <div class="modal" id="comments">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Comments</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                
                    <!-- Modal body -->
                    <div class="modal-body">
                        <div v-for="com in comData" class="bg-light rounded mb-2">
                            <div class="row">
                                <div class="col-sm-12">
                                    <h6><strong>{{ com.email }}<strong></h6>
                                </div>                    
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <p>{{ com.body }}</p>                              
                                </div>
                            </div>                     
                        </div>
                    </div>
                
                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>           
                </div>
            </div>
        </div>
    </div>
    `


}



 

new Vue({
    el: '#app',
    components: {
      'profile': profileComponent,
    }
  })