export interface StatItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  category: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  clients: string;
  description: string;
  responsibilities: string[];
  tags: string[];
  highlight?: string;
}

export type ProjectCategory = 'all' | 'ai-agents' | 'spring-boot' | 'react';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  status: 'In Progress' | 'Production Spec' | 'HIPAA Compliant' | 'Active';
  category: ProjectCategory;
  categoryLabel: string;
  summary: string;
  tags: string[];
  githubUrl: string;
  hasLiveDemo: boolean;
  demoButtonText: string;
  runnerType: 'ai-agent' | 'kafka-microservices' | 'swagger-hms';
  architecture: {
    overview: string;
    components: string[];
    dataFlow: string[];
    diagramLabel: string;
  };
  techSpecs: {
    runtime: string;
    frameworks: string[];
    databases: string[];
    messaging?: string[];
    testing: string[];
    deployment: string[];
  };
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  skills: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badgeCode?: string;
  verifyUrl?: string;
  featured?: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string;
  score?: string;
  thesis?: string;
}

export interface ProfileData {
  personal: {
    name: string;
    role: string;
    location: string;
    email: string;
    linkedin: string;
    github: string;
    tagline: string;
    summary: string;
    availability: string;
    avatarUrl: string;
    resumeUrl: string;
  };
  codeSnippet: {
    filename: string;
    version: string;
    code: string;
  };
  stats: StatItem[];
  about: {
    title: string;
    headline: string;
    body: string;
    pills: string[];
    currentAssignment: {
      role: string;
      company: string;
      quarter: string;
      project: string;
      stack: string;
      description: string;
      metric: {
        label: string;
        value: string;
      };
    };
  };
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillGroup[];
  focusAllocation: {
    label: string;
    percentage: number;
    color: string;
  }[];
  certifications: CertificationItem[];
  education: EducationItem[];
  contact: {
    headline: string;
    subheadline: string;
    email: string;
    linkedin: string;
    github: string;
  };
}

