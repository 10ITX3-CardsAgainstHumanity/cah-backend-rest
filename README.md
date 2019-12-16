# cah-backend-rest

rest backend as faas

## Authentication

Overgive at every request the apikey with the ```X-Apikey``` header.

## Routes

```https://europe-west1-itx3-cardsagainsthumanity.cloudfunctions.net/cardsController```

**GET**

Response 200
```
[
    {
        "text": "XXX",
        "id": "XXX",
        "type": "XXX"
    },
    {
        "text": "XXX",
        "id": "XXX",
        "type": "XXX"
    }
]
```
    
**POST**

Request
```
{
    "type": "XXX",
    "text": "XXX"
}
```
Response 201
```
{
    "text": "XXX"
}
```

**PUT**

Request
```
{
    "id": "XXX",
    "text": "XXX"
}
```
Response 200
```
{
    "text": "XXX"
}
```

**DELETE**

Request
```
{
    "id": "XXX"
}
```
Response 200
```
{
    "id": "XXX"
}
```