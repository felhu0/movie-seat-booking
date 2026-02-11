## Inledning – val av ramverk, bibliotek och struktur

I detta projekt har jag använt Next.js, Typescript och Tailwind CSS.
Jag valde Next.js eftersom ramverket stödjer server-side rendering, vilken kan ge bättre prestanda och en mer skalbar struktur jämför med enbart klientrenderad React.
Typescript används för att arbeta med typer, vilket gör koden mer strukturerad, minskar risken för fel och gör den lättare att felsöka.
Jag valde Tailwind CSS eftersom det gör det möjligt att skriva styling direkt i komponenternas className. Det ger kortare CSS kod och gör det enkelt att direkt se förändringar i användargränssnittet.
Projektet är även uppdelat i två delar, Movie-seat-app(fronten) byggd i Next.js och Movie-seat-api(backend) i en separat mapp med JSON Server.
För att testa applikationen startas först backend genom kommandot
json-server --watch db.json --port 3001 i mappen Movie-seat-api.
Därefter startas frontend med npm run dev i Movie-seat-app.

# Movie seat booking loggbok

## Dag 1 - Setup och UI anpassning

Skapade projekt med Next.js och använt TypeScript. Skrev om befintligt UI från tidigare HTML och CSS till Next.js anpassad struktur och syntax.

## Dag 2 - Setup backend och JSON Server

Skapade en separat mapp för backend och installerade JSON Server i mappen.
Skapade en db.json fil för att lägga till Movies data i och testa hämta data med Api anrop. Kör json-server --watch db.json --port 3001 i backend och frontend med npm run dev och kör i port 3000. För att Api anrop ska fungera ska backend och frontend köras i olika portar.

## Dag 3 – Komponentstruktur

Delade upp koden från page.tsx i mindre och mer läsbara komponenter såsom MovieSelector, SeatGrid, SeatRow och Seat. Implementerade props att skicka data och funktioner mellan komponenter.

## Dag 4 - Implemetera state hantering och toggle funktionalitet

Implementera state hantering med useState och skapade toggleSeat funktionen som hanterar UI:t på sätet, där man kan välja och avmarkera säten.

## Dag 5 – Skapa api route: Route Handlers

Skapade en API route med Route Handlers i app/api/movies/route.ts och la till .env.local för att lägga till MOVIES_API_URL=http://localhost:3001/movies.  
Strukturerade om dataflödet där frontend anropar API route och därefter hämtar API routen data från json server. Denna struktur gör att applikationen fungerar i produktion och vid deploy.
Flyttade ut fetchMovies() från page.tsx till lib/movies.ts i en separat fil.  
Flyttade frontendlogik med hooks till MovieSeatsContainer kompententen för att page.tsx ska köras serverside.
Strukturerade om page.tsx så att den skickar movies data som props till client och separerade server och client enligt App Router modellen.
Fixade logik för att räkna antal valda säten och totalpris.

## Dag 6 - Skapa booking api route

Skapade ett bokningsformulär där användaren kan ange namn och telefonnummer med validering av användarens inmatning. Implementerade en api route som hanterar bokningar och sparar data i db.json.

## Dag 7-8 – Hämtning av bokningsdata och uppdatering av UI för säten

Skapade api route med GET metod som hämtar data från Json Server. I denna route används searchParams med query parameter (movieId) som läggs till efter /api/bookings. PÅ så sätt kan applikationen hämta bokningar för en specifik film baserat på dess id. Därefter används id:t för sätena för att ändra UI:t genom att sätta isOccupied till true.

## Dag 9 – CRUD

Har skapat funktioner för att skapa, hämta, updatera och ta bort filmer som sparas i db.json. Jag valde att anropa Json server direkt från frontend i stället för att gå via route.ts (API route), eftersom kravet i uppgiften är att kommunicera med ett REST API (Json Server)
Jag har även byggt ett admin formulär som hanterar CRUD flödet, där man kan lägga till nya filmer samt ta bort och uppdatera befintliga.

## Dag 10 – Installera Tailwind

Har implementerat det mesta funktionaliteten, började därefter styla bokningsformuläret och adminformuläret Med Tailwind kan jag lägga till styling direkt i komponenterna, vilket gör det enklare att se hur UI:t förändras under utvecklingens gång. Ändrade nästan all CSS kod till Tailwind för att vara konsekvent i projektet.

## Dag 11 Fortsatt arbeta med UI och statiska data

Fortsatt arbeta med UI och färdigställde formulärets design. Testade funktionaliteten och skapade statiska data som kan användas vid deployment. Rensade bort oanvänd kod. Ställde in Next.js för Github Pages och lagt till .github/workflows/pages.yml i rootmappen. Fick några gånger build failed och felsökte Github Actions. Till slut hittade felet i min kod fick ändra Typescrpit typen i en fil och lyckades genomföra deploymenten.
