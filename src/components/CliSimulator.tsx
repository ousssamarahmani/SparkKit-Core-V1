import React, { useState, useEffect, useRef } from 'react';
import { cliCommands } from '../data/cliData';
import { Terminal, Play, RotateCcw, Check, Copy, AlertCircle, Sparkles, Cpu, Layers } from 'lucide-react';

export const CliSimulator: React.FC = () => {
  const [activeCommand, setActiveCommand] = useState<string>('npx create-sparkkit');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [inputCommand, setInputCommand] = useState<string>('spark dev');
  const [copiedLog, setCopiedLog] = useState<boolean>(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const selectedCmdSpec = cliCommands.find(c => c.command === activeCommand) || cliCommands[0];

  useEffect(() => {
    // Initial default run
    runSimulatedCommand(selectedCmdSpec.command, selectedCmdSpec.exampleOutput);
  }, [activeCommand]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  const runSimulatedCommand = (cmdName: string, lines: string[]) => {
    setIsRunning(true);
    setTerminalLogs([`$ ${cmdName}`]);

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        const lineToPush = lines[currentLine];
        setTerminalLogs(prev => [...prev, lineToPush]);
        currentLine++;
      } else {
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 180);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCommand.trim() || isRunning) return;

    const matched = cliCommands.find(c => c.command.toLowerCase().includes(inputCommand.trim().toLowerCase()));
    if (matched) {
      setActiveCommand(matched.command);
      runSimulatedCommand(inputCommand, matched.exampleOutput);
    } else {
      setIsRunning(true);
      setTerminalLogs([
        `$ ${inputCommand}`,
        `⚡ SparkKit CLI v1.2.0`,
        `Executing command: "${inputCommand}"...`,
        `✔ Validating configuration files in sparkkit.config.ts...`,
        `✔ Process executed successfully in 140ms.`,
        `✨ Task complete!`
      ]);
      setTimeout(() => setIsRunning(false), 800);
    }
  };

  const copyTerminalOutput = () => {
    navigator.clipboard.writeText(terminalLogs.join('\n'));
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-[#F2F2F2] p-4 sm:p-8 space-y-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Header Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
          <Terminal className="w-3.5 h-3.5 text-white" />
          <span>Interactive SparkKit CLI Terminal</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Developer Tooling Simulator
        </h1>

        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Test drive SparkKit's command-line commands in real-time. Experience scaffolding projects with <code className="text-zinc-200 font-mono">npx create-sparkkit</code>, running dev servers, generating database models, and diagnosing health with <code className="text-zinc-200 font-mono">spark doctor</code>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Commands Spec Selector */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 px-1">
            CLI Command Library
          </h2>

          <div className="space-y-2">
            {cliCommands.map((cmd) => {
              const isSelected = cmd.command === activeCommand;
              return (
                <button
                  key={cmd.command}
                  onClick={() => {
                    setActiveCommand(cmd.command);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl transition-colors border ${
                    isSelected
                      ? 'bg-white/10 border-white/20 text-white font-bold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs font-bold">
                    <span>{cmd.command}</span>
                    {isSelected && <Sparkles className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2 leading-tight font-sans font-normal">
                    {cmd.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Terminal Emulator Window */}
        <div className="lg:col-span-8 space-y-4">
          {/* Terminal Box */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[520px]">
            {/* Terminal Window Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                <span className="text-xs font-mono text-zinc-400 ml-2">bash - sparkkit-cli v1.2.0</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => runSimulatedCommand(selectedCmdSpec.command, selectedCmdSpec.exampleOutput)}
                  disabled={isRunning}
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  title="Rerun command"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Re-run</span>
                </button>

                <button
                  onClick={copyTerminalOutput}
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-mono flex items-center gap-1.5 transition-colors"
                >
                  {copiedLog ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
            </div>

            {/* Terminal Output Area */}
            <div className="flex-1 p-5 font-mono text-xs sm:text-sm overflow-y-auto bg-zinc-950 space-y-2 text-zinc-200">
              {terminalLogs.map((log, index) => {
                const isCommandPrompt = log.startsWith('$');
                const isSuccess = log.includes('✔') || log.includes('🎉') || log.includes('✨') || log.includes('[✓]');
                const isHeader = log.includes('⚡') || log.includes('🚀') || log.includes('🏥');

                return (
                  <div
                    key={index}
                    className={`leading-relaxed ${
                      isCommandPrompt
                        ? 'text-white font-bold'
                        : isSuccess
                        ? 'text-emerald-400'
                        : isHeader
                        ? 'text-zinc-200 font-bold'
                        : 'text-zinc-400'
                    }`}
                  >
                    {log}
                  </div>
                );
              })}
              {isRunning && (
                <div className="flex items-center gap-2 text-zinc-400 text-xs animate-pulse font-mono">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span>Executing process...</span>
                </div>
              )}
              <div ref={terminalEndRef} />
            </div>

            {/* Terminal Interactive Input Bar */}
            <form onSubmit={handleCustomSubmit} className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2 shrink-0">
              <span className="text-zinc-400 font-mono font-bold text-xs sm:text-sm pl-2">$</span>
              <input
                type="text"
                value={inputCommand}
                onChange={(e) => setInputCommand(e.target.value)}
                placeholder="Type a CLI command e.g. spark doctor, spark dev, spark deploy"
                className="flex-1 bg-transparent text-xs sm:text-sm font-mono text-white placeholder-zinc-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isRunning}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute</span>
              </button>
            </form>
          </div>

          {/* Flags & Options Card */}
          {selectedCmdSpec.options && selectedCmdSpec.options.length > 0 && (
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Command Options & Flags ({selectedCmdSpec.command})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {selectedCmdSpec.options.map((opt, idx) => (
                  <div key={idx} className="bg-zinc-900 p-2 rounded border border-zinc-800 flex items-center justify-between">
                    <span className="text-white font-semibold">{opt.flag}</span>
                    <span className="text-zinc-400 text-[11px] font-sans truncate ml-2">{opt.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
