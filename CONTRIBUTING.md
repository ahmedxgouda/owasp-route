# Contributing to OWASP Route

We welcome contributions from the community to help improve OWASP Route! Whether it's fixing bugs, adding new features, or improving documentation, your contributions are valuable to us.

## How to Contribute

1. **Fork the Repository**: Start by forking the OWASP Route repository to your own GitHub account.
2. **Choose an Issue**: Look for open issues in the [issue tracker](https://github.com/ahmedxgouda/owasp-route/issues) that you would like to work on and ask for assignment.
3. **Create a Branch**: Create a new branch for your feature or bug fix. Use a descriptive name for your branch.

## Installation

### Local Setup (without Docker)

1. Clone the repository:
2. Navigate to the project directory:
3. Install dependencies with `pnpm install`.
4. Create a `.env` file in the root directory and add your environment variables (copy from `.env.example`).
5. Run the development server with `pnpm dev`.

### Using Docker

1. Clone the repository and navigate to the project directory.
2. Add your environment variables to a `.env` file (copy from `.env.example`).
3. run `make run` to build and start the application in a Docker container.
