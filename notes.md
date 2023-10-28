## PROCESS
- controller, signal
- star rating code added (Font Awesome)
- added product card component
- added product grid with getProducts.ts
- added reusable MenuButton component
- added View Categories button
- added Categories modal with fetchData.ts
- added Pop directly not as a component in Hero.tsx.
- created MenuPop with props to display ProductGrid according to category.

---

## PENDING
- Design Home
- Routing
- Global States (Zustand)
- fetch per category --> update product list
- search result filter
- create user profiles / authentication
- single product page through ID endpoint - MODAL
- responsive ProductGrid

---

- create singleProduct page in pages . It should take in ID as a prop in a UseEffect hook --> only fetches and renders a single product through ID.
- add button to product for singleProduct page
- button should have a function to link to a new endpoint
- endpoint should have ID as a reference
- refactor fetchData --> each fetch has its own types ---> 1 function per type.
- fix Onblur for MenuPop

---

## AUTHENTICATION
0. Create login and registration folders in app folder, with respective pages.
   0.1 Supabase project + tables

1. Create Registration Form
   1.1 Make UI
   1.2 Business Logic: Fetch data from form
   1.3 Send data to API
   1.4 Verify user creation

1. Create Login Form
   2.1 Make UI
   2.2 Business Logic: Fetch data from form
   2.3 Send data to API
   2.4 Verify user existence (with token)

1. Global States
   3.1 Zustand implementation
   3.2 Store token in global state

## Todos 9/23
- Connect Profile to SB DB
- Add Product Edit + Delete Functions
- Fix Image Upload
- Register --> Login
- Form Validations

## Todos Next
- Fix ModalOne Info
- Create Edit Product Modal
- Edit Product Function
- Separate fetch FakeStoreApi from Supabase

## Todos
- Fix SearchBar
- Fix Auth
- Add products to grid
- Add confirm delete modal
- Local Storage Error
- Add final animations
- Deprecated version?
- Debrief
