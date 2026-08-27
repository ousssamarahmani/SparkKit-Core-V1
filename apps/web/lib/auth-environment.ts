export interface AuthEnvironment {
  baseURL: string;
  isProduction: boolean;
  secret: string;
  trustedOrigins: string[];
}

const developmentSecret =
  'sparkkit-local-development-secret-change-before-production';

function parseOrigin(value: string, variableName: string): string {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error(`${variableName} must be a valid absolute URL.`);
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error(`${variableName} must use HTTP or HTTPS.`);
  }

  if (url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error(`${variableName} must be an origin without credentials, path, query, or fragment.`);
  }

  return url.origin;
}

function isLoopbackOrigin(origin: string): boolean {
  const hostname = new URL(origin).hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

export function getAuthEnvironment(
  environment: NodeJS.ProcessEnv = process.env,
): AuthEnvironment {
  const isProduction = environment.NODE_ENV === 'production';
  const baseURL = parseOrigin(
    environment.BETTER_AUTH_URL ?? 'http://localhost:3001',
    'BETTER_AUTH_URL',
  );
  const secret = environment.BETTER_AUTH_SECRET;

  if (
    isProduction &&
    new URL(baseURL).protocol !== 'https:' &&
    !isLoopbackOrigin(baseURL)
  ) {
    throw new Error('BETTER_AUTH_URL must use HTTPS outside local loopback environments.');
  }

  if (isProduction && (secret === undefined || secret.length < 32)) {
    throw new Error('BETTER_AUTH_SECRET must contain at least 32 characters.');
  }

  const additionalOrigins = (environment.BETTER_AUTH_TRUSTED_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
    .map((origin, index) =>
      parseOrigin(origin, `BETTER_AUTH_TRUSTED_ORIGINS[${index}]`),
    );
  const trustedOrigins = [...new Set([baseURL, ...additionalOrigins])];

  if (
    isProduction &&
    trustedOrigins.some(
      (origin) =>
        new URL(origin).protocol !== 'https:' && !isLoopbackOrigin(origin),
    )
  ) {
    throw new Error('All non-loopback trusted origins must use HTTPS in production.');
  }

  return {
    baseURL,
    isProduction,
    secret: secret ?? developmentSecret,
    trustedOrigins,
  };
}

export function isTrustedRequestOrigin(
  request: Request,
  trustedOrigins: readonly string[],
): boolean {
  const origin = request.headers.get('origin');

  if (origin !== null) {
    return trustedOrigins.includes(origin);
  }

  const fetchSite = request.headers.get('sec-fetch-site');
  return fetchSite === 'same-origin' || fetchSite === 'same-site';
}
