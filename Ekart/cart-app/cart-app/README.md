# Cart App (Spring Boot + Angular)

## 1. Run backend
cd backend
mvn spring-boot:run          # runs on http://localhost:8080

## 2. Run frontend
ng new cart-ui --routing=false --style=css      # choose defaults
# Replace these files in cart-ui/src with the ones from frontend/src:
#   main.ts
#   app/app.config.ts
#   app/cart/*   (whole folder)
cd cart-ui
ng serve                     # open http://localhost:4200

## API
GET    /api/cart        get all
GET    /api/cart/{id}   get one
POST   /api/cart        add
PUT    /api/cart/{id}   update
DELETE /api/cart/{id}   delete
