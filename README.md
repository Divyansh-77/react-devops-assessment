# React Application Deployment — AWS, Docker, Terraform & CI/CD

![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED?logo=docker&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-IaC-7B42BC?logo=terraform&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-EC2-FF9900?logo=amazonaws&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-Reverse%20Proxy-009639?logo=nginx&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white)

> End-to-end DevOps deployment of a containerized React application on AWS EC2 using Terraform, Docker, Nginx, and GitHub Actions.

---

## Live Demo

**Application:** [Open Live Application](http://43.204.101.177)

> **Note:** This is a temporary assessment environment. The AWS infrastructure may be destroyed after review to avoid unnecessary costs, so the live demo may become unavailable.

**Repository:** [react-devops-assessment](https://github.com/Divyansh-77/react-devops-assessment)

**Implementation Document:** [View Implementation Document](https://drive.google.com/file/d/1LJRf7sLl61LAklObIu1k47ILe5SiHJkC/view?usp=sharing)

---

## Architecture

<p align="center">
  <img src="./docs/architecture.png" alt="High-Level DevOps Architecture" width="100%">
</p>

### Deployment Flow

**Developer → GitHub → GitHub Actions → Test → Docker Build → AWS EC2 → Nginx → React Application**

### Infrastructure Flow

**Terraform → AWS EC2 + Security Group + SSH Key Pair**

---

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend application |
| Docker | Application containerization |
| Terraform | Infrastructure as Code |
| AWS EC2 | Application server |
| Nginx | Reverse proxy |
| GitHub Actions | CI/CD automation |
| GitHub | Source control |
| SSH/SCP | Deployment communication |

---

## Repository Structure

```text
react-devops-assessment/
├── src/
├── deploy/
│   └── nginx.conf
├── terraform/
├── .github/
│   └── workflows/
│       └── ci.yml
├── docs/
│   └── architecture.png
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

---

## Infrastructure with Terraform

Terraform is used to provision and manage the AWS infrastructure required by the application.

### Managed Resources

- EC2 instance
- Security group
- SSH key pair
- EC2 initialization

Docker and Nginx are installed automatically during instance initialization.

### Provisioning

```bash
terraform -chdir=terraform init
terraform -chdir=terraform plan
terraform -chdir=terraform apply
```

---

## Docker Containerization

The application uses a **multi-stage Docker build**.

### Build Stage

- Node.js
- Dependency installation
- React production build

### Runtime Stage

- Nginx Alpine
- Serves the React `dist` files
- Exposes port `80`

This separates the build environment from the application runtime.

---

## Nginx Reverse Proxy

Nginx runs on the EC2 host and acts as the public HTTP entry point.

```text
Internet
   |
   v
Nginx :80
   |
   v
127.0.0.1:8080
   |
   v
Docker Container :80
   |
   v
React Application
```

The Docker container is bound to `127.0.0.1:8080` and is not directly exposed to the internet.

---

## CI/CD Pipeline

A push to the `main` branch triggers the GitHub Actions workflow.

```text
Push to main
     |
     v
Install Dependencies
     |
     v
Lint
     |
     v
React Build
     |
     v
Docker Build
     |
     v
SSH / SCP
     |
     v
AWS EC2 Deployment
     |
     v
Health Check
     |
     +---- PASS ----> Deployment Successful
     |
     +---- FAIL ----> Rollback
```

### Test

```bash
npm ci
npm run lint
npm run build
```

### Deployment

After the test stage succeeds, GitHub Actions:

1. Builds the Docker image.
2. Tags the image with the Git commit SHA.
3. Transfers the image to EC2 using SSH/SCP.
4. Loads the image into Docker.
5. Starts the new application container.
6. Runs a health check.
7. Performs rollback if the health check fails.

---

## Health Check

The deployment validates the application through Nginx:

```bash
curl --fail --silent --show-error http://127.0.0.1/
```

A deployment is considered successful only after the health check passes.

---

## Rollback Strategy

Before deploying a new version, the previous container is preserved as:

```text
react-app-previous
```

If the new deployment fails its health check, the workflow automatically restores the previous working container.

The rollback mechanism was validated using an intentionally broken deployment. The failed health check triggered the rollback and restored the previous working application.

---

## Security

- Deployment secrets are stored in GitHub Actions Secrets.
- SSH private keys are not committed to the repository.
- The application container is bound to `127.0.0.1:8080`.
- Nginx provides the public HTTP entry point.
- AWS access should follow least-privilege principles.
- SSH access is configured for CI/CD connectivity in the assessment environment.

---

## Deployment

Push changes to `main`:

```bash
git add .
git commit -m "update application"
git push origin main
```

GitHub Actions automatically performs:

**Test → Build → Deploy → Health Check**

---

## Cleanup

After assessment and technical review, the temporary AWS infrastructure can be removed using:

```bash
terraform -chdir=terraform destroy
```

This helps prevent unnecessary ongoing AWS costs.

---

## Production Considerations

For production use, the solution could be extended with:

- HTTPS/TLS
- Restricted SSH and network access
- Centralized logging
- Monitoring and alerting
- Stronger IAM controls
- Additional security and scalability measures

---

## Conclusion

This project demonstrates an end-to-end DevOps workflow:

**Terraform → AWS EC2 → Docker → Nginx → GitHub Actions → Health Check → Rollback**

The implementation provides:

- Infrastructure as Code
- Containerized application deployment
- Automated CI/CD
- Application health validation
- Automated rollback
- Reproducible deployment workflow

---