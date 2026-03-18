# Contributing to uPKI CA Server

Thank you for your interest in contributing to uPKI CA Server. This document provides guidelines and best practices for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Environment](#development-environment)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. We are committed to providing a welcoming and safe experience for everyone.

- Be respectful and inclusive in your communications
- Accept constructive criticism positively
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. **Fork the repository** — Click the "Fork" button on GitHub to create your own copy
2. **Clone your fork** — `git clone https://github.com/YOUR_USERNAME/upki.git`
3. **Add upstream remote** — `git remote add upstream https://github.com/circle-rd/upki.git`
4. **Create a branch** — `git checkout -b feature/your-feature-name`

## Development Environment

### Prerequisites

- Python 3.11 or higher
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/circle-rd/upki.git
cd upki

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -e ".[dev]"

# Run tests to verify setup
pytest
```

### Pre-commit Hooks

We use pre-commit hooks to maintain code quality. Install them with:

```bash
pip install pre-commit
pre-commit install
```

## Coding Standards

### Python Style

- Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guide
- Use type hints where applicable
- Maximum line length: 100 characters
- Use 4 spaces for indentation (no tabs)

### Code Quality Tools

We use the following tools to maintain code quality:

- **Ruff** — Fast Python linter (configured in `pyproject.toml`)
- **pytest** — Testing framework
- **pytest-cov** — Coverage reporting

Run linting:

```bash
ruff check upkica/
```

Run formatting:

```bash
ruff format upkica/
```

### Naming Conventions

- **Functions/Methods**: `snake_case` (e.g., `generate_certificate`)
- **Classes**: `PascalCase` (e.g., `CertificateAuthority`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `DEFAULT_VALIDITY_DAYS`)
- **Private methods**: Prefix with underscore (e.g., `_internal_method`)

### Docstrings

Use Google-style docstrings:

```python
def generate_certificate(csr: str, profile: str) -> Certificate:
    """Generate a certificate from a CSR.

    Args:
        csr: The Certificate Signing Request in PEM format.
        profile: The certificate profile to use.

    Returns:
        The generated certificate object.

    Raises:
        ValidationError: If the CSR is invalid.
    """
```

## Testing

### Running Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=upkica --cov-report=html

# Run specific test file
pytest tests/test_100_pki_functional.py

# Run tests matching a pattern
pytest -k "test_certificate"
```

### Writing Tests

- Place tests in the `tests/` directory
- Name test files as `test_<module>.py`
- Use descriptive test names: `test_should_generate_valid_certificate`
- Include docstrings for test functions
- Test both positive and negative cases
- Ensure test coverage for new features

Example:

```python
def test_should_sign_certificate_with_valid_csr():
    """Test that a valid CSR is signed successfully."""
    # Arrange
    ca = CertificateAuthority()
    csr = generate_test_csr()

    # Act
    cert = ca.sign(csr)

    # Assert
    assert cert is not None
    assert cert.is_valid()
```

## Submitting Changes

### Pull Request Process

1. **Update your branch** — Ensure your branch is up-to-date with `upstream/main`
2. **Run tests** — All tests must pass
3. **Run linting** — Fix any linting errors
4. **Write a clear PR description** — Explain what you changed and why
5. **Reference issues** — Link related issues (e.g., "Fixes #123")

### PR Title Convention

Use conventional commits format:

- `feat: Add new certificate profile support`
- `fix: Resolve ZMQ connection timeout`
- `docs: Update API documentation`
- `test: Add tests for CRL generation`

### Review Process

- At least one maintainer approval required
- All CI checks must pass
- Address any review comments

## Reporting Issues

### Bug Reports

Use GitHub Issues to report bugs. Include:

1. **Description** — Clear description of the bug
2. **Steps to Reproduce** — Detailed steps to reproduce
3. **Expected Behavior** — What you expected to happen
4. **Actual Behavior** — What actually happened
5. **Environment** — Python version, OS, etc.
6. **Logs** — Relevant log output

### Feature Requests

For new features:

1. **Use Case** — Describe the use case
2. **Proposed Solution** — Your proposed implementation
3. **Alternatives** — Any alternatives you considered

## Security Considerations

When contributing to a PKI project:

- Never commit secrets or private keys
- Use secure random number generation
- Validate all inputs thoroughly
- Follow cryptographic best practices
- Report security vulnerabilities privately

## License

By contributing to uPKI CA Server, you agree that your contributions will be licensed under the [MIT License](LICENSE).
