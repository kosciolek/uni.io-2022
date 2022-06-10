---
sidebar_position: 5
---

# Backend

### Architektura backendu jest podzielona na cztery główne moduły:
- **authz** - autoryzacja aplikacji, obsługa platrofmy Auth0
- **posts** - funkcjonalości zarządzania danymi ogłoszeń
- **comments** - funkcjonalości zarządzania danymi komentarzy
- **reports** - funkcjonalności zarządzania danymi zgłoszeń
- **utils** - zbiór klas pełniących rolę pomocniczą

### Arhitektura modułów zarządzających danymi:
W przypadku modułów komunikujących się z bazą danych, przyjęto architekturę warstwową. Jej poszczególne komponenty to:
- **dto** - reprezentują przekazywane dane
- **service** - enkapsulują logikę obsługi bazy danych i zapytań
- **controller** - konfigurują backendowy serwer i definiują dostępne endpointy

### Komunikacja z bazą danych:
W aplikacji zapytania nie są bezporśrednio wykonywane za pomocą języka SQL. Biblioteka **Prisma** oferuję API które abstrahuje konkretny dialekt silnika baz danych i znacząco ułatwia jego obsługę.

