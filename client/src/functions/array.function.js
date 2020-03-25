export const arrayHandler = (data, search) => {

  var array = data.map(item => {
      const user = {
        id: item._id,
        info: item.secondName + " " + item.name
      };
      return user;
  });

  array = array.sort(function(a, b) {
      if (a.info < b.info) return -1;
      else if (a.info > b.info) return 1;
      return 0;
  });

  const filterItems = query => {
      return array.filter(
        element => element.info.toLowerCase().indexOf(query.toLowerCase()) > -1
      );
  };

  array = filterItems(search)

  return array
}