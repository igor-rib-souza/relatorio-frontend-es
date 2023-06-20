module.exports = {
  onError: (err, nextConfig) => {
    if (err instanceof SyntaxError && err.code === 'ERR_PRETTIER_PARSE_FAILED') {
      console.warn('Ignorando erro de SyntaxError durante o build');
      return [];
    }

    // Verifica se o erro é causado por SyntaxError ao analisar JSON
    if (err instanceof SyntaxError && err.message.startsWith('Unexpected token u in JSON')) {
      console.warn('Ignorando erro de SyntaxError ao analisar JSON durante o build');
      return [];
    }

    throw err;
  },
  images: {
    domains: ['relatorio-codex-bucket.s3.amazonaws.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
