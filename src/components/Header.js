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
  Link,
  Hidden
} from "@material-ui/core";
import { title } from "../data/locales";
import localeSelect from "../services/localeSelect";
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
    <div className={(classes.root, "header")}>
      <AppBar position="static">
        <Toolbar>
          <Hidden smUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              className={classes.menuButton}
              onClick={props.showMenu}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" className={classes.title}>
            {localeSelect(props.language, title)}
          </Typography>
          {!props.user && (
            <Hidden xsDown>
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
            </Hidden>
          )}
          {props.user && (
            <Hidden xsDown>
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
                      <MenuItem onClick={handleClose}>
                        {props.language === "ja"
                          ? "ゲームを追加"
                          : props.language === "ko"
                          ? "게임 추가"
                          : props.language === "zh-CN"
                          ? "新增游戏"
                          : props.language === "zh-TW" ||
                            props.language === "zh-HK"
                          ? "新增遊戲"
                          : "Add Game"}
                      </MenuItem>
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
                      <MenuItem onClick={handleClose}>
                        {props.language === "ja"
                          ? "キャラクターを追加"
                          : props.language === "ko"
                          ? "캐릭터 추가"
                          : props.language === "zh-CN"
                          ? "新增角色"
                          : props.language === "zh-TW" ||
                            props.language === "zh-HK"
                          ? "新增角色"
                          : "Add Character"}
                      </MenuItem>
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
                      <MenuItem onClick={handleClose}>
                        {props.language === "ja"
                          ? "フィルターを追加"
                          : props.language === "ko"
                          ? "필터 추가"
                          : props.language === "zh-CN"
                          ? "新增过滤器"
                          : props.language === "zh-TW" ||
                            props.language === "zh-HK"
                          ? "新增過濾器"
                          : "Add Filter"}
                      </MenuItem>
                    </Link>
                    <Link
                      component={React.forwardRef((props, ref) => (
                        <RouterLink innerRef={ref} to="/edit-game" {...props} />
                      ))}
                    >
                      <MenuItem onClick={handleClose}>
                        {props.language === "ja"
                          ? "ゲームを編集"
                          : props.language === "ko"
                          ? "게임 편집"
                          : props.language === "zh-CN"
                          ? "编辑游戏"
                          : props.language === "zh-TW" ||
                            props.language === "zh-HK"
                          ? "編輯遊戲"
                          : "Edit Game"}
                      </MenuItem>
                    </Link>
                    <Link
                      component={React.forwardRef((props, ref) => (
                        <RouterLink
                          innerRef={ref}
                          to="/edit-character"
                          {...props}
                        />
                      ))}
                    >
                      <MenuItem onClick={handleClose}>
                        {props.language === "ja"
                          ? "キャラクターを編集"
                          : props.language === "ko"
                          ? "캐릭터 편집"
                          : props.language === "zh-CN"
                          ? "编辑角色"
                          : props.language === "zh-TW" ||
                            props.language === "zh-HK"
                          ? "編輯角色"
                          : "Edit Character"}
                      </MenuItem>
                    </Link>
                    <Link
                      component={React.forwardRef((props, ref) => (
                        <RouterLink
                          innerRef={ref}
                          to="/edit-filter"
                          {...props}
                        />
                      ))}
                    >
                      <MenuItem onClick={handleClose}>
                        {props.language === "ja"
                          ? "フィルターを編集"
                          : props.language === "ko"
                          ? "필터 편집"
                          : props.language === "zh-CN"
                          ? "编辑过滤器"
                          : props.language === "zh-TW" ||
                            props.language === "zh-HK"
                          ? "編輯過濾器"
                          : "Edit Filter"}
                      </MenuItem>
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
                      <MenuItem onClick={handleClose}>
                        {props.language === "ja"
                          ? "キャラクターを接続"
                          : props.language === "ko"
                          ? "캐릭터를 연결"
                          : props.language === "zh-CN"
                          ? "连接角色"
                          : props.language === "zh-TW" ||
                            props.language === "zh-HK"
                          ? "連接角色"
                          : "Link Characters"}
                      </MenuItem>
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
                      <MenuItem onClick={handleClose}>
                        {props.language === "ja"
                          ? "フィルターを接続"
                          : props.language === "ko"
                          ? "필터를 연결"
                          : props.language === "zh-CN"
                          ? "连接过滤器"
                          : props.language === "zh-TW" ||
                            props.language === "zh-HK"
                          ? "連接過濾器"
                          : "Link Filters"}
                      </MenuItem>
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
                      <MenuItem onClick={handleClose}>
                        {props.language === "ja"
                          ? "ユーザー設定"
                          : props.language === "ko"
                          ? "사용자 설정"
                          : props.language === "zh-CN"
                          ? "用户设置"
                          : props.language === "zh-TW" ||
                            props.language === "zh-HK"
                          ? "用戶設置"
                          : "User Settings"}
                      </MenuItem>
                    </Link>
                  </Menu>
                </>
              )}
              <Button
                color="inherit"
                component={React.forwardRef((props, ref) => (
                  <RouterLink innerRef={ref} to="/profile" {...props} />
                ))}
              >
                {props.language === "ja"
                  ? "プロフィール"
                  : props.language === "ko"
                  ? "프로필"
                  : props.language === "zh-CN"
                  ? "个人资料"
                  : props.language === "zh-TW" || props.language === "zh-HK"
                  ? "個人資料"
                  : "Profile"}
              </Button>
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
            </Hidden>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
