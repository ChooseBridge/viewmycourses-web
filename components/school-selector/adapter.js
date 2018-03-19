module.exports = data => {
  const dataSource = [];

  for (let i in data) {
    dataSource.push({
      title: i,
      children: data[i].map(school => school)
    });
  }

  return dataSource;
};