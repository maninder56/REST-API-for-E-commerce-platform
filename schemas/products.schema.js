module.exports = {
    "$schema" : "http://json-schema.org/draft-04/schema#",
    "id" : "/product",
    "title": "Product",
    "description": "An product in inventory",
    "type": "object",
    "properties": {
        "product_name": {
            "description": "Name of the product",
            "type": "string"
        },

        "product_description": {
            "description": "information about the product",
            "type": "string"
        },

        "price": {
            "description": "price of the product",
            "type": "integer"
        },

        "category_id": {
            "description": "Category of the product",
            "type": "integer"
        },
    },
    "required": ["product_name", "price", "category_id"]
}