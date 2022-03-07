# Description

This app is used to place order of dough. App is enabling user to pick between different types of doughs and add additional ingredients. User can opt to buy only available dough without any extra ingredients.

User can also add as many doughs as he or she preferes and add costume ingredients for each dough. Price is automatically adjusted in case of increase or decrease of quantity.

User can also change his mind and remove any dough by decreasing quantity to 0. 

In upper right corner authorized user can view order history which includes total price (price with delivery price) and price of each doughs. Furthermore user can see price per each item and quantity of each ordered item.

When placing order user has to add an address, otherwise app won't allow placing of order. User can remove or add address and can have multiple available addressess. All entered addresses are made available to user.

User can also see which doughs are gluten-free (icon on the left side on ingredients selection panel is used to inform user if ingredients is gluten free or not)

There are two steps to place order:
1. User selects dough/doughs quantity and ingredients and adds to cart. 
2. When user click on Buy button he is redirected to order page where he can increase quantity, remove anu dough, send notes, select address and if payment is to be made upon delivery. Order is placed by clicking Order button.

Clicking on Cart Icon in upper left corner will redirect user to add to cart page (default page)

Only authorized users (logged) can place order

## Important notes
In order to use the app you shound change in server/config/config.js url for Atlas Mongo DB database and in client/.env file you should store following data:

DATABASE=paragon
PASSWORD=DC69CF9vN9vvhgpX

I will delete this after grading is done) 

Default port for connection to the express server is 5000 and default proxy set in package.json in client folder is
http://localhost:5000. In case you are using Mac change default port to 3001 as 5000 is not allowed on Mac. Also don't forget to change on proxy last part of the string (5000 to 3001)
## Redux toolkit

For state management Redux toolkit is used. For fetching API data redux thunk middleware is used.
## Server and database

For server express is used and all server logic is stored in server folder. 
## UI

For react-boostrap library is used. 