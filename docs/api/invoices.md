# Invoices

### Create Invoice

[!badge POST] `/businesses/:urlKey/invoices`

This endpoint allows you to create an invoice

+++ Request

**Path Params**

`urlKey` - will be provided by us

**Headers**

| Name             | Type   | `Value` Description |
| ---------------- | ------ | ------------------- |
| Content-Type \*  | string | `application-json`  |
| Authorization \* | string | `Bearer <jwt>`      |

**Body**

| Name                                    | Type          | `Value` Description                                                                                                                                                                                                |
| --------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| invoiceTitle                            | string        | Invoice Title                                                                                                                                                                                                      |
| invoiceSubTitle                         | string        | Invoice Subtitle                                                                                                                                                                                                   |
| **contact**                             | object        | Contact Details                                                                                                                                                                                                    |
| contact.phone                           | string        | phone of contact                                                                                                                                                                                                   |
| contact.email                           | string        | email of contact                                                                                                                                                                                                   |
| invoiceNumber                           | string        | Invoice number - must be unique among your invoices. If not passed in the API call, invoice number will auto-incremented from the last invoice. If the last number is `APP-2020-0004` next will be `APP-2020-0005` |
| invoiceDate                             | string        | [`ISO 8601`](https://en.wikipedia.org/wiki/ISO_8601) Formatted Date String. If not provided, current timestamp will be used.                                                                                       |
| dueDate                                 | string        | `ISO 8601` Formatted Date String                                                                                                                                                                                   |
| invoiceType                             | string (enum) | `INVOICE` -> Tax Invoice<br />`BOS` -> Invoice/Bill without tax                                                                                                                                                    |
| currency                                | string        | [`ISO 4217`](https://en.wikipedia.org/wiki/ISO_4217) Currency Code -> Default `INR`                                                                                                                                |
| **billedTo** \*                         | object        | Customer's billing details                                                                                                                                                                                         |
| billedTo.name \*                        | string        | Customer's Name                                                                                                                                                                                                    |
| billedTo.street                         | string        | Customer's String Address                                                                                                                                                                                          |
| billedTo.pincode                        | string        | Customer's Zip/Postal code                                                                                                                                                                                         |
| billedTo.gstState                       | string        | (Required Only for India) Vendor's [gst state code](https://raw.githubusercontent.com/refrens/gst-states/master/index.json)                                                                                        |
| billedTo.state                          | string        | Customer's State or province (Ignored for India)                                                                                                                                                                   |
| billedTo.country \*                     | string        | [`ISO 3166-1 alpha-2`](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) Country code                                                                                                                              |
| billedTo.panNumber                      | string        | PAN (India Only)                                                                                                                                                                                                   |
| billedTo.gstin                          | string        | GSTIN Number (India Only)                                                                                                                                                                                          |
| billedTo.phone                          | string        | Customer's Phone in international format, example - `+91 97394 32668`                                                                                                                                              |
| billedTo.email                          | email         | Customer's email                                                                                                                                                                                                   |
| **billedBy**                            | object        | Vendor's billing details -> In same format as `billedTo`                                                                                                                                                           |
| items \*                                | array[object] | Invoice line items array                                                                                                                                                                                           |
| items[].name \*                         | string        | Line item name                                                                                                                                                                                                     |
| items[].rate \*                         | number        | unit price of line item                                                                                                                                                                                            |
| items[].quantity \*                     | number        | total quantity sold of line item                                                                                                                                                                                   |
| items[].gstRate<br />or items[].taxRate | number        | tax rate if applicable                                                                                                                                                                                             |
| **email**                               | object        | Add if email should be sent after invoice creation to specified recipients                                                                                                                                         |
| email.to                                | object        | Main recipient of email                                                                                                                                                                                            |
| email.to.name                           | string        | Name of main recipient                                                                                                                                                                                             |
| email.to.email                          | email         | Email of main recipient                                                                                                                                                                                            |
| email.cc                                | array[object] | email CC list                                                                                                                                                                                                      |
| email.cc[].name                         | string        | Name of recipient                                                                                                                                                                                                  |
| email.cc[].email                        | email         | Email of recipient                                                                                                                                                                                                 |

+++ Response
!!!success `200: OK`
Successful auth

```json #
{
  "_id": "60cc8cc6aa3024abd4bef447",
  "invoiceNumber": "APP-2020-0004",
  "invoiceDate": "2021-06-18T12:08:38.000Z",
  "currency": "INR",
  "billType": "INVOICE",
  "status": "UNPAID",
  "billedBy": {
    "name": "Vendor Name",
    "street": "Vendor street line",
    "city": "Bangalore",
    "pincode": "560100",
    "gstState": "29",
    "country": "IN"
  },
  "billedTo": {
    "name": "Customer Name",
    "street": "Customer street line",
    "city": "Bangalore",
    "pincode": "560100",
    "gstState": "29",
    "country": "IN"
  },
  "invoiceTitle": "Invoice",
  "discount": {
    "discountType": "PERCENTAGE"
  },

  "items": [
    {
      "discount": {
        "discountType": "PERCENTAGE"
      },
      "images": [],
      "_id": "60cc8cc6aa3024abd4bef448",
      "rate": 100,
      "quantity": 2,
      "gstRate": 18,
      "name": "Item one name",
      "igst": 36,
      "cgst": 18,
      "sgst": 18,
      "subTotal": 200,
      "amount": 200,
      "total": 236
    },
    {
      "discount": {
        "discountType": "PERCENTAGE"
      },
      "images": [],
      "_id": "60cc8cc6aa3024abd4bef449",
      "rate": 200,
      "quantity": 6,
      "gstRate": 12,
      "name": "Item two name",
      "igst": 144,
      "cgst": 72,
      "sgst": 72,
      "subTotal": 1200,
      "amount": 1200,
      "total": 1344
    }
  ],
  "client": "60cc8cc6aa3024abdsdf23dsf",
  "igst": false,
  "createdAt": "2021-06-18T12:08:38.606Z",
  "updatedAt": "2021-06-18T12:08:38.606Z",
  "finalTotal": {
    "total": 1580,
    "amount": 1400,
    "subTotal": 1400,
    "igst": 180,
    "cgst": 90,
    "sgst": 90,
    "discount": 0
  },
  "share": {
    "link": "<view link>",
    "pdf": "<pdf link>"
  },
  "terms": [],
  "attachments": [],
  "isExpenditure": false,
  "taxType": "INDIA",
  "locale": "en-IN",
  "tags": []
}
```

!!!
!!!danger `401: Unauthorized`
Successful auth

```json #
{
  "name": "NotAuthenticated",
  "message": "Invalid login",
  "code": 401,
  "className": "not-authenticated",
  "data": {
    "message": "Invalid login"
  },
  "errors": {}
}
```

!!!

+++

### Find Invoices

[!badge GET] `/businesses/:urlKey/invoices`

This endpoint allows you to find created invoices

+++ Request

**Path Params**

`urlKey` - will be provided by us

**Headers**

| Name             | Type   | `Value` Description |
| ---------------- | ------ | ------------------- |
| Content-Type \*  | string | `application-json`  |
| Authorization \* | string | `Bearer <jwt>`      |

**Query Prams**

Optinal - Can be used for limiting results

| Name                 | Type   | `Value` Description                                       |
| -------------------- | ------ | --------------------------------------------------------- |
| $limit               | number | will return only the number of results you specify        |
| $skip                | number | will skip the specified number of results.                |
| $sort                | object | will sort based on the object you provide.                |
| $sort[createdAt]     | number | sort order on created date (1 ascending, -1 descending)   |
| $sort[invoiceNumber] | number | sort order on invoice number (1 ascending, -1 descending) |
| $sort[invoiceDate]   | number | sort order on invoice date (1 ascending, -1 descending)   |

+++ Response
!!!success `200: OK`
Successful auth

```json #
{
  total:20,
  limit: 10,
  skip: 0,
  data: [
    {...invoices}
  ]
}
```

!!!
!!!danger `401: Unauthorized`
Successful auth

```json #
{
  "name": "NotAuthenticated",
  "message": "Invalid login",
  "code": 401,
  "className": "not-authenticated",
  "data": {
    "message": "Invalid login"
  },
  "errors": {}
}
```

!!!

+++

### Get Invoice

[!badge GET] `/businesses/:urlKey/invoices/:invoiceId`

This endpoint allows you to get a invoice via invoiceId (\_id)

+++ Request

**Path Params**

`urlKey` - will be provided by us

`invoiceId` - unique id of an invoice. (\_id returned in create response or find response)

**Headers**

| Name             | Type   | `Value` Description |
| ---------------- | ------ | ------------------- |
| Content-Type \*  | string | `application-json`  |
| Authorization \* | string | `Bearer <jwt>`      |

+++ Response
!!!success `200: OK`
Successful auth

```json #
{
  "_id": "60cc8cc6aa3024abd4bef447",
  "invoiceNumber": "APP-2020-0004",
  "invoiceDate": "2021-06-18T12:08:38.000Z",
  "currency": "INR",
  "billType": "INVOICE",
  "status": "UNPAID",
  "billedBy": {
    "name": "Vendor Name",
    "street": "Vendor street line",
    "city": "Bangalore",
    "pincode": "560100",
    "gstState": "29",
    "country": "IN"
  },
  "billedTo": {
    "name": "Customer Name",
    "street": "Customer street line",
    "city": "Bangalore",
    "pincode": "560100",
    "gstState": "29",
    "country": "IN"
  },
  "invoiceTitle": "Invoice",
  "discount": {
    "discountType": "PERCENTAGE"
  },

  "items": [
    {
      "discount": {
        "discountType": "PERCENTAGE"
      },
      "images": [],
      "_id": "60cc8cc6aa3024abd4bef448",
      "rate": 100,
      "quantity": 2,
      "gstRate": 18,
      "name": "Item one name",
      "igst": 36,
      "cgst": 18,
      "sgst": 18,
      "subTotal": 200,
      "amount": 200,
      "total": 236
    },
    {
      "discount": {
        "discountType": "PERCENTAGE"
      },
      "images": [],
      "_id": "60cc8cc6aa3024abd4bef449",
      "rate": 200,
      "quantity": 6,
      "gstRate": 12,
      "name": "Item two name",
      "igst": 144,
      "cgst": 72,
      "sgst": 72,
      "subTotal": 1200,
      "amount": 1200,
      "total": 1344
    }
  ],
  "client": "60cc8cc6aa3024abdsdf23dsf",
  "igst": false,
  "createdAt": "2021-06-18T12:08:38.606Z",
  "updatedAt": "2021-06-18T12:08:38.606Z",
  "finalTotal": {
    "total": 1580,
    "amount": 1400,
    "subTotal": 1400,
    "igst": 180,
    "cgst": 90,
    "sgst": 90,
    "discount": 0
  },
  "share": {
    "link": "<view link>",
    "pdf": "<pdf link>"
  },
  "terms": [],
  "attachments": [],
  "isExpenditure": false,
  "taxType": "INDIA",
  "locale": "en-IN",
  "tags": []
}
```

!!!
!!!danger `401: Unauthorized`
Successful auth

```json #
{
  "name": "NotAuthenticated",
  "message": "Invalid login",
  "code": 401,
  "className": "not-authenticated",
  "data": {
    "message": "Invalid login"
  },
  "errors": {}
}
```

!!!

+++
