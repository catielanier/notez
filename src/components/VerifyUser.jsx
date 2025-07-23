import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Typography, CircularProgress, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { verifyAccount } from "../api/userService";

export default function VerifyUser() {
  const { key } = useParams(); // grabs ":key" from /verify/:key
  const { t } = useTranslation();

  const {
    mutate: doVerify,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(() => verifyAccount({ key }));

  useEffect(() => {
    if (key) {
      doVerify();
    }
  }, [key, doVerify]);

  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
        <Typography>{t("account.verifying")}</Typography>
      </Container>
    );
  }

  if (isSuccess) {
    // automatically redirect to home on successful verification
    return <Navigate to="/" replace />;
  }

  if (isError) {
    return (
      <Container>
        <Typography color="error">{t("errors.noToken")}</Typography>
      </Container>
    );
  }

  // avoid rendering anything before mutate kicks off
  return null;
}
