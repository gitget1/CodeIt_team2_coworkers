module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[([^\]]+)\]\s+(FEAT|FIX|DOCS|STYLE|REFACTOR|TEST|CHORE)\s+-\s+(.*)$/,
      headerCorrespondence: ['card', 'type', 'subject'],
    },
  },
  rules: {
    'header-max-length': [2, 'always', 100],
    'type-enum': [2, 'always', ['FEAT', 'FIX', 'DOCS', 'STYLE', 'REFACTOR', 'TEST', 'CHORE']],
    'type-case': [2, 'always', 'upper-case'], // 대문자 허용을 위해
    'subject-empty': [2, 'never'], // 제목이 비어있으면 안 됨
    'type-empty': [2, 'never'], // 타입이 비어있으면 안 됨
  },
};
