import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Select from "react-select";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  spaced: {
    marginBottom: theme.spacing(2),
  },
}));

export default function QuickAddNote({ type, filters, onAdd, error }) {
  const { t } = useTranslation();
  const classes = useStyles();

  const [note, setNote] = useState("");
  const [filter, setFilter] = useState("");
  const [universal, setUniversal] = useState(false);

  const handleSubmit = () => {
    if (!note || !filter) return;
    onAdd({ filter, note, universal });
    setNote("");
    setFilter("");
    setUniversal(false);
  };

  return (
    <div className="quick-add">
      <Typography variant="h5" className={classes.spaced}>
        {t("notes.common.quickAdd")}
      </Typography>

      {error && (
        <Typography color="error" variant="body2" className={classes.spaced}>
          {error}
        </Typography>
      )}

      {type === "Game Note" && (
        <FormControlLabel
          className={classes.spaced}
          control={
            <Checkbox
              checked={universal}
              onChange={() => setUniversal((u) => !u)}
              color="primary"
            />
          }
          label={t("notes.common.universal")}
        />
      )}

      <Typography variant="h6" className={classes.spaced}>
        {t("notes.new.filter")}
      </Typography>
      <Select
        options={filters}
        value={filters.find((f) => f.value === filter) || null}
        onChange={(opt) => setFilter(opt?.value || "")}
        className={classes.spaced}
      />

      <Typography variant="h6" className={classes.spaced}>
        {t("notes.new.note")}
      </Typography>
      <TextField
        multiline
        fullWidth
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className={classes.spaced}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {t("notes.new.submit")}
      </Button>
    </div>
  );
}
