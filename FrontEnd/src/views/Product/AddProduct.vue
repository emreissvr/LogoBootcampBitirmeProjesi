<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4>Add New Product</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <form>
                    <div class="form-group">
                        <label>Category</label>
                        <select class="form-control" v-model="CategoryId" required>
                            <option v-for="category in categories" :key="category.id"
                                    :value="category.id">{{ category.category_name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Product Name</label>
                        <input type="text" v-model="ProductName" class="form-control" >
                    </div>
                    <div class="form-group">
                        <label>Brand Name</label>
                        <input type="text" v-model="BrandName" class="form-control" >
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" v-model="Description" class="form-control" >
                    </div>
                    
                    <div class="form-group">
                        <label>Image Url</label>
                        <input type="text"  v-model="ImageURL" class="form-control" >
                    </div>

                    <div class="form-group">
                        <label>Price</label>
                        <input type="number" v-model="Price" class="form-control" >
                    </div>
                    <button type="button" class="btn btn-primary" @click="addProduct">Add Product</button>
                </form>
            </div>
            <div class="col-3"></div>
        </div>

<!--        Form-->
    </div>
</template>
<script>
    import axios from 'axios'
    import swal from 'sweetalert'

    export default {
        props: ["baseURL", "categories"],
        data() {
            return {
                ProductName: null,
                CategoryId: null,
                BrandName: null,
                Description: null,
                ImageUrl: null,
                Price: null,
                Stock: null,

            }
        },
        methods: {
            addProduct() {
                const newProduct = {
                    product_name: this.ProductName,
                    category_id: this.CategoryId,
                    brand_name: this.BrandName,
                    description: this.Description,
                    image: this.ImageURL,
                    price: this.Price,
                    stock: this.Stock
                };

                axios.post(this.baseURL+"product/add", newProduct)
                .then(() => {
                    this.$router.push({name: 'AdminProduct'});
                    swal({
                        text: "Product added",
                        icon: "success"
                    })
                }).catch((err)=> {
                    console.log("err", err);
                })


            }
        }
    }
</script>
