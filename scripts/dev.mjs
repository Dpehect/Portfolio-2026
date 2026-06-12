import net from 'node:net';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const rootDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(rootDir, '..');
const nextCli = resolve(projectRoot, 'node_modules/next/dist/bin/next');
const viteCli = resolve(projectRoot, 'portfolio/node_modules/vite/bin/vite.js');

function isPortFree(port) {
  if (process.platform === 'win32') {
    const netstat = spawnSync('netstat', ['-ano', '-p', 'tcp'], { encoding: 'utf8' });

    if (netstat.status === 0 && typeof netstat.stdout === 'string') {
      const occupied = netstat.stdout
        .split(/\r?\n/)
        .some((line) => line.includes(`:${port} `) && line.toUpperCase().includes('LISTENING'));

      return Promise.resolve(!occupied);
    }
  }

  return new Promise((resolvePort) => {
    const server = net.createServer();

    server.unref();
    server.on('error', () => resolvePort(false));
    server.listen({ port, host: '::' }, () => {
      server.close(() => resolvePort(true));
    });
  });
}

async function findFreePort(startPort, avoidPorts = new Set()) {
  for (let port = startPort; port < startPort + 100; port += 1) {
    if (avoidPorts.has(port)) {
      continue;
    }

    if (await isPortFree(port)) {
      return port;
    }
  }

  throw new Error(`No free port found near ${startPort}`);
}

function spawnProcess(label, command, args, cwd) {
  const child = spawn(process.execPath, [command, ...args], {
    cwd,
    stdio: 'inherit',
    env: process.env,
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      process.exitCode = 1;
      return;
    }

    if (typeof code === 'number' && code !== 0) {
      process.exitCode = code;
      console.error(`${label} exited with code ${code}`);
      process.kill(process.pid, 'SIGTERM');
    }
  });

  return child;
}

async function main() {
  const sitePort = await findFreePort(3000);
  const portfolioPort = await findFreePort(3001, new Set([sitePort]));

  console.log(`Starting Next site on http://localhost:${sitePort}`);
  console.log(`Starting portfolio app on http://localhost:${portfolioPort}`);

  const siteProcess = spawnProcess('site', nextCli, ['dev', '-p', String(sitePort)], projectRoot);
  const portfolioProcess = spawnProcess(
    'portfolio',
    viteCli,
    ['--port', String(portfolioPort)],
    resolve(projectRoot, 'portfolio'),
  );

  const shutdown = () => {
    siteProcess.kill('SIGTERM');
    portfolioProcess.kill('SIGTERM');
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
