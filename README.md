**Vera Kippel veki2400**

Ett API byggt med hapi. 
API:et hanterar en tabell med varor.

Tabellens namn heter "items" som skapats med hjälp av MongoDB och mongoose.  
Tabellens innehåll:
- _id
- name(string)
- description(string)
- price(number)
- stock(number)
- articleNumber(number)
- image(string)
- __v: 0 (som skapas automatiskt av mongodb)


Användning:

|Metod | Ändpunkt | Beskrivning |
-------|----------|-------------|
|GET | "/" | Visar ett välkomstmeddelande|
|GET | "/items" | Hämta alla lagrade varor|
|GET | "/items/{id}" | Hämtar en specifik vara med angivet id|
|POST | "/items" | Lägger till en vara|
|PUT | "/items/{id}" | Uppdaterar en vara med angivet id|
|DELETE | "/items/{id}" | Radera en vara med angivet id|

Varans JSON-struktur kan se ut såhär:
```json
{
  "name": "Mugg",
  "description": "Mugg med öra",
  "price": 119,
  "stock": 8,
  "articleNumber": 234,
  "image": "image.jpg"
}
```
