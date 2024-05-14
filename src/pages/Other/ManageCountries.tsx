import * as React from "react";

import { GetCountries } from "../../scripts/countries";

const ManageCountriesComponent = () => {
  const [countries, setCountries] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await GetCountries();
      setCountries(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      Manage Countries
      {countries.map((item) => {
        return <div key={item.id}>{item.name}</div>;
      })}
    </div>
  );
};

export default ManageCountriesComponent;
