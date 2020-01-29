import React, { useContext, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Button
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import localeSelect from "../services/localeSelect";
import { linkFiltersToGame, filterLinked, linkFilters } from "../data/locales";
import dbLocale from "../services/dbLocale";
import { LanguageContext } from "../contexts/LanguageContext";
import { UserContext } from "../contexts/UserContext";
import { GameContext } from "../contexts/GameContext";
import { FilterContext } from "../contexts/FilterContext";

export default function LinkFilter() {
  const { language } = useContext(LanguageContext);
  const { user } = useContext(UserContext);
  const { games, loading, error, success, connectFilters } = useContext(
    GameContext
  );
  const { filters } = useContext(FilterContext);
  const [game, setGame] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <section className="link-filter">
      <Container maxWidth="sm">
        <Typography variant="h5">
          {localeSelect(language, linkFiltersToGame)}
        </Typography>
        {error && (
          <p className="error">
            <span>Error:</span> {error}
          </p>
        )}
        {success && <p>{localeSelect(language, filterLinked)}</p>}
        <Select
          options={games.map(game => {
            return {
              label: dbLocale(language, game),
              value: game._id
            };
          })}
          onChange={e => {
            setGame(e.value);
            const selected = [];
            const index = games.findIndex(x => x._id === e.value);
            games[index].filters.forEach(filter => {
              selected.push(filter._id);
            });
            setSelectedFilters(selected);
          }}
        />
      </Container>
      <Container maxWidth="md">
        {game !== "" && (
          <>
            <Grid container spacing={2}>
              {filters.map((filter, index) => {
                return (
                  <Grid item key={index} md={3} sm={4} xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={filter._id}
                          onChange={e => {
                            const index = selectedFilters.indexOf(
                              e.target.value
                            );
                            if (index === -1) {
                              selectedFilters.push(e.target.value);
                            } else {
                              selectedFilters.splice(index, 1);
                            }
                          }}
                          color="primary"
                          checked={selectedFilters.indexOf(filter._id) !== -1}
                        />
                      }
                      label={dbLocale(language, filter)}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={e => {
                e.preventDefault();
                connectFilters(game, selectedFilters);
              }}
            >
              {localeSelect(language, linkFilters)}
            </Button>
          </>
        )}
      </Container>
    </section>
  );
}

// class LinkFilter extends React.Component {
//   state = {
//     games: [],
//     game: "",
//     filters: [],
//     selected: [],
//     loading: false,
//     success: false,
//     error: null
//   };

//   pickGame = e => {
//     const game = e.value;
//     const index = this.state.games.findIndex(oneGame => oneGame._id === game);
//     const { filters } = this.state.games[index];
//     const selected = [];
//     filters.forEach(filter => {
//       selected.push(filter._id);
//     });
//     this.setState({
//       game,
//       selected
//     });
//   };

//   handleFilters = e => {
//     const filter = e.target.value;
//     const { selected } = this.state;
//     const index = selected.indexOf(filter);
//     if (index === -1) {
//       selected.push(filter);
//       this.setState({
//         selected
//       });
//     } else {
//       selected.splice(index, 1);
//       this.setState({
//         selected
//       });
//     }
//   };

//   linkFilters = async e => {
//     e.preventDefault();
//     this.setState({
//       loading: true,
//       error: null
//     });
//     const token = await getToken();
//     const { user } = this.props;
//     const { game, selected: filters } = this.state;
//     try {
//       const res = await axios.put(`/api/games/${game}/filter`, {
//         user,
//         token,
//         filters,
//         game
//       });
//       if (res) {
//         this.setState({
//           loading: false,
//           success: true
//         });
//       }
//     } catch (e) {
//       this.setState({
//         loading: false,
//         error: e.message
//       });
//     }
//   };

//   componentDidMount = async () => {
//     try {
//       const res = await axios.get("/api/games");
//       const games = res.data.data;
//       if (language === "ja") {
//         games.sort((x, y) => {
//           return x.name_ja.localeCompare(y.name_ja);
//         });
//       } else if (language === "ko") {
//         games.sort((x, y) => {
//           return x.name_ko.localeCompare(y.name_ko);
//         });
//       } else if (
//         language === "zh-CN" ||
//         language === "zh-TW" ||
//         language === "zh-HK"
//       ) {
//         games.sort((x, y) => {
//           return x["name_zh-cn"].localeCompare(y["name_zh-cn"]);
//         });
//       } else {
//         games.sort((x, y) => {
//           return x.name.localeCompare(y.name);
//         });
//       }
//       const res2 = await axios.get("/api/filters/game");
//       const filters = res2.data.data;
//       if (language === "ja") {
//         filters.sort((x, y) => {
//           return x.name_ja.localeCompare(y.name_ja);
//         });
//       } else if (language === "ko") {
//         filters.sort((x, y) => {
//           return x.name_ko.localeCompare(y.name_ko);
//         });
//       } else if (
//         language === "zh-CN" ||
//         language === "zh-TW" ||
//         language === "zh-HK"
//       ) {
//         filters.sort((x, y) => {
//           return x["name_zh-cn"].localeCompare(y["name_zh-cn"]);
//         });
//       } else {
//         filters.sort((x, y) => {
//           return x.name.localeCompare(y.name);
//         });
//       }
//       this.setState({
//         games,
//         filters
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   render() {
//     if (!this.props.user) {
//       return <Redirect to="/" />;
//     }
//     return (
//       <section className="link-filter">
//         <Container maxWidth="sm">
//           <Typography variant="h5">
//             {localeSelect(language, linkFiltersToGame)}
//           </Typography>
//           {this.state.success && (
//             <p>{localeSelect(language, filterLinked)}</p>
//           )}
//           <Select
//             options={this.state.games.map(game => {
//               return {
//                 label: dbLocale(language, game),
//                 value: game._id
//               };
//             })}
//             onChange={this.pickGame}
//           />
//         </Container>
//         <Container maxWidth="md">
//           {this.state.game !== "" && (
//             <>
//               <Grid container spacing={2}>
//                 {this.state.filters.map((filter, index) => {
//                   return (
//                     <Grid item key={index} md={3} sm={4} xs={6}>
//                       <FormControlLabel
//                         control={
//                           <Checkbox
//                             value={filter._id}
//                             onChange={this.handleFilters}
//                             color="primary"
//                             checked={
//                               this.state.selected.indexOf(filter._id) !== -1
//                             }
//                           />
//                         }
//                         label={dbLocale(language, filter)}
//                       />
//                     </Grid>
//                   );
//                 })}
//               </Grid>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={this.linkFilters}
//               >
//                 {localeSelect(language, linkFilters)}
//               </Button>
//             </>
//           )}
//         </Container>
//       </section>
//     );
//   }
// }

// export default LinkFilter;
