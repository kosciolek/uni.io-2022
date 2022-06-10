---
sidebar_position: 1
---

# Wstęp

Humanitarius powstał w ramach przedmiotu Inżyniera Oprogramowania, celem projektu jest pomoc ochodźcom.

Autorzy projektu: - **Juliusz Kościołek, Jarek Nowicki, Filip Worwa, Arnold Kokot**

## O projekcie

Aplikacja przeznaczona jest dla dwóch grup użytkowników: potrzebujących pomocy (pracy, lokum, żywności etc.) oraz ofiarującym pomoc, w odniesieniu do formy, czasu oraz lokalizacji.

Aplikacja daje możliwość generowania okresowych zestawień dotyczących udzielanej pomocy oraz potrzebnego wsparcia.

Wpisywanie danych może być realizowane ręcznie lub poprzez import plików csv/xls.

Aplikacja daje możliwość generowania plików tekstowych ułatwiających wpisanie przez oferujących zaplanowanej pomocy w kalendarzu Google.

## Wykorzystane technologie

- **[GitHub](https://github.com/)** repozytorium, koordynowanie pracy autorów
- **[Figma](https://www.figma.com/)** aplikacja do projektowania UI/UX
- **[Material Design](https://material.io/design)** Google design system
- **[Docosaurus](https://docusaurus.io/)** narzędzie do generowania dokumentacji projektów
- **Frontend**
  - **[React](https://reactjs.org/)** biblioteka/framework wspomagająca tworzenie webowych aplikacji
  - **[Next.js](https://nextjs.org/)** framework zbudowany nad Reactjs. Pozwala przede wszystkim na renderowanie po stronie serwera, co prowadzi do lepszej widoczności w wyszukiwarkach, co jest pożądane przy stronie naszego typu.
  - **[Material UI](https://mui.com/)** biblioteka komponentowa, przyspiesza tworzenie aplikacji, dostarcza bazowe komponenty o wysokiej jakości (date picker itd)
- **Backend**
  - **[NestJS](https://nestjs.com/)** biblioteka umożliwiająca łatwe budowanie aplikacji serwerów backendowych.
  - **[Auth0](https://auth0.com/)** platforma służąca do zarządzania tożsamością użytowników oraz dostępem do aplikacji. Zdejmuje z backendu odpowiedzialność przechowywania danych personalnych. 
  - **[Typescript](https://www.typescriptlang.org/)** język zbudowany nad JavaScript. Zapewnia większa skalowalność oraz mniejszą ilość błędów dzięki obecności statycznego typowania.
  - **[Prisma](https://www.prisma.io/)** biblioteka służąca do obsługi różnych baz danych w aplikacji. Jest to narzędzie typu ORM.
  - **[SQLite](https://www.sqlite.org/index.html)** szybki wbudowany silnik bazy danych SQL. Pozwala na łatwą integrację z aplikacją ze względu na brak konieczności działania dedykowanego serwera.
