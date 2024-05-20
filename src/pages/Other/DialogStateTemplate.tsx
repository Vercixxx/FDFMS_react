import * as React from "react";

import { useDispatch } from "react-redux";
import { closeDrawer } from "../../store/drawerSlice";

import { GetCountries } from "../../scripts/countries";

import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";

import { GetStates, AddState, DeleteState, IState } from "../../scripts/states";

// Mui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

interface DialogStateTemplateProps {
  refreshComponent: boolean;
  setRefreshComponent: (value: boolean) => void;
  data?: any;
}

const DialogStateTemplate: React.FC<DialogStateTemplateProps> = ({
  refreshComponent,
  setRefreshComponent,
  data,
}) => {
  // Get Countries
  const [countries, setCountries] = React.useState<any[]>([]);
  const fetchCountries = async () => {
    const data = await GetCountries();
    setCountries(data);
  };
  React.useEffect(() => {
    fetchCountries();
    console.log("Countries: ", countries);
  }, []);
  // Get Countries

  // Drawer
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState<boolean>(false);

  // Add state
  const addNewState = async (data: any) => {
    try {
      setLoading(true);
      const transformedData = {
        country: data.selectedCountry,
        name: data.stateName,
      };
      await AddState(transformedData);
      setLoading(false);
      dispatch(closeDrawer());
      setRefreshComponent(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectedCountry: "",
      stateName: "",
    },
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          addNewState(data);
        })}
      >
        {/* Country */}

        <InputLabel id="country-select">Country</InputLabel>
        <Controller
          name="selectedCountry"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              labelId="country-select"
              id="selectedCountry"
              label="Select country"
              sx={{ width: "100%" }}
            >
              {Array.isArray(countries) &&
                countries.map((country) => (
                  <MenuItem key={country.name} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
            </Select>
          )}
        />

        {/* Name */}

        <TextField
          id="state-input"
          label="Name"
          variant="outlined"
          sx={{ width: "100%", marginTop: "2rem" }}
          {...register("stateName", { required: true, maxLength: 10 })}
        />

        {errors.stateName && (
          <p className="text-red-600">This field is required</p>
        )}
        <div className="my-4" align="center">
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
            type="submit"
            sx={{ width: "50%" }}
          >
            Add state
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default DialogStateTemplate;
