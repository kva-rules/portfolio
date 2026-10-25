import { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RefreshCw, Github, Check, AlertCircle, Database, Server, Cpu, Send, Layers, ArrowRight, ShieldCheck, Terminal, Copy } from 'lucide-react';
import { ProjectItem } from '../../data/profile';

interface DemoModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

type ModalTab = 'runner' | 'architecture' | 'tech-specs';

export function DemoModal({ project, onClose }: DemoModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>('runner');
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Esc key & trap focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl rounded-2xl bg-[#09122B] border border-cyan-500/30 shadow-[0_24px_50px_-12px_rgba(4,13,38,0.95)] overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 bg-[#131C38] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-cyan-950/40 text-cyan-400 border border-cyan-400/30">
              <Terminal className="w-5 h-5" />
            </span>
            <div>
              <h2 id="modal-project-title" className="text-lg sm:text-xl font-bold text-slate-100">
                {project.title}
              </h2>
              <p className="text-xs text-cyan-400 font-mono">
                {project.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>View source on GitHub</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal dialog"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-5 sm:px-7 py-2.5 bg-[#0D1630] border-b border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('runner')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'runner'
                ? 'bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.35)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Interactive Runner</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.35)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tech-specs')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'tech-specs'
                ? 'bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.35)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Tech Specs</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-slate-300">
          {activeTab === 'runner' && (
            <div>
              {/* Simulation Banner Notice */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-300 text-xs font-mono mb-5">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong>Simulated demo:</strong> Interactive simulation of system operations. No live production traffic is altered.
                  </span>
                </div>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-amber-400/20 text-[10px] font-bold uppercase tracking-wider">
                  Sandbox
                </span>
              </div>

              {/* Specific Runner based on project */}
              {project.runnerType === 'kafka-microservices' && <KafkaMicroservicesRunner />}
              {project.runnerType === 'swagger-hms' && <SwaggerHmsRunner />}
              {project.runnerType === 'ai-agent' && <AiAgentRunner project={project} />}
            </div>
          )}

          {activeTab === 'architecture' && <ArchitectureTab project={project} />}
          {activeTab === 'tech-specs' && <TechSpecsTab project={project} />}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-7 py-3 bg-[#0D1630] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono">Status: {project.status}</span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-slate-500">Press Esc to close</span>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 1. KAFKA MICROSERVICES RUNNER
// ----------------------------------------------------
function KafkaMicroservicesRunner() {
  const [messagesProcessed, setMessagesProcessed] = useState(142);
  const [isStreaming, setIsStreaming] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Gateway authenticated JWT token for client-usr-889',
    '[ROUTER] Route matching /api/v1/orders -> OrderService:8082',
    '[KAFKA] Emitted event: TICKET_RESERVED on topic "tickets.reservation"',
    '[DB] PostgreSQL (OrderDB) transaction committed with status: PENDING_PAYMENT'
  ]);

  // Periodic simulated packet flow
  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      setMessagesProcessed((prev) => prev + 1);
      setActiveStep((prev) => (prev + 1) % 4);
    }, 1800);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const handleDispatchTestOrder = () => {
    const orderId = Math.floor(1000 + Math.random() * 9000);
    const newLog = `[ORDER #${orderId}] Dispatched -> Gateway -> OrderService -> Kafka (Partition ${Math.floor(
      Math.random() * 3
    )}) -> PostgreSQL`;
    setLogs((prev) => [newLog, ...prev.slice(0, 5)]);
    setMessagesProcessed((prev) => prev + 1);
    setActiveStep(1);
  };

  const steps = [
    { name: 'Gateway', desc: 'Spring Cloud Gateway (JWT Auth)', icon: Server },
    { name: 'Order Service', desc: 'Spring Boot 3.3 (Saga Coordinator)', icon: Layers },
    { name: 'Kafka Cluster', desc: 'Topic: tickets.reservation', icon: RefreshCw },
    { name: 'PostgreSQL DB', desc: 'Database-per-Service (Instance 4)', icon: Database },
  ];

  return (
    <div className="space-y-6">
      {/* Top Telemetry & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#0B1020] border border-slate-800">
        <div className="space-y-0.5">
          <div className="text-[11px] font-mono uppercase text-slate-400">
            Messages processed
          </div>
          <div className="text-2xl font-mono font-bold text-cyan-400">
            {messagesProcessed.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDispatchTestOrder}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(34,211,238,0.3)] active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Dispatch Test Order</span>
          </button>

          <button
            type="button"
            onClick={() => setIsStreaming(!isStreaming)}
            aria-label={isStreaming ? 'Pause streaming simulation' : 'Resume streaming simulation'}
            className="p-2 rounded-xl text-xs bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700 transition-colors"
          >
            {isStreaming ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Animated Pipeline Graph */}
      <div className="p-5 rounded-2xl bg-[#0E162E] border border-slate-800">
        <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-4">
          Kafka Event Pipeline Topology
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCurrent = activeStep === index;

            return (
              <div
                key={step.name}
                className={`relative p-4 rounded-xl border transition-all duration-300 ${
                  isCurrent
                    ? 'bg-[#162244] border-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.3)] scale-[1.02]'
                    : 'bg-[#131C38] border-slate-700/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    Step 0{index + 1}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${
                      isCurrent ? 'text-cyan-300 animate-bounce' : 'text-slate-400'
                    }`}
                  />
                </div>

                <div className="font-bold text-sm text-slate-100">{step.name}</div>
                <div className="text-xs text-slate-400 mt-1">{step.desc}</div>

                {isCurrent && (
                  <div className="mt-2 text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
                    <span>Packet passing...</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time Streaming Logs */}
      <div className="p-4 rounded-xl bg-[#0B1020] border border-slate-800 font-mono text-xs space-y-1.5">
        <div className="text-[11px] font-bold text-slate-400 mb-2 flex items-center justify-between">
          <span>EVENT STREAM TRACE</span>
          <span className="text-emerald-400 text-[10px]">● LIVE LISTENER</span>
        </div>
        {logs.map((log, i) => (
          <div key={i} className="text-slate-300 leading-relaxed font-mono">
            <span className="text-cyan-400">&gt; </span>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. HMS PATIENT SERVICE SWAGGER RUNNER
// ----------------------------------------------------
function SwaggerHmsRunner() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<'getAll' | 'getById' | 'postPatient'>('getAll');
  const [responseOutput, setResponseOutput] = useState<string>('');
  const [statusOutput, setStatusOutput] = useState<number | null>(null);

  const endpoints = [
    {
      id: 'getAll',
      method: 'GET',
      path: '/api/v1/patients',
      desc: 'Retrieve paginated list of patients with HIPAA PII redaction',
      sampleResponse: {
        status: 'success',
        code: 200,
        pagination: { page: 1, limit: 10, total: 42 },
        data: [
          {
            id: 'pat_0981a',
            name: 'A****h K****r',
            national_id: '***-**-7712',
            email: 'a***k@example.com',
            blood_group: 'O+',
            admitted_at: '2026-10-24T08:30:00Z',
            telemetry: { heart_rate: 74, bp: '120/80', oxygen_sat: 99 }
          },
          {
            id: 'pat_0982b',
            name: 'P***a S***h',
            national_id: '***-**-9014',
            email: 'p***s@example.com',
            blood_group: 'A+',
            admitted_at: '2026-10-24T10:15:00Z',
            telemetry: { heart_rate: 68, bp: '118/76', oxygen_sat: 98 }
          }
        ]
      }
    },
    {
      id: 'getById',
      method: 'GET',
      path: '/api/v1/patients/{id}',
      desc: 'Fetch single patient record by clinical UUID',
      sampleResponse: {
        status: 'success',
        code: 200,
        data: {
          id: 'pat_0981a',
          name: 'A****h K****r',
          national_id: '***-**-7712',
          gender: 'Male',
          dob_masked: '1992-**-**',
          allergies: ['Penicillin'],
          active_prescription: 'Amoxicillin 500mg',
          audit_trail: { logged_by_role: 'NURSE_PRACTITIONER', timestamp: '2026-10-25T07:12:00Z' }
        }
      }
    },
    {
      id: 'postPatient',
      method: 'POST',
      path: '/api/v1/patients',
      desc: 'Ingest new EHR patient record with automatic encryption & audit log',
      sampleResponse: {
        status: 'created',
        code: 201,
        message: 'Patient record securely ingested with HIPAA compliance checks',
        record_id: 'pat_0999z',
        checksum: 'sha256:d8a2...3b9e',
        created_at: '2026-10-25T07:35:12Z'
      }
    }
  ];

  const handleTryIt = (endpoint: (typeof endpoints)[0]) => {
    setStatusOutput(endpoint.sampleResponse.code);
    setResponseOutput(JSON.stringify(endpoint.sampleResponse, null, 2));
  };

  return (
    <div className="space-y-6">
      <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
        OpenAPI 3.0 Interactive Contract
      </div>

      {/* Endpoints List */}
      <div className="space-y-3">
        {endpoints.map((ep) => (
          <div
            key={ep.id}
            className={`p-4 rounded-xl border transition-all ${
              selectedEndpoint === ep.id
                ? 'bg-[#131C38] border-cyan-400/60'
                : 'bg-[#0E162E] border-slate-800'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                    ep.method === 'GET'
                      ? 'bg-blue-900/60 text-blue-300 border border-blue-600/40'
                      : 'bg-emerald-900/60 text-emerald-300 border border-emerald-600/40'
                  }`}
                >
                  {ep.method}
                </span>
                <span className="font-mono text-sm font-semibold text-slate-100">
                  {ep.path}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedEndpoint(ep.id as any);
                  handleTryIt(ep);
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors shadow-sm active:scale-95"
              >
                Try It
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-2 font-mono">
              {ep.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Response Display */}
      {statusOutput && (
        <div className="p-4 rounded-xl bg-[#0B1020] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-slate-400 font-bold">Simulated Response Payload:</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
              HTTP {statusOutput} OK
            </span>
          </div>

          <pre className="p-3 rounded-lg bg-[#070D1E] text-slate-200 text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800/80">
            {responseOutput}
          </pre>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 3. AI AGENT ORCHESTRATOR RUNNER (IN PROGRESS)
// ----------------------------------------------------
function AiAgentRunner({ project }: { project: ProjectItem }) {
  return (
    <div className="space-y-6">
      {/* Coming Soon Notice */}
      <div className="p-5 rounded-2xl bg-[#131C38] border border-amber-500/30 text-center space-y-3">
        <div className="inline-flex p-3 rounded-xl bg-amber-950/40 text-amber-300 border border-amber-500/30">
          <Cpu className="w-6 h-6 animate-pulse" />
        </div>
        <h3 className="text-lg font-bold text-slate-100">
          In progress — coming soon
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          The Multi-Agent Orchestrator is actively under development leveraging the Model Context Protocol (MCP) and Google ADK. Below is the planned architecture blueprint and trace dispatcher.
        </p>
      </div>

      {/* Simulated Agent Trace Dispatcher */}
      <div className="p-5 rounded-2xl bg-[#0B1020] border border-slate-800 font-mono text-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-cyan-400 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
            AGENT TRACE DISPATCHER
          </span>
          <span className="text-[10px] text-slate-400">MCP: ACTIVE</span>
        </div>

        <div className="space-y-2 text-slate-300">
          <div>
            <span className="text-emerald-400">[INIT]</span> Initializing MCP host bridge on :8080
          </div>
          <div>
            <span className="text-cyan-400">[ROUTER]</span> User request received &rarr; evaluating token intent
          </div>
          <div>
            <span className="text-purple-400">Claude 3.5:</span> &ldquo;Synthesizing telemetry data against DB schema...&rdquo;
          </div>
          <div>
            <span className="text-amber-400">[TOOL]</span> Executing get_db_metrics() via internal RPC
          </div>
          <div className="text-slate-400">
            <span className="text-emerald-400">[COMPLETED]</span> Context merged: 842 tokens processed
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// ARCHITECTURE TAB
// ----------------------------------------------------
function ArchitectureTab({ project }: { project: ProjectItem }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-100 mb-2">
          {project.architecture.diagramLabel}
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          {project.architecture.overview}
        </p>
      </div>

      {/* Key Components */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
          Core Subsystems
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {project.architecture.components.map((comp, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-[#0E162E] border border-slate-800 text-xs">
              <div className="font-semibold text-slate-200 mb-1">{comp.split(':')[0]}</div>
              <div className="text-slate-400">{comp.split(':')[1] || ''}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step by Step Data Flow */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
          Transaction &amp; Data Flow
        </h4>
        <div className="space-y-2">
          {project.architecture.dataFlow.map((flow, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#0B1020] text-xs font-mono text-slate-300 border border-slate-800/80">
              <span className="text-cyan-400 font-bold shrink-0">0{i + 1}.</span>
              <span>{flow}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// TECH SPECS TAB
// ----------------------------------------------------
function TechSpecsTab({ project }: { project: ProjectItem }) {
  const specs = project.techSpecs;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Runtime */}
        <div className="p-4 rounded-xl bg-[#0E162E] border border-slate-800 space-y-1">
          <div className="text-[11px] font-mono uppercase text-slate-400">Target Runtime</div>
          <div className="text-sm font-bold text-slate-100 font-mono">{specs.runtime}</div>
        </div>

        {/* Frameworks */}
        <div className="p-4 rounded-xl bg-[#0E162E] border border-slate-800 space-y-2">
          <div className="text-[11px] font-mono uppercase text-slate-400">Frameworks &amp; Libraries</div>
          <div className="flex flex-wrap gap-1.5">
            {specs.frameworks.map((fw) => (
              <span key={fw} className="px-2 py-0.5 rounded bg-[#1A2447] text-cyan-300 text-xs font-mono">
                {fw}
              </span>
            ))}
          </div>
        </div>

        {/* Databases */}
        <div className="p-4 rounded-xl bg-[#0E162E] border border-slate-800 space-y-2">
          <div className="text-[11px] font-mono uppercase text-slate-400">Database Engine</div>
          <div className="flex flex-wrap gap-1.5">
            {specs.databases.map((db) => (
              <span key={db} className="px-2 py-0.5 rounded bg-[#1A2447] text-slate-200 text-xs font-mono">
                {db}
              </span>
            ))}
          </div>
        </div>

        {/* Messaging if present */}
        {specs.messaging && (
          <div className="p-4 rounded-xl bg-[#0E162E] border border-slate-800 space-y-2">
            <div className="text-[11px] font-mono uppercase text-slate-400">Message Broker &amp; Events</div>
            <div className="flex flex-wrap gap-1.5">
              {specs.messaging.map((msg) => (
                <span key={msg} className="px-2 py-0.5 rounded bg-[#1A2447] text-amber-300 text-xs font-mono">
                  {msg}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Testing */}
        <div className="p-4 rounded-xl bg-[#0E162E] border border-slate-800 space-y-2">
          <div className="text-[11px] font-mono uppercase text-slate-400">Testing &amp; Verification</div>
          <div className="flex flex-wrap gap-1.5">
            {specs.testing.map((test) => (
              <span key={test} className="px-2 py-0.5 rounded bg-[#1A2447] text-emerald-300 text-xs font-mono">
                {test}
              </span>
            ))}
          </div>
        </div>

        {/* Deployment */}
        <div className="p-4 rounded-xl bg-[#0E162E] border border-slate-800 space-y-2">
          <div className="text-[11px] font-mono uppercase text-slate-400">Container &amp; Orchestration</div>
          <div className="flex flex-wrap gap-1.5">
            {specs.deployment.map((dep) => (
              <span key={dep} className="px-2 py-0.5 rounded bg-[#1A2447] text-slate-200 text-xs font-mono">
                {dep}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
