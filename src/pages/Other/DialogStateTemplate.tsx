import * as React from "react";

import { useDispatch } from "react-redux";
import {
  closeDrawer,
  startLoading,
  stopLoading,
} from "../../store/drawerSlice";

import { GetCountries } from "../../scripts/countries";

import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";

import { AddState, IState, EditState } from "../../scripts/states";

// Snackbars
import { useSnackbarContext } from "./../../components/SnackbarContext";

// i18n
import { useTranslation } from "react-i18next";

// Mui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import FormHelperText from "@mui/material/FormHelperText";

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
  }, []);
  // Get Countries

  // i18n
  const { t } = useTranslation();

  // Snackbars
  const { showSnackbar } = useSnackbarContext();

  // Drawer
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState<boolean>(false);

  // Add state
  const addNewState = async (data: any) => {
    try {
      setLoading(true);
      dispatch(startLoading());
      const transformedData = {
        country: data.selectedCountry,
        name: data.stateName,
      };

      const response = await AddState(transformedData);
      if (!response) {
        showSnackbar(t("Error while adding, please try again"), "error");
        setLoading(false);
        dispatch(stopLoading());
        return;
      }
      dispatch(stopLoading());
      setLoading(false);
      dispatch(closeDrawer());
      setRefreshComponent(true);
      showSnackbar(t("Successfully added"), "success");
    } catch (error) {
      showSnackbar(t("Error while adding, please try again"), "error");
      setLoading(false);
    }
  };

  // Edit state
  const editState = async (oldData: IState, newData: any) => {
    try {
      setLoading(true);
      const transformedData = {
        country: newData.selectedCountry,
        name: newData.stateName,
      };

      const response = await EditState(oldData.id || 0, transformedData);
      if (!response) {
        showSnackbar(t("Error while adding, please try again"), "error");
        setLoading(false);
        return;
      }
      setLoading(false);
      dispatch(closeDrawer());
      setRefreshComponent(true);
      showSnackbar(t("Successfully added"), "success");
    } catch (error) {
      showSnackbar(t("Error while adding, please try again"), "error");
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectedCountry: "",
      stateName: "",
    },
  });

  // Check if data is passed
  const [stateData, setStateData] = React.useState(null);

  React.useEffect(() => {
    if (data) {
      setStateData(data);
      setValue("selectedCountry", data.country);
      setValue("stateName", data.name);
    } else {
      setStateData(null);
    }
  }, [data]);

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          if (stateData) {
            editState(stateData, data);
          } else {
            addNewState(data);
          }
        })}
      >
        /* Country */
        <InputLabel id="country-select">{t("Country") + "*"}</InputLabel>
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
              label={t("Select country")}
              sx={{ width: "100%" }}
              error={Boolean(errors.selectedCountry)}
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
        <FormHelperText>
          {errors.selectedCountry && (
            <p className="text-red-600">{t("Field is obliatory")}</p>
          )}
        </FormHelperText>
        {/* Name */}
        <TextField
          id="state-input"
          label={t("Name") + "*"}
          variant="outlined"
          sx={{ width: "100%", marginTop: "2rem" }}
          error={errors.stateName ? true : false}
          helperText={errors.stateName ? t("Field is obliatory") : ""}
          {...register("stateName", { required: true, maxLength: 56 })}
        />
        <div className="my-4" align="center">
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
            type="submit"
            sx={{ width: "50%" }}
          >
            {stateData ? t("Update") : t("Save")}
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default DialogStateTemplate;
