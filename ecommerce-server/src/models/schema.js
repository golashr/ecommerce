const checkoutSchema =  {
    "items": {
        "required": [
            "sku",
            "number"
        ],
        "properties": {
            "sku": {
                "$id": "#/items/properties/sku",
                "type": "string",
                "default" : "mbp",
                "enum": ["ipd", "mbp", "atv", "vga"]
            },
            "number": {
                "$id": "#/items/properties/number",
                "type": "integer"
            }
        },
        "$id": "#/items",
        "type": "object"
    },
    "$id": "http://example.org/checkout.json#",
    "type": "array",
    "definitions": {},
    "$schema": "http://json-schema.org/draft-07/schema#"
};

const updateSKUSchema =  {
    "items": {
        "required": [
            "sku",
            "price"
        ],
        "properties": {
            "sku": {
                "$id": "#/items/properties/sku",
                "type": "string",
                "default" : "mbp",
                "enum": ["ipd", "mbp", "atv", "vga"]
            },
            "price": {
                "$id": "#/items/properties/price",
                "type": "number"
            }
        },
        "$id": "#/items",
        "type": "object"
    },
    "$id": "http://example.org/updatesku.json#",
    "type": "array",
    "definitions": {},
    "$schema": "http://json-schema.org/draft-07/schema#"
};

exports.checkoutSchema = checkoutSchema;
exports.updateSKUSchema = updateSKUSchema;