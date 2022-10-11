class Api {
    productsArray = []
    
    getAll() {
        return this.productsArray;
    }

     addProduct(product) {
        const id = this.productsArray.length === 0 ? 1 : this.productsArray[this.productsArray.length - 1].id + 1
        product.id = id;
        product.timestamp = Date.now();
        this.productsArray.push(product);
        return product;
    }

    async getById(id) {
        const productId = await this.productsArray.find(elem => elem.id == id)
        return productId
    }

    async updateProduct(newProduct, id ) {
       const productFounded = await this.getById(id)
       productFounded.timestamp = newProduct.timestamp;
       productFounded.title = newProduct.title;
       productFounded.description = newProduct.description;
       productFounded.code = newProduct.code;
       productFounded.thumbnail = newProduct.thumbnail;
       productFounded.price = newProduct.price;
       productFounded.stock = newProduct.stock;

    }

    async deleteProduct(id) {
        const productDeleted = await this.getById(id)
        this.productsArray = this.productsArray.filter(elem => elem.id != productDeleted.id)
        return productDeleted;
    }

}

module.exports = Api;