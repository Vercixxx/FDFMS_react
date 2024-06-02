import React from "react";

// Theme
import { ThemeContext } from "../../config/ThemeContext";

// Snackbars
import { useSnackbarContext } from "./../../components/SnackbarContext";

// i18n
import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";
import {
  closeDrawer,
  startLoading,
  stopLoading,
} from "../../store/drawerSlice";

import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";

// Scripts
import { GetCountries } from "../../scripts/countries";
import { GetStates } from "../../scripts/states";
import { AddUser, EditUser } from "../../scripts/users";

// Mui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import FormHelperText from "@mui/material/FormHelperText";
import Divider from "@mui/material/Divider";

interface AddEditUserComponentTemplateProps {
  refreshComponent: boolean;
  setRefreshComponent: (value: boolean) => void;
  data?: any;
}

const AddEditUserComponent: React.FC<AddEditUserComponentTemplateProps> = ({
  refreshComponent,
  setRefreshComponent,
  data,
}) => {
  // Theme
  const { theme } = React.useContext(ThemeContext);
  const darkMode = theme.palette.mode === "dark" ? true : false;
  // Theme

  // i18n
  const { t } = useTranslation();

  // Snackbars
  const { showSnackbar } = useSnackbarContext();

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

  // Get States
  const [states, setStates] = React.useState<any[]>([]);
  const fetchStates = async () => {
    const data = await GetStates();
    setStates(data);
  };
  React.useEffect(() => {
    fetchStates();
  }, []);
  // Get States

  //Fields configuration
  const fieldsConfig = {
    username: {
      id: "username",
      name: "Username",
      maxLength: 2,
      format: /^[a-zA-Z0-9_]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      hint: "Username is filled automatically",
      disabled: true,
      required: false,
    },
    email: {
      id: "email",
      name: "Email",
      maxLength: 100,
      format: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
    first_name: {
      id: "first_name",
      name: "First Name",
      maxLength: 100,
      format: /^[a-zA-Z ]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
    last_name: {
      id: "last_name",
      name: "Last Name",
      maxLength: 100,
      format: /^[a-zA-Z ]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
    phone: {
      id: "phone",
      name: "Phone",
      maxLength: 15,
      format: /^[0-9]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
    pesel_nip: {
      id: "pesel_nip",
      name: "PESEL",
      maxLength: 11,
      format: /^[0-9]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
    tax_office_name: {
      id: "tax_office_name",
      name: "Tax Office Name",
      maxLength: 100,
      format: /^[a-zA-Z ]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
    tax_office_address: {
      id: "tax_office_address",
      name: "Tax Office Address",
      maxLength: 100,
      format: /^[a-zA-Z ]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
    nfz: {
      id: "nfz",
      name: "NFZ Office Name",
      maxLength: 100,
      format: /^[a-zA-Z ]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
    bank_account_number: {
      id: "bank_account_number",
      name: "Bank Account Number",
      maxLength: 26,
      format: /^[0-9]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
    residence_city: {
      id: "residence_city",
      name: "Residence City",
      maxLength: 100,
      format: /^[a-zA-Z ]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
    residence_street: {
      id: "residence_street",
      name: "Residence Street",
      maxLength: 100,
      format: /^[a-zA-Z ]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
    residence_house_number: {
      id: "residence_house_number",
      name: "Residence House Number",
      maxLength: 10,
      format: /^[0-9]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
    residence_apartment_number: {
      id: "residence_apartment_number",
      name: "Residence Apartment Number",
      maxLength: 10,
      format: /^[0-9]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: false,
    },
    residence_zip_code: {
      id: "residence_zip_code",
      name: "Residence Postal Code",
      maxLength: 6,
      format: /^[0-9]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
  };

  //Basic information
  const basicInformationFields = [
    "username",
    "email",
    "first_name",
    "last_name",
    "phone",
    "pesel_nip",
  ];

  //Tax and Health
  const taxAndHealthFields = [
    "tax_office_name",
    "tax_office_address",
    "nfz",
    "bank_account_number",
  ];

  //Residence address
  const residenceAddressFields = [
    "residence_city",
    "residence_street",
    "residence_house_number",
    "residence_apartment_number",
    "residence_zip_code",
  ];

  //Controller
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      username: data?.username || "",
      email: data?.email || "",
      first_name: data?.first_name || "",
      last_name: data?.last_name || "",
      role: data?.role || "",
      status: data?.status || "",
      phone: data?.phone || "",
      pesel: data?.pesel || "",
      tax_office_name: data?.tax_office_name || "",
      tax_office_address: data?.tax_office_address || "",
      nfz: data?.nfz || "",
      bank_account_number: data?.bank_account_number || "",
      residence_city: data?.residence_city || "",
      residence_street: data?.residence_street || "",
      residence_house_number: data?.residence_house_number || "",
      residence_apartment_number: data?.residence_apartment_number || "",
      residence_zip_code: data?.residence_zip_code || "",
      residence_country: data?.residence_country || "",
      residence_state: data?.residence_state || "",
    },
  });

  const selectedCountry = watch("residence_country");

  //Form
  const [loading, setLoading] = React.useState(false);

  return (
    <div className={darkMode ? "text-white" : "text-black"}>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);

          //   if (stateData) {
          //     editState(stateData, data);
          //   } else {
          //     addNewState(data);
          //   }
        })}
      >
        {/* ======================== Basic information ========================*/}
        <div className="mb-10">
          <div className="text-center text-xl font-black">
            <Divider sx={{}}> {t("Basic Information")} </Divider>
          </div>
          {Array(Math.ceil(basicInformationFields.length / 2))
            .fill(0)
            .map((_, i) => {
              const fieldNames = basicInformationFields.slice(i * 2, i * 2 + 2);
              return (
                <div className="flex justify-evenly" key={i}>
                  {fieldNames.map((fieldName) => {
                    const fieldConfig = fieldsConfig[fieldName];
                    if (!fieldConfig) return null;
                    return (
                      <TextField
                        key={fieldName}
                        id={`${fieldConfig.id}-input`}
                        label={t(fieldConfig.name) + "*"}
                        variant={fieldConfig.variant as any}
                        style={fieldConfig.style}
                        error={errors[fieldConfig.id] ? true : false}
                        disabled={fieldConfig.disabled}
                        helperText={
                          errors[fieldConfig.id]
                            ? errors[fieldConfig.id].message
                            : fieldConfig.hint || null
                        }
                        {...register(fieldConfig.id, {
                          required: {
                            value: fieldConfig.required,
                            message: `${t("Field is required")}`,
                          },
                          maxLength: {
                            value: fieldConfig.maxLength,
                            message: ` ${t("Field is too long")}`,
                          },
                          pattern: {
                            value: fieldConfig.format,
                            message: `${t("Field format is invalid")}`,
                          },
                        })}
                      />
                    );
                  })}
                </div>
              );
            })}
        </div>
        {/* ======================== Basic information ========================*/}

        {/* ======================== Tax and Health ========================*/}
        <div className="text-center text-xl font-black mt-10">
          <Divider> {t("Tax and Health")} </Divider>
        </div>
        {Array(Math.ceil(taxAndHealthFields.length / 2))
          .fill(0)
          .map((_, i) => {
            const fieldNames = taxAndHealthFields.slice(i * 2, i * 2 + 2);
            return (
              <div className="flex justify-evenly" key={i}>
                {fieldNames.map((fieldName) => {
                  const fieldConfig = fieldsConfig[fieldName];
                  if (!fieldConfig) return null;
                  return (
                    <TextField
                      key={fieldName}
                      id={`${fieldConfig.id}-input`}
                      label={t(fieldConfig.name) + "*"}
                      variant={fieldConfig.variant as any}
                      style={fieldConfig.style}
                      error={errors[fieldConfig.id] ? true : false}
                      disabled={fieldConfig.disabled}
                      helperText={
                        errors[fieldConfig.id]
                          ? errors[fieldConfig.id].message
                          : fieldConfig.hint || null
                      }
                      {...register(fieldConfig.id, {
                        required: {
                          value: fieldConfig.required,
                          message: `${t("Field is required")}`,
                        },
                        maxLength: {
                          value: fieldConfig.maxLength,
                          message: ` ${t("Field is too long")}`,
                        },
                        pattern: {
                          value: fieldConfig.format,
                          message: `${t("Field format is invalid")}`,
                        },
                      })}
                    />
                  );
                })}
              </div>
            );
          })}
        {/* ======================== Tax and Health ========================*/}

        {/* ======================== Residence Address ========================*/}
        <div className="text-center text-xl font-black mt-10">
          <Divider> {t("Residence Address")} </Divider>
        </div>

        {/* Residence country & state */}
        <div className="mb-5 mt-4 px-6">
          <InputLabel id="country-select">
            {t("Select country") + "*"}
          </InputLabel>
          <Controller
            name="residence_country"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="country-select"
                id="residence_country"
                label={t("Select country")}
                sx={{ width: "100%" }}
                error={Boolean(errors.residence_country)}
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
            {errors.residence_country && (
              <p className="text-red-600">{t("Field is obliatory")}</p>
            )}
          </FormHelperText>
        </div>

        <div className="px-6">
          <InputLabel id="residence_state-select">
            {t("Select state") + "*"}
          </InputLabel>
          <Controller
            name="residence_state"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="residence_state-select"
                id="residence_state"
                label={t("Select state")}
                sx={{ width: "100%" }}
                error={Boolean(errors.residence_state)}
                disabled={!selectedCountry}
              >
                {Array.isArray(states) &&
                  states.map((state) => (
                    <MenuItem key={state.name} value={state.name}>
                      {state.name}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
          <FormHelperText>
            {!selectedCountry && (
              <p className="">{t("Select country first")}</p>
            )}
          </FormHelperText>
          <FormHelperText>
            {errors.residence_state && (
              <p className="text-red-600">{t("Field is obliatory")}</p>
            )}
          </FormHelperText>
        </div>

        {/* Residence country & state */}

        {Array(Math.ceil(residenceAddressFields.length / 2))
          .fill(0)
          .map((_, i) => {
            const fieldNames = residenceAddressFields.slice(i * 2, i * 2 + 2);
            return (
              <div className="flex justify-evenly" key={i}>
                {fieldNames.map((fieldName) => {
                  const fieldConfig = fieldsConfig[fieldName];
                  if (!fieldConfig) return null;
                  return (
                    <TextField
                      key={fieldName}
                      id={`${fieldConfig.id}-input`}
                      label={t(fieldConfig.name) + "*"}
                      variant={fieldConfig.variant as any}
                      style={fieldConfig.style}
                      error={errors[fieldConfig.id] ? true : false}
                      disabled={fieldConfig.disabled}
                      helperText={
                        errors[fieldConfig.id]
                          ? errors[fieldConfig.id].message
                          : fieldConfig.hint || null
                      }
                      {...register(fieldConfig.id, {
                        required: {
                          value: fieldConfig.required,
                          message: `${t("Field is required")}`,
                        },
                        maxLength: {
                          value: fieldConfig.maxLength,
                          message: ` ${t("Field is too long")}`,
                        },
                        pattern: {
                          value: fieldConfig.format,
                          message: `${t("Field format is invalid")}`,
                        },
                      })}
                    />
                  );
                })}
              </div>
            );
          })}
        {/* ======================== Residence Address ========================*/}
        {isValid.toString()}
        <div className="my-4" align="center">
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
            type="submit"
            color="success"
            sx={{ width: "50%" }}
            disabled={!isValid || Object.keys(errors).length > 0}
          >
            {data ? t("Update") : t("Save")}
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default AddEditUserComponent;
