---
slug: /
sidebar_position: 1
title: Getting Started
---

# Introduction

[Refrens Invoices](https://www.refrens.com/free-online-invoicing-software) makes it easy for businesses to create, view, print, email, and manage invoices using a simple dashboard and an intuitive API made for developers.

To access Refrens API, you need to have API enabled on your business account. If you have a Refrens Premium account, please contact support (care@refrens.com or on [chat](https://www.refrens.com)) to enable API for you.

The following points/rules are applicable across all API endpoints -

- API follows REST conventions, ie creating a resource is `POST`, fetching is `GET`, updates are `PATCH`
- All API responses and request bodies are in JSON format.
- Any request with the body should include `ContentType: application/json`
- API response status is indicated as HTTP response code. ie, `200` is a success, `201` is created, `4xx` are errors.
- Most of the endpoints require an Authorization header with a JWT token in the following format -
- Authorization: Bearer `<jwt>`
  - You can either obtain a token via [Authentication API](authentication) call or [Self Sign](authentication#self-signed-tokens) using privateKey provided by us.
