import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import {
  ExitToApp,
  PersonAdd,
  Face,
  Gamepad,
  Add,
  Link as LinkIcon,
  Settings,
  Person,
  Edit
} from "@material-ui/icons";

export default function MobileMenu(props) {
  return (
    <Drawer open={props.menu} onClose={props.showMenu}>
      <List>
        {!props.user && (
          <>
            <ListItem
              button
              component={React.forwardRef((props, ref) => (
                <RouterLink innerRef={ref} to="/login" {...props} />
              ))}
            >
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText>
                {props.language === "ja"
                  ? "ログイン"
                  : props.language === "ko"
                  ? "로그인"
                  : props.language === "zh-CN"
                  ? "登录"
                  : props.language === "zh-TW" || props.language === "zh-HK"
                  ? "登錄"
                  : "Login"}
              </ListItemText>
            </ListItem>
            <ListItem
              button
              component={React.forwardRef((props, ref) => (
                <RouterLink innerRef={ref} to="/signup" {...props} />
              ))}
            >
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText>
                {props.language === "ja"
                  ? "サインアップ"
                  : props.language === "ko"
                  ? "가입하기"
                  : props.language === "zh-CN"
                  ? "注册"
                  : props.language === "zh-TW" || props.language === "zh-HK"
                  ? "註冊"
                  : "Signup"}
              </ListItemText>
            </ListItem>
          </>
        )}
        {props.user && (
          <>
            <ListItem
              button
              component={React.forwardRef((props, ref) => (
                <RouterLink innerRef={ref} to="/" {...props} />
              ))}
            >
              <ListItemIcon>
                <Gamepad />
              </ListItemIcon>
              <ListItemText>
                {props.language === "ja"
                  ? "ゲームノート"
                  : props.language === "ko"
                  ? "게임 노트"
                  : props.language === "zh-CN"
                  ? "游戏笔记"
                  : props.language === "zh-HK" || props.language === "zh-TW"
                  ? "遊戲筆記"
                  : "Game Notes"}
              </ListItemText>
            </ListItem>
            <ListItem
              button
              component={React.forwardRef((props, ref) => (
                <RouterLink innerRef={ref} to="/player" {...props} />
              ))}
            >
              <ListItemIcon>
                <Face />
              </ListItemIcon>
              <ListItemText>
                {props.language === "ja"
                  ? "プレイヤーノート"
                  : props.language === "ko"
                  ? "플레이어 노트"
                  : props.language === "zh-CN"
                  ? "玩家笔记"
                  : props.language === "zh-TW" || props.language === "zh-HK"
                  ? "玩家筆記"
                  : "Player Notes"}
              </ListItemText>
            </ListItem>
            {props.role === "Admin" && (
              <>
                <ListItem
                  button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink innerRef={ref} to="/add-game" {...props} />
                  ))}
                >
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText>
                    {props.language === "ja"
                      ? "ゲームを追加"
                      : props.language === "ko"
                      ? "게임 추가"
                      : props.language === "zh-CN"
                      ? "新增游戏"
                      : props.language === "zh-TW" || props.language === "zh-HK"
                      ? "新增遊戲"
                      : "Add Game"}
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink innerRef={ref} to="/add-character" {...props} />
                  ))}
                >
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText>
                    {props.language === "ja"
                      ? "キャラクターを追加"
                      : props.language === "ko"
                      ? "캐릭터 추가"
                      : props.language === "zh-CN"
                      ? "新增角色"
                      : props.language === "zh-TW" || props.language === "zh-HK"
                      ? "新增角色"
                      : "Add Character"}
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink innerRef={ref} to="/add-filter" {...props} />
                  ))}
                >
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText>
                    {props.language === "ja"
                      ? "フィルターを追加"
                      : props.language === "ko"
                      ? "필터 추가"
                      : props.language === "zh-CN"
                      ? "新增过滤器"
                      : props.language === "zh-TW" || props.language === "zh-HK"
                      ? "新增過濾器"
                      : "Add Filter"}
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink innerRef={ref} to="/edit-game" {...props} />
                  ))}
                >
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText>
                    {props.language === "ja"
                      ? "ゲームを編集"
                      : props.language === "ko"
                      ? "게임 편집"
                      : props.language === "zh-CN"
                      ? "编辑游戏"
                      : props.language === "zh-TW" || props.language === "zh-HK"
                      ? "編輯遊戲"
                      : "Edit Game"}
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink
                      innerRef={ref}
                      to="/edit-character"
                      {...props}
                    />
                  ))}
                >
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText>
                    {props.language === "ja"
                      ? "キャラクターを編集"
                      : props.language === "ko"
                      ? "캐릭터 편집"
                      : props.language === "zh-CN"
                      ? "编辑角色"
                      : props.language === "zh-TW" || props.language === "zh-HK"
                      ? "編輯角色"
                      : "Edit Character"}
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink innerRef={ref} to="/edit-filter" {...props} />
                  ))}
                >
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText>
                    {props.language === "ja"
                      ? "フィルターを編集"
                      : props.language === "ko"
                      ? "필터 편집"
                      : props.language === "zh-CN"
                      ? "编辑过滤器"
                      : props.language === "zh-TW" || props.language === "zh-HK"
                      ? "編輯過濾器"
                      : "Edit Filter"}
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink
                      innerRef={ref}
                      to="/link-character"
                      {...props}
                    />
                  ))}
                >
                  <ListItemIcon>
                    <LinkIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {props.language === "ja"
                      ? "キャラクターを接続"
                      : props.language === "ko"
                      ? "캐릭터를 연결"
                      : props.language === "zh-CN"
                      ? "连接角色"
                      : props.language === "zh-TW" || props.language === "zh-HK"
                      ? "連接角色"
                      : "Link Characters"}
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink innerRef={ref} to="/link-filter" {...props} />
                  ))}
                >
                  <ListItemIcon>
                    <LinkIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {props.language === "ja"
                      ? "フィルターを接続"
                      : props.language === "ko"
                      ? "필터를 연결"
                      : props.language === "zh-CN"
                      ? "连接过滤器"
                      : props.language === "zh-TW" || props.language === "zh-HK"
                      ? "連接過濾器"
                      : "Link Filters"}
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink innerRef={ref} to="/user-settings" {...props} />
                  ))}
                >
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText>
                    {props.language === "ja"
                      ? "ユーザー設定"
                      : props.language === "ko"
                      ? "사용자 설정"
                      : props.language === "zh-CN"
                      ? "用户设置"
                      : props.language === "zh-TW" || props.language === "zh-HK"
                      ? "用戶設置"
                      : "User Settings"}
                  </ListItemText>
                </ListItem>
              </>
            )}
            <ListItem
              button
              component={React.forwardRef((props, ref) => (
                <RouterLink innerRef={ref} to="/profile" {...props} />
              ))}
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText>
                {props.language === "ja"
                  ? "プロフィール"
                  : props.language === "ko"
                  ? "프로필"
                  : props.language === "zh-CN"
                  ? "个人资料"
                  : props.language === "zh-TW" || props.language === "zh-HK"
                  ? "個人資料"
                  : "Profile"}
              </ListItemText>
            </ListItem>
            <ListItem button onClick={props.logout}>
              <ListItemText>
                {props.language === "ja"
                  ? "ログアウト"
                  : props.language === "ko"
                  ? "로그아웃"
                  : props.language === "zh-CN"
                  ? "登出"
                  : props.language === "zh-HK" || props.language === "zh-TW"
                  ? "登出"
                  : "Logout"}
              </ListItemText>
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
}
