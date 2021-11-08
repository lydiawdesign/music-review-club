module.exports = {
  formatDate: (date) => {
    // Format date as MM/DD/YYYY
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
  },
  log: (data) => {
    console.log(data)
  }
};

