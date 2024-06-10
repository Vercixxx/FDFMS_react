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
import { GetStatesForCountry } from "../../scripts/states";
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
import { Switch } from "@mui/material";

// Ant design
import type { DatePickerProps } from "antd";
import { ConfigProvider, DatePicker } from "antd";
import dayjs from "dayjs";

interface AddEditUserComponentTemplateProps {
  refreshComponent: boolean;
  setRefreshComponent: (value: boolean) => void;
  role?: string;
  data?: any;
}

const AddEditUserComponent: React.FC<AddEditUserComponentTemplateProps> = ({
  refreshComponent,
  setRefreshComponent,
  role,
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

  // Dispatch
  const dispatch = useDispatch();

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

  // Correspondence Address
  const [
    correspondenceAddressSameAsResidence,
    setCorrespondenceAddressSameAsResidence,
  ] = React.useState(data ? false : true);
  const switchCorrespondenceAddress = (event, checked) => {
    setCorrespondenceAddressSameAsResidence(checked);
  };

  // Registered Address
  const [
    registeredAddressSameAsResidence,
    setRegisteredAddressSameAsResidence,
  ] = React.useState(data ? false : true);
  const switchRegisteredAddress = (event, checked) => {
    setRegisteredAddressSameAsResidence(checked);
  };

  //Fields configuration
  const fieldsConfig = {
    username: {
      id: "username",
      name: "",
      maxLength: 9,
      format: /^[a-zA-Z0-9_ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      hint: "Username will be generated automatically",
      disabled: true,
      required: false,
    },
    user_role: {
      id: "user_role",
      name: "",
      maxLength: 20,
      format: /^[a-zA-Z]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      hint: "User class",
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
      format: /^[a-zA-Z ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
    last_name: {
      id: "last_name",
      name: "Last Name",
      maxLength: 100,
      format: /^[a-zA-Z ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*$/,
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
      format: /^[a-zA-Z0-9 -]*$/,
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
      format: /^[a-zA-Z0-9]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
    residence_home_number: {
      id: "residence_home_number",
      name: "Residence House Number",
      maxLength: 10,
      format: /^[0-9a-zA-Z]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
    residence_apartment_number: {
      id: "residence_apartment_number",
      name: "Residence Apartment Number",
      maxLength: 10,
      format: /^[0-9a-zA-Z]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: false,
    },
    residence_zip_code: {
      id: "residence_zip_code",
      name: "Residence Postal Code",
      maxLength: 6,
      format: /^[0-9-]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
    correspondence_city: {
      id: "correspondence_city",
      name: "Correspondence City",
      maxLength: 100,
      format: /^[a-zA-Z ]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: correspondenceAddressSameAsResidence ? false : true,
    },
    correspondence_street: {
      id: "correspondence_street",
      name: "Correspondence Street",
      maxLength: 100,
      format: /^[a-zA-Z0-9]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: correspondenceAddressSameAsResidence ? false : true,
    },
    correspondence_home_number: {
      id: "correspondence_home_number",
      name: "Correspondence House Number",
      maxLength: 10,
      format: /^[0-9a-zA-Z]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: correspondenceAddressSameAsResidence ? false : true,
    },
    correspondence_apartment_number: {
      id: "correspondence_apartment_number",
      name: "Correspondence Apartment Number",
      maxLength: 10,
      format: /^[0-9a-zA-Z]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: false,
    },
    correspondence_zip_code: {
      id: "correspondence_zip_code",
      name: "Correspondence Postal Code",
      maxLength: 6,
      format: /^[0-9-]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: correspondenceAddressSameAsResidence ? false : true,
    },
    registered_city: {
      id: "registered_city",
      name: "Registered City",
      maxLength: 100,
      format: /^[a-zA-Z ]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: registeredAddressSameAsResidence ? false : true,
    },
    registered_street: {
      id: "registered_street",
      name: "Registered Street",
      maxLength: 100,
      format: /^[a-zA-Z0-9]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: registeredAddressSameAsResidence ? false : true,
    },
    registered_home_number: {
      id: "registered_home_number",
      name: "Registered House Number",
      maxLength: 10,
      format: /^[0-9a-zA-Z]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: registeredAddressSameAsResidence ? false : true,
    },
    registered_apartment_number: {
      id: "registered_apartment_number",
      name: "Registered Apartment Number",
      maxLength: 10,
      format: /^[0-9a-zA-Z]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: false,
    },
    registered_zip_code: {
      id: "registered_zip_code",
      name: "Registered Postal Code",
      maxLength: 6,
      format: /^[0-9-]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: registeredAddressSameAsResidence ? false : true,
    },
    license_number: {
      id: "license_number",
      name: "License Number",
      maxLength: 20,
      format: /^[0-9a-zA-Z -]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
    ln_code: {
      id: "ln_code",
      name: "License Code",
      maxLength: 20,
      format: /^[0-9a-zA-Z -]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
    published_by: {
      id: "ln_published_by",
      name: "Published By",
      maxLength: 100,
      format: /^[a-zA-Z ]*$/,
      style: { width: "46%", marginTop: "2rem" },
      variant: "outlined",
      disabled: false,
      required: true,
    },
  };

  //Basic information
  const basicInformationFields = [
    "username",
    "user_role",
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
    "residence_home_number",
    "residence_apartment_number",
    "residence_zip_code",
  ];

  // Correspondence address
  const correspondenceAddressFields = [
    "correspondence_city",
    "correspondence_street",
    "correspondence_home_number",
    "correspondence_apartment_number",
    "correspondence_zip_code",
  ];

  // Registered address
  const registeredAddressFields = [
    "registered_city",
    "registered_street",
    "registered_home_number",
    "registered_apartment_number",
    "registered_zip_code",
  ];

  // Driver section
  const driverFields = ["license_number", "ln_code", "published_by"];

  // ======================================== Controller ========================================
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    shouldUnregister: true,
    criteriaMode: "all",
    defaultValues: {
      username: data?.username || "",
      email: data?.email || "",
      first_name: data?.first_name || "",
      last_name: data?.last_name || "",
      user_role: data?.user_role || role,
      status: data?.status || "",
      phone: data?.phone || "",
      pesel_nip: data?.pesel_nip || "",
      tax_office_name: data?.tax_office_name || "",
      tax_office_address: data?.tax_office_address || "",
      nfz: data?.nfz || "",
      bank_account_number: data?.bank_account_number || "",
      residence_city: data?.residence_city || "",
      residence_street: data?.residence_street || "",
      residence_home_number: data?.residence_home_number || "",
      residence_apartment_number: data?.residence_apartment_number || "",
      residence_zip_code: data?.residence_zip_code || "",
      residence_country: data?.residence_country || "",
      residence_state: data?.residence_state.split("(")[0].trim() || "",
      correspondence_city: data?.correspondence_city || "",
      correspondence_street: data?.correspondence_street || "",
      correspondence_home_number: data?.correspondence_home_number || "",
      correspondence_apartment_number:
        data?.correspondence_apartment_number || "",
      correspondence_zip_code: data?.correspondence_zip_code || "",
      correspondence_country: data?.correspondence_country || "",
      correspondence_state:
        data?.correspondence_state.split("(")[0].trim() || "",
      registered_city: data?.registered_city || "",
      registered_street: data?.registered_street || "",
      registered_home_number: data?.registered_home_number || "",
      registered_apartment_number: data?.registered_apartment_number || "",
      registered_zip_code: data?.registered_zip_code || "",
      registered_country: data?.registered_country || "",
      registered_state: data?.registered_state.split("(")[0].trim() || "",
      license_number: role === "Driver" ? data?.license_number || "" : "",
      ln_code: role === "Driver" ? data?.ln_code || "" : "",
      ln_published_by: role === "Driver" ? data?.ln_published_by || "" : "",
      ln_release_date:
        role === "Driver"
          ? data && dayjs(data.ln_release_date).isValid()
            ? dayjs(data.ln_release_date)
            : ""
          : "",
      ln_expire_date:
        role === "Driver"
          ? data && dayjs(data.ln_expire_date).isValid()
            ? dayjs(data.ln_expire_date)
            : ""
          : "",
    },
  });

  // ======================================== Residence ========================================
  const residenceSelectedCountry = watch("residence_country");

  // Get Residence States
  const [residenceStates, setResidenceStates] = React.useState<any[]>([]);
  const fetchStates = async () => {
    const data = await GetStatesForCountry(residenceSelectedCountry);
    setResidenceStates(data);
  };
  React.useEffect(() => {
    if (residenceSelectedCountry) {
      fetchStates();
    }
  }, [residenceSelectedCountry]);
  // Get Residence States

  // ======================================== Correspondence ========================================
  const correspondenceSelectedCountry = watch("correspondence_country");

  // Get States
  const [correspondenceStates, setCorrespondenceStates] = React.useState<any[]>(
    []
  );
  const fetchCorrespondenceStates = async () => {
    const data = await GetStatesForCountry(correspondenceSelectedCountry);
    setCorrespondenceStates(data);
  };
  React.useEffect(() => {
    if (correspondenceSelectedCountry) {
      fetchCorrespondenceStates();
    }
  }, [correspondenceSelectedCountry]);

  // ======================================== Registered ========================================
  const registeredSelectedCountry = watch("registered_country");
  const [registeredStates, setRegisteredStates] = React.useState<any[]>([]);
  const fetchRegisteredStates = async () => {
    const data = await GetStatesForCountry(registeredSelectedCountry);
    setRegisteredStates(data);
  };
  React.useEffect(() => {
    if (registeredSelectedCountry) {
      fetchRegisteredStates();
    }
  }, [registeredSelectedCountry]);

  // ======================================== Generate Username ========================================
  const firstName = watch("first_name");
  const lastName = watch("last_name");

  function generateUsername(firstName: string, lastName: string): string {
    const firstPart = firstName.substr(0, 3);
    const secondPart = lastName.substr(0, 3);
    const thirdPart = Math.floor(Math.random() * 900) + 100;
    return firstPart + secondPart + thirdPart;
  }

  React.useEffect(() => {
    if (firstName && lastName && !data) {
      const newUsername = generateUsername(firstName, lastName);
      setValue("username", newUsername);
      trigger("username");
    }
  }, [firstName, lastName]);

  //Form
  const [loading, setLoading] = React.useState(false);

  return (
    <div className={darkMode ? "text-white" : "text-black"}>
      <form
        onSubmit={handleSubmit(async (d) => {
          // Copy from residence to correspondence
          if (correspondenceAddressSameAsResidence) {
            const fields = [
              "city",
              "street",
              "home_number",
              "apartment_number",
              "zip_code",
              "country",
              "state",
            ];

            fields.forEach((field) => {
              const residenceValue = getValues(`residence_${field}`);
              setValue(`correspondence_${field}`, residenceValue);
              trigger(`correspondence_${field}`);
            });
          }

          // Copy from residence to registered
          if (registeredAddressSameAsResidence) {
            const fields = [
              "city",
              "street",
              "home_number",
              "apartment_number",
              "zip_code",
              "country",
              "state",
            ];

            fields.forEach((field) => {
              const residenceValue = getValues(`residence_${field}`);
              setValue(`registered_${field}`, residenceValue);
              trigger(`registered_${field}`);
            });
          }

          const userData = getValues();
          userData.ln_release_date = dayjs(userData.ln_release_date).format('YYYY-MM-DD');
          userData.ln_expire_date = dayjs(userData.ln_expire_date).format('YYYY-MM-DD');

          if (!data) {
            dispatch(startLoading());
            console.log(userData);
            
            await AddUser(userData)
              .then((response) => {
                dispatch(stopLoading());
                setRefreshComponent(!refreshComponent);
                showSnackbar("User added successfully", "success");
                dispatch(closeDrawer());
              })
              .catch((error) => {
                dispatch(stopLoading());
                showSnackbar(error, "error");
              });
            dispatch(stopLoading());
          } else {
            dispatch(startLoading());
            await EditUser(userData.username, userData.user_role, userData)
              .then((response) => {
                dispatch(stopLoading());
                setRefreshComponent(!refreshComponent);
                showSnackbar("User edited successfully", "success");
                dispatch(closeDrawer());
              })
              .catch((error) => {
                dispatch(stopLoading());
                showSnackbar(error, "error");
              });
            dispatch(stopLoading());
          }
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
                        label={
                          fieldConfig.name
                            ? t(fieldConfig.name) +
                              (fieldConfig.required ? "*" : "")
                            : null
                        }
                        variant={fieldConfig.variant as any}
                        style={fieldConfig.style}
                        error={errors[fieldConfig.id] ? true : false}
                        disabled={fieldConfig.disabled}
                        helperText={
                          errors[fieldConfig.id]
                            ? errors[fieldConfig.id].message
                            : t(fieldConfig.hint) || null
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

        {/* ======================== Driver information ========================*/}
        {role === "Driver" && (
          <div className="mb-10">
            <div className="text-center text-xl font-black">
              <Divider sx={{}}> {t("Driver Information")} </Divider>
            </div>

            <div className="flex justify-evenly">
              <ConfigProvider
                theme={{
                  components: {
                    DatePicker: {
                      colorBgContainer: darkMode ? "#333" : "#fff",
                      colorTextDescription: darkMode ? "#fff" : "#000",
                      colorIcon: darkMode ? "#fff" : "#000",
                      colorIconHover: darkMode ? "#fff" : "#000",
                    },
                  },
                }}
              >
                <div>
                  <div>
                    <InputLabel>{t("License release date")}</InputLabel>
                  </div>
                  <Controller
                    control={control}
                    name="ln_release_date"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        size="large"
                        className={darkMode ? "text-white" : ""}
                        placeholder=""
                        style={{ minWidth: "100%" }}
                      />
                    )}
                  />
                </div>
                <div>
                  <div>
                    <InputLabel>{t("License expiration date")}</InputLabel>
                  </div>

                  <Controller
                    control={control}
                    name="ln_expire_date"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        size="large"
                        className={darkMode ? "text-white" : ""}
                        placeholder=""
                        style={{ minWidth: "100%" }}
                      />
                    )}
                  />
                </div>
              </ConfigProvider>
            </div>

            {Array(Math.ceil(driverFields.length / 2))
              .fill(0)
              .map((_, i) => {
                const fieldNames = driverFields.slice(i * 2, i * 2 + 2);
                return (
                  <div className="flex justify-evenly" key={i}>
                    {fieldNames.map((fieldName) => {
                      const fieldConfig = fieldsConfig[fieldName];
                      if (!fieldConfig) return null;
                      return (
                        <TextField
                          key={fieldName}
                          id={`${fieldConfig.id}-input`}
                          label={
                            fieldConfig.name
                              ? t(fieldConfig.name) +
                                (fieldConfig.required ? "*" : "")
                              : null
                          }
                          variant={fieldConfig.variant as any}
                          style={fieldConfig.style}
                          error={errors[fieldConfig.id] ? true : false}
                          disabled={fieldConfig.disabled}
                          helperText={
                            errors[fieldConfig.id]
                              ? errors[fieldConfig.id].message
                              : t(fieldConfig.hint) || null
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
        )}
        {/* ======================== Driver information ========================*/}

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
                      label={
                        fieldConfig.name
                          ? t(fieldConfig.name) +
                            (fieldConfig.required ? "*" : "")
                          : null
                      }
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
                disabled={
                  !residenceSelectedCountry || residenceStates.length === 0
                }
              >
                {Array.isArray(residenceStates) &&
                  residenceStates.map((state) => (
                    <MenuItem key={state.name} value={state.name}>
                      {state.name}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
          <FormHelperText>
            {!residenceSelectedCountry && (
              <p className="">{t("Select country first")}</p>
            )}
            {residenceStates && residenceStates.length === 0 && (
              <p className="text-red-600">
                {t("There are no states for the selected country")}
              </p>
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
                      label={
                        fieldConfig.name
                          ? t(fieldConfig.name) +
                            (fieldConfig.required ? "*" : "")
                          : null
                      }
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

        {/* ======================== Correspondence Address ========================*/}
        <div className="text-center text-xl font-black mt-10">
          <Divider> {t("Correspondence Address")} </Divider>
        </div>
        <div className="text-center text-xl mt-10">
          {t("Same as residence")}{" "}
          <Switch
            checked={correspondenceAddressSameAsResidence}
            onChange={switchCorrespondenceAddress}
            color="success"
          />
        </div>

        {!correspondenceAddressSameAsResidence && (
          <div>
            {/* Correspondence country & state */}
            <div className="mb-5 mt-4 px-6">
              <InputLabel id="country-select">
                {t("Select country") + "*"}
              </InputLabel>
              <Controller
                name="correspondence_country"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="country-select"
                    id="correspondence_country"
                    label={t("Select country")}
                    sx={{ width: "100%" }}
                    error={Boolean(errors.correspondence_country)}
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
                {errors.correspondence_country && (
                  <p className="text-red-600">{t("Field is obliatory")}</p>
                )}
              </FormHelperText>
            </div>

            <div className="px-6">
              <InputLabel id="correspondence_state-select">
                {t("Select state") + "*"}
              </InputLabel>
              <Controller
                name="correspondence_state"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="correspondence_state-select"
                    id="correspondence_state"
                    label={t("Select state")}
                    sx={{ width: "100%" }}
                    error={Boolean(errors.correspondence_state)}
                    disabled={
                      !correspondenceSelectedCountry ||
                      correspondenceStates.length === 0
                    }
                  >
                    {Array.isArray(correspondenceStates) &&
                      correspondenceStates.map((state) => (
                        <MenuItem key={state.name} value={state.name}>
                          {state.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
              <FormHelperText>
                {!correspondenceSelectedCountry && (
                  <p className="">{t("Select country first")}</p>
                )}
                {correspondenceStates && correspondenceStates.length === 0 && (
                  <p className="text-red-600">
                    {t("There are no states for the selected country")}
                  </p>
                )}
              </FormHelperText>

              <FormHelperText>
                {errors.correspondence_state && (
                  <p className="text-red-600">{t("Field is obliatory")}</p>
                )}
              </FormHelperText>
            </div>

            {/* Correspondence country & state */}
            {Array(Math.ceil(correspondenceAddressFields.length / 2))
              .fill(0)
              .map((_, i) => {
                const fieldNames = correspondenceAddressFields.slice(
                  i * 2,
                  i * 2 + 2
                );
                return (
                  <div className="flex justify-evenly" key={i}>
                    {fieldNames.map((fieldName) => {
                      const fieldConfig = fieldsConfig[fieldName];
                      if (!fieldConfig) return null;
                      return (
                        <TextField
                          key={fieldName}
                          id={`${fieldConfig.id}-input`}
                          label={
                            fieldConfig.name
                              ? t(fieldConfig.name) +
                                (fieldConfig.required ? "*" : "")
                              : null
                          }
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
        )}
        {/* ======================== Correspondence Address ========================*/}

        {/* ======================== Registered Address ========================*/}
        <div className="text-center text-xl font-black mt-10">
          <Divider> {t("Registered Address")} </Divider>
        </div>
        <div className="text-center text-xl mt-10">
          {t("Same as residence")}{" "}
          <Switch
            checked={registeredAddressSameAsResidence}
            onChange={switchRegisteredAddress}
            color="success"
          />
        </div>
        {!registeredAddressSameAsResidence && (
          <div>
            {/* Registered country & state */}
            <div className="mb-5 mt-4 px-6">
              <InputLabel id="country-select">
                {t("Select country") + "*"}
              </InputLabel>
              <Controller
                name="registered_country"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="country-select"
                    id="registered_country"
                    label={t("Select country")}
                    sx={{ width: "100%" }}
                    error={Boolean(errors.registered_country)}
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
                {errors.registered_country && (
                  <p className="text-red-600">{t("Field is obliatory")}</p>
                )}
              </FormHelperText>
            </div>

            <div className="px-6">
              <InputLabel id="registered_state-select">
                {t("Select state") + "*"}
              </InputLabel>
              <Controller
                name="registered_state"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="registered_state-select"
                    id="registered_state"
                    label={t("Select state")}
                    sx={{ width: "100%" }}
                    error={Boolean(errors.registered_state)}
                    disabled={
                      !registeredSelectedCountry ||
                      registeredStates.length === 0
                    }
                  >
                    {Array.isArray(registeredStates) &&
                      registeredStates.map((state) => (
                        <MenuItem key={state.name} value={state.name}>
                          {state.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
              <FormHelperText>
                {!registeredSelectedCountry && (
                  <p className="">{t("Select country first")}</p>
                )}
                {registeredStates && registeredStates.length === 0 && (
                  <p className="text-red-600">
                    {t("There are no states for the selected country")}
                  </p>
                )}
              </FormHelperText>

              <FormHelperText>
                {errors.registered_state && (
                  <p className="text-red-600">{t("Field is obliatory")}</p>
                )}
              </FormHelperText>
            </div>

            {/* Registered country & state */}
            {Array(Math.ceil(registeredAddressFields.length / 2))
              .fill(0)
              .map((_, i) => {
                const fieldNames = registeredAddressFields.slice(
                  i * 2,
                  i * 2 + 2
                );
                return (
                  <div className="flex justify-evenly" key={i}>
                    {fieldNames.map((fieldName) => {
                      const fieldConfig = fieldsConfig[fieldName];
                      if (!fieldConfig) return null;
                      return (
                        <TextField
                          key={fieldName}
                          id={`${fieldConfig.id}-input`}
                          label={
                            fieldConfig.name
                              ? t(fieldConfig.name) +
                                (fieldConfig.required ? "*" : "")
                              : null
                          }
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
        )}

        {/* ======================== Registered Address ========================*/}


        <div className="my-4" align="center">
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
            type="submit"
            color="success"
            sx={{ width: "50%" }}
            disabled={!isValid}
          >
            {data ? t("Update") : t("Save")}
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default AddEditUserComponent;
