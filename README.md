# DevFlow

DevFlow is a web-based project management platform designed to centralize the management of projects, teams, tasks, clients, documents, and activity tracking within software development teams.

The project is currently under active development and is being built with a modular backend architecture focused on separation of concerns, maintainability, and scalability.

## Overview

Software teams often distribute project information across spreadsheets, emails, messaging platforms, and other disconnected tools. This fragmentation makes it difficult to track responsibilities, project progress, documentation, and team activity.

DevFlow aims to provide a centralized platform where different participants in a software project can manage and access the information relevant to their role.

The system is designed around users such as:

- Administrators
- Managers
- Project Managers
- Developers
- QA Engineers
- Designers
- Clients

## Core Features

The planned functionality includes:

- User and role management
- Role-based permissions
- Project management
- Client management
- Team management
- Task assignment and tracking
- Project and task comments
- Document and file management
- Project progress tracking
- Activity history and auditing
- Restricted client access to project information

> DevFlow is currently under development. Some of these features are part of the planned architecture and are not yet available through the application.

## Tech Stack

### Backend

- Node.js
- TypeScript
- Fastify
- PostgreSQL
- `pg` / node-postgres
- Neon
- Neon Auth

### Frontend

The frontend architecture and implementation are still under development.

### Development Tools

- Git
- GitHub
- VS Code
- DBeaver

## Backend Architecture

The backend follows a modular architecture organized around business domains.

Each module separates its responsibilities into different layers:

```text
module/
├── domain/
├── application/
├── infrastructure/
└── presentation/
```

### Domain

Contains the core business model.

This layer includes:

- Entities
- Business rules
- Repository contracts

The domain does not depend on HTTP, Fastify, PostgreSQL, or other infrastructure concerns.

### Application

Contains the application's use cases.

Its responsibility is to coordinate domain entities and repository contracts to execute business operations.

Examples include:

```text
CreateProjectUseCase
UpdateProjectUseCase
```

### Infrastructure

Contains implementations that communicate with external systems.

For example:

```text
ProjectRepository
        ↑
        │ implements
        │
PostgresProjectRepository
```

The PostgreSQL repository is responsible for translating between database rows and domain entities.

```text
PostgreSQL
    ↓
ProjectRow
    ↓
toDomain()
    ↓
Project
```

### Presentation

This layer will expose the application's functionality through the HTTP API.

It will contain components such as controllers and routes while delegating business operations to the Application layer.

## Project Structure

```text
DevFlow/
├── Backend/
│   ├── src/
│   │   ├── app/
│   │   ├── config/
│   │   ├── modules/
│   │   │   ├── client/
│   │   │   └── projects/
│   │   │       ├── application/
│   │   │       ├── domain/
│   │   │       ├── infrastructure/
│   │   │       └── presentation/
│   │   └── shared/
│   │       └── database/
│   │
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
│
├── Database/
│   ├── schema.sql
│   └── db_permissions.sql
│
├── docs/
│   ├── design_docs/
│   └── main_docs/
│
├── Frontend/
│
├── .gitignore
└── README.md
```

## Database Design

DevFlow uses PostgreSQL as its relational database.

The current model includes the following main entities:

- Users
- Roles
- Permissions
- Projects
- Clients
- Teams
- Tasks
- Comments
- Documents
- Activity History

Associative tables are used for many-to-many relationships such as users and teams, teams and projects, users and projects, and roles and permissions.

The database schema is maintained in:

```text
Database/schema.sql
```

Permission-related database definitions are maintained separately in:

```text
Database/db_permissions.sql
```

## Authentication

Authentication is delegated to Neon Auth.

DevFlow maintains its own application-level user representation while linking it to the corresponding authentication user.

This keeps authentication concerns separate from the application's domain data.

## Environment Variables

Create a `.env` file inside the `Backend` directory based on `.env.example`.

```env
NEON_CONNECTION=
```

Never commit the real `.env` file or database credentials to the repository.

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- PostgreSQL-compatible database access
- Git

### Clone the repository

```bash
git clone <repository-url>
cd DevFlow
```

### Install backend dependencies

```bash
cd Backend
npm install
```

### Configure environment variables

Create:

```text
Backend/.env
```

and configure the required variables using:

```text
Backend/.env.example
```

as reference.

### Database

The database schema can be found in:

```text
Database/schema.sql
```

DevFlow currently uses Neon as its PostgreSQL provider.

## Current Development Status

The project is under active development.

Current backend work is focused on establishing the first version of the modular architecture and implementing the `projects` module.

The current internal flow follows:

```text
Input
  ↓
Use Case
  ↓
Domain Entity
  ↓
Repository Contract
  ↓
PostgreSQL Repository
  ↓
PostgreSQL
```

Database connectivity with Neon has been established using a shared PostgreSQL connection pool.

## Documentation

Technical and design documentation is maintained inside:

```text
docs/
```

This includes documentation related to:

- Use cases
- Backend architecture
- Database design
- API JSON structure
- Coding conventions

## Development Principles

DevFlow is being developed with emphasis on:

- Separation of concerns
- Explicit business rules
- Modular design
- Dependency inversion
- Maintainable code
- Database integrity
- Clear boundaries between domain and infrastructure
- Incremental development

## Roadmap

The current development roadmap includes:

- Complete the first version of the Projects module
- Implement remaining project use cases
- Add Fastify presentation layer
- Implement authentication integration
- Implement Tasks module
- Implement Teams module
- Implement Users and Roles modules
- Implement Comments and Documents
- Implement Activity History
- Develop the frontend application
- Add automated tests
- Complete API integration

## Contributing

DevFlow is currently being developed as a collaborative project.

Contributors should follow the coding and architecture conventions documented in the `docs` directory and keep changes focused on clearly defined responsibilities.

## License

A license has not yet been defined for this project.
