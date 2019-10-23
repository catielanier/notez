import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Link
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.language === "ja"
              ? "ノートZ"
              : props.language === "ko"
              ? "노트Z"
              : props.language === "zh-CN"
              ? "笔记Z"
              : props.language === "zh-TW" || props.language === "zh-HK"
              ? "筆記Z"
              : "NoteZ"}
          </Typography>
          {!props.user && (
            <>
              <Button
                component={React.forwardRef((props, ref) => (
                  <RouterLink innerRef={ref} to="/login" {...props} />
                ))}
                color="inherit"
              >
                {props.language === "ja"
                  ? "ログイン"
                  : props.language === "ko"
                  ? "로그인"
                  : props.language === "zh-CN"
                  ? "登录"
                  : props.language === "zh-TW" || props.language === "zh-HK"
                  ? "登錄"
                  : "Login"}
              </Button>
              <Button
                component={React.forwardRef((props, ref) => (
                  <RouterLink innerRef={ref} to="/signup" {...props} />
                ))}
                color="inherit"
              >
                {props.language === "ja"
                  ? "サインアップ"
                  : props.language === "ko"
                  ? "가입하기"
                  : props.language === "zh-CN"
                  ? "注册"
                  : props.language === "zh-TW" || props.language === "zh-HK"
                  ? "註冊"
                  : "Signup"}
              </Button>
            </>
          )}
          {props.user && (
            <>
              <Button
                component={React.forwardRef((props, ref) => (
                  <RouterLink innerRef={ref} to="/" {...props} />
                ))}
                color="inherit"
              >
                {props.language === "ja"
                  ? "ゲームノート"
                  : props.language === "ko"
                  ? "게임 노트"
                  : props.language === "zh-CN"
                  ? "游戏笔记"
                  : props.language === "zh-HK" || props.language === "zh-TW"
                  ? "遊戲筆記"
                  : "Game Notes"}
              </Button>
              <Button
                component={React.forwardRef((props, ref) => (
                  <RouterLink innerRef={ref} to="/player" {...props} />
                ))}
                color="inherit"
              >
                {props.language === "ja"
                  ? "プレイヤーノート"
                  : props.language === "ko"
                  ? "플레이어 노트"
                  : props.language === "zh-CN"
                  ? "玩家笔记"
                  : props.language === "zh-TW" || props.language === "zh-HK"
                  ? "玩家筆記"
                  : "Player Notes"}
              </Button>
              {props.role === "Admin" && (
                <>
                  <Button onClick={handleClick} color="inherit">
                    {props.language === "ja"
                      ? "設定"
                      : props.language === "ko"
                      ? "설정"
                      : props.language === "zh-CN"
                      ? "设定值"
                      : props.language === "zh-TW"
                      ? "設定值"
                      : props.language === "zh-HK"
                      ? "設定值"
                      : "Settings"}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <Link
                      component={React.forwardRef((props, ref) => (
                        <RouterLink innerRef={ref} to="/add-game" {...props} />
                      ))}
                    >
                      <MenuItem onClick={handleClose}>Add Games</MenuItem>
                    </Link>
                    <Link
                      component={React.forwardRef((props, ref) => (
                        <RouterLink
                          innerRef={ref}
                          to="/add-character"
                          {...props}
                        />
                      ))}
                    >
                      <MenuItem onClick={handleClose}>Add Characters</MenuItem>
                    </Link>
                    <Link
                      component={React.forwardRef((props, ref) => (
                        <RouterLink
                          innerRef={ref}
                          to="/add-filter"
                          {...props}
                        />
                      ))}
                    >
                      <MenuItem onClick={handleClose}>Add Filters</MenuItem>
                    </Link>
                    <Link
                      component={React.forwardRef((props, ref) => (
                        <RouterLink
                          innerRef={ref}
                          to="/link-character"
                          {...props}
                        />
                      ))}
                    >
                      <MenuItem onClick={handleClose}>Link Characters</MenuItem>
                    </Link>
                    <Link
                      component={React.forwardRef((props, ref) => (
                        <RouterLink
                          innerRef={ref}
                          to="/link-filter"
                          {...props}
                        />
                      ))}
                    >
                      <MenuItem onClick={handleClose}>Link Filters</MenuItem>
                    </Link>
                    <Link
                      component={React.forwardRef((props, ref) => (
                        <RouterLink
                          innerRef={ref}
                          to="/user-settings"
                          {...props}
                        />
                      ))}
                    >
                      <MenuItem onClick={handleClose}>User Settings</MenuItem>
                    </Link>
                  </Menu>
                </>
              )}
              <Button color="inherit" onClick={props.logout}>
                {props.language === "ja"
                  ? "ログアウト"
                  : props.language === "ko"
                  ? "로그아웃"
                  : props.language === "zh-CN"
                  ? "登出"
                  : props.language === "zh-HK" || props.language === "zh-TW"
                  ? "登出"
                  : "Logout"}
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
