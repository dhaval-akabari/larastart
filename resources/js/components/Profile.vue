<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Profile</h1>
                    </div>
                </div>
            </div><!-- /.container -->
        </section>

       <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">

            <!-- Profile Image -->
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center">
                    <img v-if="avatar" class="profile-user-img img-fluid img-circle"
                       :src="getAvatar()"
                       alt="User profile picture">
                </div>

                <h3 class="profile-username text-center">{{ form.name }}</h3>

                </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
            <!-- /.card -->
          </div>
          <!-- /.col -->
          <div class="col-md-9">
            <div class="card">
              <div class="card-body">
                <form class="form-horizontal m-3">
                    <div class="form-group row">
                        <label for="name" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                            <input type="text" v-model="form.name" class="form-control" :class="{ 'is-invalid': form.errors.has('name') }" name="name" id="name" placeholder="Name">
                            <span id="name" class="error invalid-feedback" v-if="form.errors.has('name')" v-html="form.errors.get('name')" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="email" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="email" v-model="form.email" class="form-control" :class="{ 'is-invalid': form.errors.has('email') }" name="email" id="email" placeholder="Email">
                            <span id="email" class="error invalid-feedback" v-if="form.errors.has('email')" v-html="form.errors.get('email')" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="bio" class="col-sm-2 col-form-label">Bio</label>
                        <div class="col-sm-10">
                            <textarea v-model="form.bio" class="form-control" name="bio" id="bio" placeholder="Short bio for user..(optional)"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="photo" class="col-sm-2 col-form-label">Photo</label>
                        <div class="col-sm-10">
                            <input type="file" @change="uploadAvatar" class="form-control" name="photo" id="photo">
                            <small>(Allowed files .jpeg, .jpg, .png & file size must be less than 2MB)</small>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="password" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                            <input type="password" v-model="form.password" class="form-control" :class="{ 'is-invalid': form.errors.has('password') }" name="password" id="password" placeholder="Password">
                            <small>(Leave empty if not changing)</small>
                            <span id="password" class="error invalid-feedback" v-if="form.errors.has('password')" v-html="form.errors.get('password')" />
                        </div>
                    </div>
                    <div class="form-group row mb-0">
                        <div class="offset-sm-2 col-sm-10">
                            <button @click.prevent="updateInfo" type="submit" class="btn btn-primary">Update</button>
                        </div>
                    </div>
                </form>
              </div><!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
    </div>
</template>

<script>
import Form from 'vform';
import axios from 'axios'
    export default {
        data() {
            return {
                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: ''
                }),
                avatar: '',
            }
        },
        methods: {
            async getProfile() {
                this.$Progress.start();
                await axios.get('/api/profile')
                .then(res => {
                    this.form.fill(res.data);
                    this.avatar = res.data.photo;
                    this.$Progress.finish();
                }).catch(err => {
                    console.log(err);
                    this.$Progress.fail();
                })
            },
            async updateInfo() {
                this.$Progress.start();
                await this.form.put('/api/profile')
                .then(res => {
                    Fire.$emit('LoadUser');
                    Toast.fire({
                        icon: 'success',
                        title: 'User profile updated successfully!'
                    });
                    this.$Progress.finish();
                }).catch(err => {
                    console.log(err);
                    this.$Progress.fail();
                    Toast.fire({
                        icon: 'error',
                        title: 'Something went wrong!'
                    });
                })
            },
            uploadAvatar(e) {
                let file = e.target.files[0];
                let supportedFile = ['image/jpeg', 'image/jpg', 'image/png'];
                if(file['size'] < 2097152 && supportedFile.includes(file['type'])) {
                    let reader = new FileReader();
                    reader.onloadend = () => {
                        this.form.photo = reader.result;
                    }
                    reader.readAsDataURL(file);
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Image must be less than 2MB size.'
                    });
                }
                
            },
            getAvatar() {
                if(this.avatar === 'profile.png') {
                    return '/img/profile.png';
                } else {
                    return '/img/profile/' + this.avatar;
                }
            },
        },
        created() {
            this.getProfile();
            Fire.$on('LoadUser', () => this.getProfile());
        }
    }
</script>
