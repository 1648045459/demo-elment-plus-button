module.exports = {
    'root': true,
    'env': {
        'node': true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    'parserOptions': {
        'parser': 'babel-eslint'
    },
    'rules': {
    // 末尾加逗号，报警级别：error，状态：关闭
        'comma-dangle': ['error', 'never'],
        // 引号类型，报警级别：off，状态：单引号
        'quotes': ['off', 'single'],
        // 句末加分号，报警级别：error，状态：开启
        'semi': ['error', 'always'],
        // 方法名和括号之间的空格数
        'space-before-function-paren': 0,
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
};

