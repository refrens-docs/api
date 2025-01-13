# Expenditures

### Create Invoice

[!badge POST] `/businesses/:urlKey/expenditures`

This endpoint allows you to record an expenditure.

+++ Request

**Path Params**

`urlKey` - will be provided by us

**Headers**

| Name             | Type   | `Value` Description |
| ---------------- | ------ | ------------------- |
| Content-Type \*  | string | `application-json`  |
| Authorization \* | string | `Bearer <jwt>`      |

**Body**

| Name                                    | Type          | `Value` Description                                                                                                                                                                                                    |
| --------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| expenseNumber                           | string        | Expense number - must be unique among your expenditures. If not passed in the API call, invoice number will auto-incremented from the last invoice. If the last number is `APP-2020-0004` next will be `APP-2020-0005` |
| invoiceNumber                           | string        | Invoice number - Invoice Number of your vendor. If not provided it will be left blank. When vendor accepts an Expense and record it as their invoice, they can change the invoice number                               |
| invoiceDate                             | string        | [`ISO 8601`](https://en.wikipedia.org/wiki/ISO_8601) Formatted Date String. If not provided, current timestamp will be used.                                                                                           |
| invoiceType                             | string (enum) | `INVOICE` -> Tax Invoice<br />`BOS` -> Invoice/Bill without tax                                                                                                                                                        |
| currency                                | string        | [`ISO 4217`](https://en.wikipedia.org/wiki/ISO_4217) Currency Code -> Default `INR`                                                                                                                                    |
| **billedBy** \*                         | object        | Vendor's billing details                                                                                                                                                                                               |
| billedBy.name \*                        | string        | Vendor's Name                                                                                                                                                                                                          |
| billedBy.street                         | string        | Vendor's String Address                                                                                                                                                                                                |
| billedBy.pincode                        | string        | Vendor's Zip/Postal code                                                                                                                                                                                               |
| billedBy.gstState                       | string        | (Required Only for India) Vendor's [gst state code](https://raw.githubusercontent.com/refrens/gst-states/master/index.json)                                                                                            |
| billedBy.state                          | string        | Vendor's State or province (Ignored for India)                                                                                                                                                                         |
| billedBy.country \*                     | string        | [`ISO 3166-1 alpha-2`](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) Country code                                                                                                                                  |
| billedBy.panNumber                      | string        | PAN (India Only)                                                                                                                                                                                                       |
| billedBy.gstin                          | string        | GSTIN Number (India Only)                                                                                                                                                                                              |
| billedBy.phone                          | string        | Vendor's Phone in international format, example - `+91 97394 32668`                                                                                                                                                    |
| billedBy.email                          | email         | Vendor's email                                                                                                                                                                                                         |
| **billedTo**                            | object        | Customer's billing details -> In same format as `billedBy`                                                                                                                                                             |
| items \*                                | array[object] | Invoice line items array                                                                                                                                                                                               |
| items[].name \*                         | string        | Line item name                                                                                                                                                                                                         |
| items[].rate \*                         | number        | unit price of line item                                                                                                                                                                                                |
| items[].quantity \*                     | number        | total quantity sold of line item                                                                                                                                                                                       |
| items[].gstRate<br />or items[].taxRate | number        | tax rate if applicable                                                                                                                                                                                                 |
| email                                   | object        | Add if email should be sent after invoice creation to specified recipients                                                                                                                                             |
| email.to \*                             | object        | Main recipient of email                                                                                                                                                                                                |
| email.to.name                           | string        | Name of main recipient                                                                                                                                                                                                 |
| email.to.email \*                       | email         | Email of main recipient                                                                                                                                                                                                |
| email.cc                                | array[object] | email CC list                                                                                                                                                                                                          |
| email.cc[].name                         | string        | Name of recipient                                                                                                                                                                                                      |
| email.cc[].email                        | email         | Email of recipient                                                                                                                                                                                                     |

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
