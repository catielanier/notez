import React, { useContext } from "react";
import { Typography } from "@material-ui/core";
import { LanguageContext } from "../contexts/LanguageContext";

export default function GameNotesSearch() {
  const { language } = useContext(LanguageContext);
  return <Typography variant="h6">Game Note Search</Typography>;
}
