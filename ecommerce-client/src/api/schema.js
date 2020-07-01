const getSKUsSchema =  {
    "required": [
        "success",
        "timestamp",
        "message",
        "data"
    ],
    "properties": {
        "success": {
            "$id": "#/properties/success",
            "type": "boolean"
        },
        "timestamp": {
            "$id": "#/properties/timestamp",
            "type": "integer"
        },
        "message": {
            "$id": "#/properties/message",
            "type": "string"
        },
        "data": {
            "items": {
                "required": [
                    "sku",
                    "name",
                    "price",
                    "img"
                ],
                "properties": {
                    "sku": {
                        "$id": "#/properties/data/items/properties/sku",
                        "type": "string"
                    },
                    "name": {
                        "$id": "#/properties/data/items/properties/name",
                        "type": "string"
                    },
                    "price": {
                        "$id": "#/properties/data/items/properties/price",
                        "type": "string"
                    },
                    "img": {
                        "$id": "#/properties/data/items/properties/img",
                        "type": "string"
                    }
                },
                "$id": "#/properties/data/items",
                "type": "object"
            },
            "$id": "#/properties/data",
            "type": "array"
        }
    },
    "$id": "http://example.org/getsku.json#",
    "type": "object",
    "definitions": {},
    "$schema": "http://json-schema.org/draft-07/schema#"
};

const checkoutSchema =  {
    "required": [
        "success",
        "timestamp",
        "message",
        "data"
    ],
    "properties": {
        "success": {
            "$id": "#/properties/success",
            "type": "boolean"
        },
        "timestamp": {
            "$id": "#/properties/timestamp",
            "type": "integer"
        },
        "message": {
            "$id": "#/properties/message",
            "type": "string"
        },
        "data": {
            "$id": "#/properties/data",
            "type": "number"
        }
    },
    "$id": "http://example.org/checkout.json#",
    "type": "object",
    "definitions": {},
    "$schema": "http://json-schema.org/draft-07/schema#"
};

exports.getSKUsSchema = getSKUsSchema;
exports.checkoutSchema = checkoutSchema;