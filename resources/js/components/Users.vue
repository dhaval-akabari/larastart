<template>
    <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Users</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Management</a></li>
                        <li class="breadcrumb-item active">Users</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container -->
    </section>
    <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">List of Users</h3>

                <div class="card-tools">
                  <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addNew">Add New <i class="fas fa-user-plus ml-1"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Registered At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody v-if="users.length">
                    <tr v-for="(user, i) in users" :key="i">
                      <td>{{ user.id }}</td>
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.type | capitalize }}</td>
                      <td>{{ user.created_at }}</td>
                      <td colspan="2">
                          <a href="#" class="mr-2">
                              <i class="fas fa-edit"></i>
                          </a>
                          <a href="#">
                              <i class="fas fa-trash text-danger"></i>
                          </a>
                      </td>
                    </tr>
                    
                  </tbody>
                  <tfoot v-else>
                      <tr class="text-center">
                          <td colspan="5">No users found!</td>
                      </tr>
                  </tfoot>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
    </div>

    <!-- Add Modal -->
    <div class="modal fade" id="addNew" data-bs-backdrop="static" tabindex="-1" aria-labelledby="addNewLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addNewLabel">Add User</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form @submit.prevent="createUser" novalidate="novalidate">
                <div class="modal-body">
                    <div class="form-group">
                        <input v-model="form.name" class="form-control" :class="{ 'is-invalid': form.errors.has('name') }" type="text" name="name" id="name" placeholder="Name">
                        <span id="name" class="error invalid-feedback" v-if="form.errors.has('name')" v-html="form.errors.get('name')" />
                    </div>
                    <div class="form-group">
                        <input v-model="form.email" class="form-control" :class="{ 'is-invalid': form.errors.has('email') }" type="email" name="email" id="email" placeholder="Email Address">
                        <span id="email" class="error invalid-feedback" v-if="form.errors.has('email')" v-html="form.errors.get('email')" />
                    </div>
                    <div class="form-group">
                        <textarea v-model="form.bio" class="form-control" name="bio" id="bio" rows="3" placeholder="Short bio for user..(optional)"></textarea>
                    </div>
                    <div class="form-group">
                        <select class="form-control custom-select" :class="{ 'is-invalid': form.errors.has('type') }" v-model="form.type" name="type" id="type">
                            <option value="" disabled>Select User Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="author">Author</option>
                        </select>
                        <span id="type" class="error invalid-feedback" v-if="form.errors.has('type')" v-html="form.errors.get('type')" />
                    </div>
                    <div class="form-group">
                        <input v-model="form.password" class="form-control" :class="{ 'is-invalid': form.errors.has('password') }" type="password" name="password" id="password" placeholder="Password">
                        <span id="password" class="error invalid-feedback" v-if="form.errors.has('password')" v-html="form.errors.get('password')" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Create</button>
                </div>
            </form>
            </div>
        </div>
    </div>
</div>
    
</template>

<script>
import Form from 'vform';
import axios from 'axios';
export default {
    data() {
        return {
            form: new Form({
                name: '',
                email: '',
                password: '',
                type: '',
                bio: '',
                photo: ''
            }),
            users: {},
        }
    },
    methods: {
        async loadUsers() {
            await axios.get('/api/user').
            then(res => {
                console.log(res.data);
                this.users = res.data.data;
            }).catch(err => {
                console.log(err);
            })
        },
        async createUser() {
            const res = await this.form.post('/api/user');
            console.log(res.data);
        }
    },
    created() {
        this.loadUsers();
    }
}
</script>
