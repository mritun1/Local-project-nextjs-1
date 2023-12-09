# Local project in Next.js
The project is being developed.

### To create peoples category
```
POST: http://127.0.0.1:3000/api/people/categories
```
```
{
    "categoryName":"",
    "tags":""
}
```
### To create product category
```
POST: http://127.0.0.1:3000/api/products/
```
```
{
    "catName":"Cars & Vehicles",
    "catSlug":"cars-vehicles"
}
```

### ADD NEW PEOPLE CATEGORY
After adding new category to peopleCats.json file, refresh the url.
```
http://127.0.0.1:3000/api/initialize/change-profession
```