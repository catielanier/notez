import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { ExitToApp, PersonAdd, Face, Gamepad } from "@material-ui/icons";

export default function MobileMenu(props) {
  return (
    <Drawer open={props.menu} onClose={props.showMenu}>
      <List>
        {!props.user && (
          <>
            <ListItem button>
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
            <ListItem button>
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
            <ListItem button>
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
            <ListItem button>
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
                <ListItem button>
                  <ListItemText>Add Game</ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemText>Add Character</ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemText>Add Filter</ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemText>Link Characters</ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemText>Link Filters</ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemText>User Settings</ListItemText>
                </ListItem>
              </>
            )}
            <ListItem button>
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
