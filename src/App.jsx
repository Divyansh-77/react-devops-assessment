import './App.css'

function App() {
  return (
    <main className="app">
      <div className="container">

        <header className="header">
          <div>
            <p className="eyebrow">DEVOPS PLATFORM</p>

            <h1>Deployment Dashboard</h1>

            <p className="subtitle">
              React application designed for automated, containerized deployment
              on AWS.
            </p>
          </div>

          <div className="status">
            <span className="status-dot"></span>
            Deployment Ready
          </div>
        </header>

        <section className="overview">
          <div className="info-card">
            <span>Application</span>
            <strong>React Application</strong>
          </div>

          <div className="info-card">
            <span>Target Environment</span>
            <strong>Production</strong>
          </div>

          <div className="info-card">
            <span>Release</span>
            <strong>v1.0.0</strong>
          </div>

          <div className="info-card">
            <span>Delivery</span>
            <strong>Automated CI/CD</strong>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <p className="section-label">PIPELINE</p>
              <h2>Deployment Workflow</h2>
            </div>

            <span className="completed">Pipeline Configured</span>
          </div>

          <div className="pipeline">

            <div className="pipeline-step">
              <div className="step-number">01</div>

              <div>
                <strong>Test</strong>
                <span>Validate application changes</span>
              </div>

              <b>READY</b>
            </div>

            <div className="pipeline-step">
              <div className="step-number">02</div>

              <div>
                <strong>Build</strong>
                <span>Create production Docker image</span>
              </div>

              <b>READY</b>
            </div>

            <div className="pipeline-step">
              <div className="step-number">03</div>

              <div>
                <strong>Deploy</strong>
                <span>Release application to AWS</span>
              </div>

              <b>READY</b>
            </div>

            <div className="pipeline-step">
              <div className="step-number">04</div>

              <div>
                <strong>Health Check</strong>
                <span>Validate deployed application</span>
              </div>

              <b>READY</b>
            </div>

          </div>
        </section>

        <section className="section stack-section">
          <p className="section-label">TECHNOLOGY STACK</p>

          <div className="stack">
            <span>React</span>
            <span>Docker</span>
            <span>Nginx</span>
            <span>AWS</span>
            <span>Terraform</span>
            <span>GitHub Actions</span>
          </div>
        </section>

        <footer>
          <span>DevOps Deployment Assessment</span>
          <span>Release v1.0.0</span>
        </footer>

      </div>
    </main>
  )
}

export default App