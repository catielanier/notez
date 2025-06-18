import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

import { NoteContext } from "../contexts/NoteContext";

const useStyles = makeStyles((theme) => ({
  spaced: {
    marginBottom: theme.spacing(2),
  },
}));

export default function QuickAddNote(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const { postNote, error } = useContext(NoteContext);

  /* local state */
  const [note, setNote] = useState("");
  const [filter, setFilter] = useState < string > "";
  const [universal, setUniversal] = useState(false);

  return (
    <div className="quick-add">
      <Typography variant="h5" className={classes.spaced}>
        {t("notes.common.quickAdd")}
      </Typography>

      {error && (
        <Typography color="error" variant="body2">
          {`Error: ${error}`}
        </Typography>
      )}

      {/* Game-note–only “universal” checkbox */}
      {props.type === "Game Note" && (
        <FormControlLabel
          control={
            <Checkbox
              checked={universal}
              onChange={() => setUniversal((u) => !u)}
              color="primary"
            />
          }
          label={t("notes.common.universal")}
          className={classes.spaced}
        />
      )}

      <Typography variant="h6">{t("notes.new.filter")}</Typography>
      <Select
        options={props.filters.map((f) => ({
          label: f.name,
          value: f.id,
        }))}
        onChange={(opt) => setFilter(opt ? opt.value : "")}
        className={classes.spaced}
      />

      <Typography variant="h6">{t("notes.new.note")}</Typography>
      <TextField
        multiline
        fullWidth
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className={classes.spaced}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (!note || !filter) return;

          if (props.type === "Game Note") {
            postNote(
              "Game Note",
              props.game,
              props.opponentCharacter,
              filter,
              note,
              props.myCharacter,
              universal
            );
          } else {
            postNote("Player Note", props.game, props.player, filter, note);
          }

          // optional: clear local state after successful post
          setNote("");
          setFilter("");
          if (props.type === "Game Note") setUniversal(false);
        }}
      >
        {t("notes.new.submit")}
      </Button>
    </div>
  );
}