export const PROFILE_DATA: ProfileData = {
  personal: {
    name: "Abhidhab Mellwyn",
    role: "Full Stack Engineer · AI Agents",
    location: "Chennai, India",
    email: "melvinprofessionalkva@gmail.com",
    linkedin: "https://www.linkedin.com/in/abhidhab-mellwyn/",
    github: "https://github.com/kva-rules",
    tagline: "I build enterprise web apps with React and Java, and autonomous AI agents with Claude and Gemini.",
    summary: "Full Stack Engineer with 4+ years at Cognizant supporting and building enterprise web applications in React.js and Java. Experienced in production support, root cause analysis and microservices (Spring Boot, Kafka, Docker, Kubernetes). M.Tech in Software Engineering (BITS Pilani), Claude Certified Architect and Azure certified, using AI agents and tools to ship faster.",
    availability: "Available for Full Stack & AI Engineering roles · Chennai / Remote",
    avatarUrl: "/assets/aistudio/Abhidhab_Mellwyn_Profile_Photo_2f6118f5.jpg",
    resumeUrl: "/resume/Abhidhab_Mellwyn_Resume.pdf",
  },
  codeSnippet: {
    filename: "engineer.ts",
    version: "v4.2.0",
    code: `const engineer = {
  stack: ["React", "Java", "Node.js"],
  cloud: ["AWS", "Azure"],
  ai:    ["Claude", "Gemini", "ADK"]
};`
  },
  stats: [
    {
      id: "tenure",
      value: "4+",
      label: "Years Experience",
      sublabel: "at Cognizant",
      category: "Tenure"
    },
    {
      id: "degree",
      value: "M.Tech",
      label: "BITS Pilani",
      sublabel: "Software Eng.",
      category: "Postgrad"
    },
    {
      id: "certifications",
      value: "8",
      label: "Certifications",
      sublabel: "Anthropic, Google, MSFT",
      category: "Validation"
    },
    {
      id: "clients",
      value: "3",
      label: "Enterprise Clients",
      sublabel: "HMH, Philips, PepsiCo",
      category: "Impact"
    }
  ],
  about: {
    title: "Background",
    headline: "Engineered for High-Concurrence Enterprise Architectures",
    body: "Specializing in resilient distributed microservices, highly performant React web interfaces, and modern cognitive agentic automation. With an M.Tech in Software Engineering from BITS Pilani, I merge structural backend stability with modern generative intelligence. From refactoring mission-critical educational platforms serving millions of active students, to orchestrating multi-agent LLM systems with Anthropic and Google SDKs, my focus centers on zero-downtime reliability and clean modular patterns.",
    pills: ["Distributed Systems", "Event-Driven Architecture", "LLM Orchestration"],
    currentAssignment: {
      quarter: "Q1 2026",
      role: "Associate at Cognizant",
      company: "Cognizant",
      project: "HMH EdTech Platform",
      stack: "React.js · Java · AWS · Spring Boot",
      description: "Actively spearheading enhancements and distributed production reliability for Houghton Mifflin Harcourt (HMH) digital learning ecosystems. Scaling platform capabilities handling millions of concurrent student interactions daily.",
      metric: {
        label: "SLA AVAILABILITY",
        value: "99.98% Uptime"
      }
    }
  },
  experience: [
    {
      id: "exp-1",
      role: "Associate",
      company: "Cognizant",
      period: "Jan 2025 – Present",
      location: "Chennai, India",
      clients: "Houghton Mifflin Harcourt (HMH)",
      highlight: "EdTech Platform · Promoted to Associate Jul 2025",
      description: "Production support and root cause analysis across high-throughput distributed microservices in an enterprise digital classroom landscape.",
      responsibilities: [
        "Architecting distributed microservices and engineering scalable React & Java enhancements.",
        "Managing cloud infrastructure operations on AWS application servers, optimizing state caching and sub-second rendering for educators.",
        "Accelerating CI/CD deployment pipelines utilizing Concourse and GitHub Actions.",
        "Accelerating sprint development velocity and root cause analysis by integrating AI pair-programming tooling via Claude Code and GitHub Copilot."
      ],
      tags: ["React.js", "Java", "Spring Boot", "AWS", "Concourse CI", "Claude Code", "GitHub Actions"]
    },
    {
      id: "exp-2",
      role: "Programmer Analyst – Frontend Developer",
      company: "Cognizant",
      period: "Nov 2023 – Jan 2025",
      location: "Chennai, India",
      clients: "Philips (ConfigIT) and PepsiCo",
      highlight: "Healthcare & Enterprise Solutions",
      description: "Engineered dynamic, highly modular web interfaces using React.js and Material-UI with reusable design system component libraries.",
      responsibilities: [
        "Engineered reusable React component libraries integrated with strict Material-UI enterprise design standards.",
        "Designed complex product configuration workflows for Philips healthcare solutions.",
        "Optimized complex global state synchronization across multi-tenant enterprise dashboards using Redux Toolkit.",
        "Integrated responsive UIs seamlessly with high-throughput backend REST APIs."
      ],
      tags: ["React.js", "Material-UI", "Redux", "TypeScript", "REST APIs"]
    },
    {
      id: "exp-3",
      role: "Programmer Analyst Trainee – SAP Developer",
      company: "Cognizant",
      period: "Nov 2022 – Nov 2023",
      location: "Chennai, India",
      clients: "PepsiCo",
      highlight: "SAP PLM & Enterprise Data",
      description: "Configured SAP Product Lifecycle Management (PLM) customizations and automated enterprise data synchronization pipelines.",
      responsibilities: [
        "Modernized SAP Product Lifecycle Management workflows and WWI reports.",
        "Engineered transactional SQL routines and automated data sync routines.",
        "Maintained enterprise data consistency pipelines across global manufacturing nodes."
      ],
      tags: ["SAP PLM", "SQL", "WWI Reports", "Enterprise Data"]
    },
    {
      id: "exp-4",
      role: "Internship Trainee",
      company: "Cognizant",
      period: "Mar 2022 – Oct 2022",
      location: "Chennai, India",
      clients: "Cognizant Academy",
      highlight: "Foundational Engineering",
      description: "Intensive enterprise full-stack development training focusing on Core Java, Spring Framework, OOP patterns, and modern web application fundamentals.",
      responsibilities: [
        "Mastered Core Java, Spring MVC, and database design principles.",
        "Built responsive web applications and participated in enterprise code reviews.",
        "Collaborated on foundational SAP PLM modules and system integration testing."
      ],
      tags: ["Core Java", "Spring", "OOP", "Web Development", "SQL"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "AI Agent – Multi-Agent Orchestrator",
      subtitle: "Autonomous enterprise workflows with multi-modal reasoning and tool execution",
      badge: "Autonomous AI Architecture",
      status: "In Progress",
      category: "ai-agents",
      categoryLabel: "AI & Agents",
      summary: "Autonomous multi-model intelligence network leveraging Model Context Protocol (MCP) server tooling, dual-routing between Claude 3.5 Sonnet & Gemini 1.5 Pro, and automated execution loops via Google ADK.",
      tags: ["Claude 3.5 Sonnet", "Gemini 1.5 Pro", "Google ADK", "MCP Server", "TypeScript", "React"],
      githubUrl: "https://github.com/kva-rules/multi-agent-orchestrator",
      hasLiveDemo: false,
      demoButtonText: "In Progress (Coming Soon)",
      runnerType: "ai-agent",
      architecture: {
        overview: "Hierarchical agentic architecture coordinating model reasoning with specialized MCP server tools. Implements dynamic intent classification routing complex reasoning to Claude 3.5 Sonnet and high-context ingestion to Gemini 1.5 Pro.",
        components: [
          "Agent Trace Dispatcher: Manages event streaming and live step inspection",
          "Dual LLM Orchestrator: Dynamic router (Claude 3.5 Sonnet + Gemini 1.5 Pro)",
          "Model Context Protocol (MCP) Server: Secure tool registration & sandboxed execution",
          "Google ADK Execution Engine: Deterministic loops with state machine safety checks"
        ],
        dataFlow: [
          "User Request -> Agent Trace Dispatcher -> Evaluates token intent",
          "High context payload -> Routed to Gemini 1.5 Pro (1M+ context window)",
          "Deep reasoning / Tool logic -> Routed to Claude 3.5 Sonnet",
          "Tool calls validated via MCP schema -> Sandboxed execution -> Context merged"
        ],
        diagramLabel: "Multi-Agent MCP Tool Dispatch Pipeline"
      },
      techSpecs: {
        runtime: "Node.js 22 LTS / TypeScript 5.5",
        frameworks: ["Google ADK", "Anthropic Claude SDK", "MCP Protocol SDK", "React 18", "Tailwind CSS"],
        databases: ["Vector Store (pgvector)", "Redis Cache for Session History"],
        testing: ["Vitest", "Playwright E2E", "Mock LLM Token Fixtures"],
        deployment: ["Docker Container", "Cloud Run", "Model Armor Security Gateway"]
      }
    },
    {
      id: "proj-2",
      title: "Ticketing System – Event-Driven Microservices",
      subtitle: "M.Tech final project (Jan–Jun 2026) · High-throughput distributed enterprise ticketing",
      badge: "Distributed Systems",
      status: "Production Spec",
      category: "spring-boot",
      categoryLabel: "Spring Boot",
      summary: "High-throughput distributed event-driven ecosystem composed of 8 Spring Boot services, Apache Kafka message buses, distributed transactions, PostgreSQL, and container orchestration with Kubernetes.",
      tags: ["8x Spring Boot", "Apache Kafka", "PostgreSQL", "Kubernetes", "React UI", "Docker", "JWT Auth"],
      githubUrl: "https://github.com/kva-rules/event-driven-ticketing-system",
      hasLiveDemo: true,
      demoButtonText: "Launch Kafka Topology Demo",
      runnerType: "kafka-microservices",
      architecture: {
        overview: "8 decoupled Spring Boot microservices interconnected with partitioned Apache Kafka topics. Features database-per-service isolation (7 PostgreSQL instances), unified Spring Cloud Gateway with JWT authentication, and resilient distributed saga transactions.",
        components: [
          "Spring Cloud API Gateway: Central entry point, JWT verification, rate limiting, and unified Swagger aggregator",
          "Auth & User Service: Identity management, BCrypt hashing, JWT token issuance",
          "Ticket Catalog Service: Event catalog, seat inventory, pricing engine",
          "Order & Booking Service: Saga coordinator for two-phase reservation flows",
          "Payment Service: Idempotent payment gateway webhooks and receipt dispatch",
          "Notification Service: Async email & SMS broker consuming booking events",
          "Reporting & Analytics Service: Real-time ticket sales aggregation via Kafka Streams",
          "Audit Log Service: Immutable compliance trail stored in append-only PostgreSQL"
        ],
        dataFlow: [
          "Client Request -> Spring Cloud Gateway (JWT Auth Check)",
          "Gateway routes to Order Service -> Generates 'TICKET_RESERVED' Kafka event",
          "Payment Service consumes 'TICKET_RESERVED' -> Processes charge -> Emits 'PAYMENT_CONFIRMED'",
          "Notification & Ticket Service consume 'PAYMENT_CONFIRMED' -> Updates seat inventory -> Dispatches QR ticket",
          "If payment fails -> Order Service consumes 'PAYMENT_FAILED' -> Triggers rollback saga"
        ],
        diagramLabel: "8-Service Kafka Event Mesh & Database-per-Service Topology"
      },
      techSpecs: {
        runtime: "Java 21 LTS (OpenJDK Temurin)",
        frameworks: ["Spring Boot 3.3", "Spring Cloud Gateway", "Spring Data JPA", "Spring Security", "React 18 + Redux"],
        databases: ["PostgreSQL 16 (7 isolated database instances)"],
        messaging: ["Apache Kafka 3.7 (Partitioned cluster with KRaft mode)"],
        testing: ["JUnit 5", "Testcontainers (PostgreSQL & Kafka)", "24-Step E2E Integration Suite"],
        deployment: ["Kubernetes (Minikube / EKS)", "Helm Charts", "Docker Multi-stage Builds"]
      }
    },
    {
      id: "proj-3",
      title: "HMS Patient Service – Healthcare Microservice",
      subtitle: "M.Tech course project (Jul–Nov 2025) · Secure, HIPAA-compliant patient record ingestion",
      badge: "Healthcare Tech",
      status: "HIPAA Compliant",
      category: "react",
      categoryLabel: "React / Node.js",
      summary: "Fault-tolerant EHR patient intake microservice built on Node.js/Express with strict schema validation, PostgreSQL relational indexing, Prometheus real-time health telemetry, and auto-generated Swagger OpenAPI specs.",
      tags: ["Node.js", "Express", "PostgreSQL", "Prometheus", "OpenAPI", "Jest", "Docker"],
      githubUrl: "https://github.com/kva-rules/hms-patient-service",
      hasLiveDemo: true,
      demoButtonText: "Interactive Swagger Runner",
      runnerType: "swagger-hms",
      architecture: {
        overview: "Secure patient-record RESTful microservice engineering healthcare data ingestion pipelines with end-to-end PII masking, relational data normalization, health check probe endpoints, and Prometheus metrics scraping.",
        components: [
          "Express REST Router: Strictly typed routes with input sanitization and PII redactor",
          "Sequelize ORM Layer: Normalized schema handling patients, medical records, and vitals",
          "PostgreSQL Engine: Indexed lookups by national health ID with encrypted at-rest storage",
          "Prometheus Telemetry Exporter: Exposing latency percentiles, error rates, and request counts",
          "Swagger / OpenAPI 3.0 Documentation: Auto-generated interactive contract"
        ],
        dataFlow: [
          "HTTP Request -> PII Sanitization & Authorization Middleware",
          "Input Validation (Joi/Zod) -> Controller Layer",
          "Sequelize ORM -> Parameterized Query -> PostgreSQL Instance",
          "Response Payload -> Logs emitted with HIPAA PII masking",
          "Prometheus Scrapes /metrics endpoint at 15s intervals"
        ],
        diagramLabel: "HIPAA Compliant EHR Record Ingestion & Telemetry Architecture"
      },
      techSpecs: {
        runtime: "Node.js 20 LTS",
        frameworks: ["Express 4.19", "Sequelize ORM", "Swagger UI Express", "prom-client"],
        databases: ["PostgreSQL 15 with B-Tree composite indexing"],
        testing: ["Jest (94% coverage)", "Supertest HTTP assertions"],
        deployment: ["Docker", "Kubernetes Pod with liveness/readiness probes"]
      }
    }
  ],
  skills: [
    {
      id: "ai-agents",
      title: "AI & Autonomous Agents",
      subtitle: "Cognitive Workflows & LLM Orchestration",
      skills: [
        "Claude 3.5 Sonnet",
        "Claude Code & Agent SDK",
        "Gemini 1.5 Pro",
        "Google ADK",
        "MCP Protocol",
        "Gemini Enterprise",
        "Model Armor",
        "Context Engineering",
        "GitHub Copilot",
        "Cursor",
        "Prompt Engineering"
      ]
    },
    {
      id: "backend-distributed",
      title: "Backend & Microservices",
      subtitle: "APIs & Event Streaming Systems",
      skills: [
        "Java (Core & EE)",
        "Java 21",
        "Spring Boot",
        "Spring Cloud Gateway",
        "Apache Kafka",
        "Node.js",
        "Express.js",
        "REST & OpenAPI",
        "JWT & Spring Security"
      ]
    },
    {
      id: "frontend-engineering",
      title: "Frontend Engineering",
      subtitle: "Client & UI Systems",
      skills: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Redux Toolkit",
        "Material-UI",
        "Tailwind CSS",
        "HTML5 / Web APIs",
        "Responsive Design"
      ]
    },
    {
      id: "cloud-devops",
      title: "Cloud & DevOps",
      subtitle: "Containers & CI/CD Pipelines",
      skills: [
        "AWS (ECS, S3, IAM)",
        "Microsoft Azure",
        "Google Cloud",
        "Docker & K8s",
        "Concourse CI",
        "GitHub Actions",
        "Jenkins",
        "Git & GitOps"
      ]
    },
    {
      id: "data-persistence",
      title: "Data & Persistence",
      subtitle: "Databases & Caching",
      skills: [
        "PostgreSQL",
        "MySQL",
        "SQL Server",
        "Redis",
        "SQL & Indexing",
        "Database-per-Service"
      ]
    }
  ],
  focusAllocation: [
    { label: "Microservices & Backend", percentage: 45, color: "#22D3EE" },
    { label: "Modern Frontend (React)", percentage: 30, color: "#9FC2FF" },
    { label: "Autonomous AI Agents", percentage: 25, color: "#F59E0B" }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "Claude Certified Architect – Foundations",
      issuer: "Anthropic",
      date: "Jun 2026",
      verifyUrl: "https://www.credly.com/badges/dfb952be-fb7d-4f9e-9d51-239a71f58d26",
      featured: true
    },
    {
      id: "cert-2",
      title: "Google Certified Partner Specialist: Gemini Enterprise Agent Dev",
      issuer: "Google Cloud",
      date: "Oct 2026",
      verifyUrl: "https://www.credly.com/go/wvN7VpA8",
      featured: true
    },
    {
      id: "cert-3",
      title: "Google Certified Partner Specialist: Gemini Enterprise Deployment",
      issuer: "Google Cloud",
      date: "Oct 2026",
      verifyUrl: "https://www.credly.com/go/eyVzyg4B",
      featured: true
    },
    {
      id: "cert-4",
      title: "Microsoft Certified: Azure Developer Associate (AZ-204)",
      issuer: "Microsoft",
      date: "Aug 2025",
      featured: true
    },
    {
      id: "cert-5",
      title: "Microsoft Certified: Azure Fundamentals (AZ-900)",
      issuer: "Microsoft",
      date: "Mar 2024"
    },
    {
      id: "cert-6",
      title: "Build with Gemini – Track 2: Platform IT Developer",
      issuer: "Google Cloud",
      date: "Oct 2026",
      verifyUrl: "https://www.credly.com/badges/f482d9fe-9d5b-4e37-bb60-4d3c3f4ef7f0"
    },
    {
      id: "cert-7",
      title: "GitHub Copilot – AI Augmented Software Engineer, Professional Certification (Intermediate)",
      issuer: "Cognizant",
      date: "Sep 2026"
    },
    {
      id: "cert-8",
      title: "Context Engineering Foundation",
      issuer: "Cognizant",
      date: "May 2026"
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "M.Tech in Software Engineering",
      institution: "BITS Pilani",
      period: "2024 – 2026",
      details: "Advanced coursework in Distributed Computing, Scalable Cloud Architectures, Enterprise Microservices, and Autonomous Algorithmic Systems.",
      thesis: "Final Thesis: Event-Driven Kafka Microservices"
    },
    {
      id: "edu-2",
      degree: "B.E. in Mechanical Engineering",
      institution: "St. Joseph's College of Engineering, Chennai",
      period: "2018 – 2022",
      score: "CGPA 8.16 · First Class with Distinction",
      details: "Comprehensive quantitative engineering foundation, numerical analysis, automated systems modeling, and applied computing."
    }
  ],
  contact: {
    headline: "Let's build something.",
    subheadline: "Open to Full Stack and AI engineering roles — Chennai, on-site, hybrid, and overseas.",
    email: "melvinprofessionalkva@gmail.com",
    linkedin: "https://www.linkedin.com/in/abhidhab-mellwyn/",
    github: "https://github.com/kva-rules"
  }
};
