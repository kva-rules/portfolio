import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProjects, calculateCategoryCounts } from './projectFilters';
import { ProjectItem } from '../data/profile';

const sampleProjects: ProjectItem[] = [
  {
    id: 'p1',
    title: 'AI Agent – Multi-Agent Orchestrator',
    subtitle: 'Autonomous workflows',
    badge: 'AI',
    status: 'In Progress',
    category: 'ai-agents',
    categoryLabel: 'AI & Agents',
    summary: 'Leverages MCP and Claude 3.5 Sonnet & Gemini 1.5 Pro',
    tags: ['Claude', 'Gemini', 'MCP', 'React'],
    githubUrl: '',
    hasLiveDemo: false,
    demoButtonText: 'In Progress',
    runnerType: 'ai-agent',
    architecture: { overview: '', components: [], dataFlow: [], diagramLabel: '' },
    techSpecs: { runtime: '', frameworks: [], databases: [], testing: [], deployment: [] }
  },
  {
    id: 'p2',
    title: 'Ticketing System – Event-Driven Microservices',
    subtitle: 'M.Tech final project',
    badge: 'Distributed',
    status: 'Production Spec',
    category: 'spring-boot',
    categoryLabel: 'Spring Boot',
    summary: 'High-throughput Kafka and Spring Boot microservices with PostgreSQL',
    tags: ['Spring Boot', 'Kafka', 'PostgreSQL', 'Kubernetes'],
    githubUrl: '',
    hasLiveDemo: true,
    demoButtonText: 'Demo',
    runnerType: 'kafka-microservices',
    architecture: { overview: '', components: [], dataFlow: [], diagramLabel: '' },
    techSpecs: { runtime: '', frameworks: [], databases: [], testing: [], deployment: [] }
  },
  {
    id: 'p3',
    title: 'HMS Patient Service – Healthcare Microservice',
    subtitle: 'M.Tech course project',
    badge: 'Healthcare',
    status: 'HIPAA Compliant',
    category: 'react',
    categoryLabel: 'React / Node.js',
    summary: 'EHR patient intake with Express and PostgreSQL',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'Swagger'],
    githubUrl: '',
    hasLiveDemo: true,
    demoButtonText: 'Swagger',
    runnerType: 'swagger-hms',
    architecture: { overview: '', components: [], dataFlow: [], diagramLabel: '' },
    techSpecs: { runtime: '', frameworks: [], databases: [], testing: [], deployment: [] }
  }
];

test('calculateCategoryCounts returns accurate totals for all categories', () => {
  const counts = calculateCategoryCounts(sampleProjects);
  assert.equal(counts.all, 3);
  assert.equal(counts['ai-agents'], 1);
  assert.equal(counts['spring-boot'], 1);
  assert.equal(counts.react, 1);
});

test('filterProjects handles "all" category without query', () => {
  const filtered = filterProjects(sampleProjects, 'all', '');
  assert.equal(filtered.length, 3);
});

test('filterProjects filters strictly by category', () => {
  const aiFiltered = filterProjects(sampleProjects, 'ai-agents', '');
  assert.equal(aiFiltered.length, 1);
  assert.equal(aiFiltered[0].id, 'p1');

  const springFiltered = filterProjects(sampleProjects, 'spring-boot', '');
  assert.equal(springFiltered.length, 1);
  assert.equal(springFiltered[0].id, 'p2');
});

test('filterProjects searches across title, tags, and summary case-insensitively', () => {
  // Search in tag
  const kafkaSearch = filterProjects(sampleProjects, 'all', 'kafka');
  assert.equal(kafkaSearch.length, 1);
  assert.equal(kafkaSearch[0].id, 'p2');

  // Search in summary
  const mcpSearch = filterProjects(sampleProjects, 'all', 'MCP');
  assert.equal(mcpSearch.length, 1);
  assert.equal(mcpSearch[0].id, 'p1');

  // Search across category constraint and query
  const mismatch = filterProjects(sampleProjects, 'spring-boot', 'Claude');
  assert.equal(mismatch.length, 0);
});
