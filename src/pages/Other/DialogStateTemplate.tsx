import * as React from "react";

import { GetCountries } from "../../scripts/countries";

// Syncfusion components
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

const DialogStateTemplate: React.FC = (props: any) => {
  // Get Countries
  const [countries, setCountries] = React.useState<any[]>([]);
  const fetchCountries = async () => {
    const data = await GetCountries();
    setCountries(data);
  };
  React.useEffect(() => {
    fetchCountries();
  }, []);
  // Get Countries

  return (
    <div>
      <TextBoxComponent
        id="name"
        placeholder="State name"
        value={props.name}
        enabled={props.enabled}
        floatLabelType="Auto"
      />

      <DropDownListComponent
        id="country"
        value={props.country}
        dataSource={countries}
        fields={{ text: "name", value: "name" }}
        placeholder="Select country"
        floatLabelType="Always"
      />
    </div>
  );
};

export default DialogStateTemplate;
