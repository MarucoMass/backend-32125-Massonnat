class Api {
    productsArray = []
    
    getAll() {
        return this.productsArray;
    }

    addProduct(product) {
        const id = this.productsArray.length === 0 ? 1 : this.productsArray[this.productsArray.length - 1].id + 1
        product.id = id;
        this.productsArray.push(product)
    }

    getById(id) {
        const productId = this.productsArray.find(elem => elem.id == id)
        return productId
    }

    updateProduct(id, newProduct) {
       const productFounded = this.getById(id)
       productFounded.title = newProduct.title;
       productFounded.price = newProduct.price;
       productFounded.thumbnail = newProduct.thumbnail;
    }

    deleteProduct(id) {
        this.productsArray = this.productsArray.filter(elem => elem.id != id)
    }

}

module.exports = Api;