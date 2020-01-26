module.exports = {
  checkCPF: cpf => {
    let temp, count, total;

    temp = cpf.toString().substr(0,9);
    count = 10;
    total = 0;
    for (let number of temp) {
      total += (number*count);
      count--;
    }
    total = ((total*10)%11)
    if (total > 9) total = 0;
    if (total != cpf.toString().charAt(9)) {
      return false;
    }

    temp = cpf.toString().substr(0,10);
    count = 11;
    total = 0;
    for (let number of temp) {
      total += (number*count);
      count--;
    }
    total = ((total*10)%11)
    if (total > 9) total = 0;
    if (total != cpf.toString().charAt(10)) return false;

    return true;
  },

  formatCPF: cpf => {
    cpf = cpf.toString();
    return cpf.substring(0, 3)+'.'+cpf.substring(3, 6)+'.'+cpf.substring(6, 9)+'-'+cpf.substring(9, 11);
  },

  formatUSD: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }),

  makePath: (params, type) => {
    switch (type) {
      case 'back':
        return process.env.REACT_APP_BACK_URL+'/'+params.join('/');
      case 'front':
      default:
        return process.env.REACT_APP_FRONT_URL+'/'+params.join('/');
    }
  },
}