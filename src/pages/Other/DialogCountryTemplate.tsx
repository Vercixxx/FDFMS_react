import * as React from "react";

import { useDispatch } from "react-redux";
import {
  closeDrawer,
  startLoading,
  stopLoading,
} from "../../store/drawerSlice";

import { useForm } from "react-hook-form";

import { AddCountry } from "../../scripts/countries";

// Snackbars
import { useSnackbarContext } from "./../../components/SnackbarContext";

// i18n
import { useTranslation } from "react-i18next";

// Mui

import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

interface DialogCountryTemplateProps {
  refreshComponent: boolean;
  setRefreshComponent: (value: boolean) => void;
  data?: any;
}

const DialogCountryTemplate: React.FC<DialogCountryTemplateProps> = ({
  refreshComponent,
  setRefreshComponent,
  data,
}) => {
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

      const response = await AddCountry(data.countryName);
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

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      countryName: "",
    },
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          addNewState(data);
        })}
      >
        {/* Name */}

        <TextField
          id="state-input"
          label={t("Country") + "*"}
          variant="outlined"
          sx={{ width: "100%", marginTop: "2rem" }}
          error={errors.countryName ? true : false}
          helperText={errors.countryName ? t("Field is obliatory") : ""}
          {...register("countryName", { required: true, maxLength: 56 })}
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
            {t("Save")}
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default DialogCountryTemplate;
