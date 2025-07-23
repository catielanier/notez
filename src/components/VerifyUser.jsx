// src/components/VerifyUser.jsx
import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Container, Typography, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth";

export default function VerifyUser() {
  const { key } = useParams(); // grabs ":key" from /verify/:key
  const { t } = useTranslation();
  const { verifyAccount, verifyLoading, verifyError } = useAuth();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (key) {
      verifyAccount({ key }, { onSuccess: () => setSuccess(true) });
    }
  }, [key, verifyAccount]);

  if (verifyLoading) {
    return (
      <Container>
        <CircularProgress />
        <Typography>{t("account.verifying")}</Typography>
      </Container>
    );
  }

  if (success) {
    return <Navigate to="/" replace />;
  }

  if (verifyError) {
    return (
      <Container>
        <Typography color="error">{t("errors.noToken")}</Typography>
      </Container>
    );
  }

  return null;
}
