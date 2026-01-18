**Vera Kippel veki2400**

Ett API byggt med hapi. 
API:et hanterar en tabell med varor samt admin konton vid inloggning/registrering.

Första tabellens namn heter "items" som skapats med hjälp av MongoDB och mongoose.  
Tabellens innehåll:
- _id (som skapas automatiskt av mongodb)
- name(string)
- description(string)
- price(number)
- stock(number)
- articleNumber(number)
- image(string)
- __v: 0 (som skapas automatiskt av mongodb)


Användning:
Alla routes förutom GET med ändelsen "/" kräver token

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

Andra tabellens namn heter "admins" som skapats med hjälp av MongoDB och mongoose.  
Tabellens innehåll:
- _id (skapas automatiskt av mongodb)
- username(string)
- firstname(string)
- password(string)
- key(string)
- __v: 0 (som skapas automatiskt av mongodb)


Användning:
GET, PUT och DELETE kräver token

|Metod | Ändpunkt | Beskrivning |
-------|----------|-------------|
|GET | "/admins" | Hämta alla förnamn i personalen|
|POST | "/admins/login" | Loggar in en personal med registrerat inlogg|
|POST | "/admins/register" | Skapar inloggning för personal|
|PUT | "/admins/{id}" | Uppdaterar inlogging med angivet id|
|DELETE | "/admins/{id}" | Radera en inloggning med angivet id|

Personalens JSON-struktur för registrering kan se ut såhär:
```json
{
  "firstname": "Vera",
  "username": "mittkonto",
  "password": "mittlösenord",
  "key": "företagskod"
}
```
