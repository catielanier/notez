import React, { useContext } from "react";
import Particles from "react-particles-js";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
import logo from "../assets/logo.png";

const useStyles = makeStyles(theme => ({
  buttonRow: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  }
}));

function Attract(props) {
  const classes = useStyles();
  const { language } = useContext(LanguageContext);
  return (
    <>
      <Particles
        params={{
          particles: {
            number: {
              value: 90
            },
            size: {
              value: 5
            }
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse"
              }
            }
          }
        }}
        className="particle"
      />
      <Container className="attract">
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <img className="main-logo" src={logo} alt="NoteZ" />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="h3" gutterBottom>
              {language === "ja"
                ? "ノートZへようこそ"
                : language === "ko"
                ? "노트Z에 환영합니다"
                : language === "zh-CN"
                ? "欢迎到笔记Z"
                : language === "zh-TW" || language === "zh-HK"
                ? "歡迎到筆記Z"
                : "Welcome to NoteZ"}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {language === "ja"
                ? "あなたのプレミア格闘ゲームノートアプリ！"
                : language === "ko"
                ? "최고의 격투 게임 노트 앱!"
                : language === "zh-CN"
                ? "你的首映格斗游戏笔记应用！"
                : language === "zh-TW"
                ? "你的首映格鬥遊戲筆記應用！"
                : language === "zh-HK"
                ? "你要首映格鬥遊戲碌士應用！"
                : "Your premiere fighting game note app!"}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {language === "ja"
                ? "プロのようにゲームを高めましょう！ 包括的な対戦メモを使用すると、常に知識を最大限に活用できます！ また、ノートZのような格闘ゲームノートに合わせて調整されたアプリはありません。"
                : language === "ko"
                ? "프로처럼 게임을 높입시다! 종합 대전 메모를 사용하면 항상 지식을 최대한 활용할 수 있습니다! 또한 노트Z와 같은 격투 게임 노트에 맞게 조정 된 응용 프로그램이 없습니다."
                : language === "zh-CN"
                ? "像专业人士一样增强你的游戏！ 借助全面的比赛记录，你始终可以充分利用自己的知识！ 此外，没有专门针对战斗笔记Z的应用。"
                : language === "zh-TW"
                ? "像專業人士一樣增強你的遊戲！借助全面的比賽記錄，你始終可以充分利用自己的知識！此外，沒有專門針對戰鬥筆記Z的應用。"
                : language === "zh-HK"
                ? "好似专业人士一样增强你嘅游戏！借助全面嘅比赛纪录，你始终可以充分利用自己嘅知识！此外，冇专门针对战斗筆記Z嘅应用。"
                : `Elevate your game like the pros! With comprehensive matchup notes, you'll always be on top of your knowledge! And no app on the planet is tailored to fighting game notes like NoteZ.`}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {language === "ja"
                ? "コンピューター、タブレット、または携帯電話でキャラクターとプレイヤーの両方の対戦相手についてメモを書き、どこにいてもアクセスできるようにします。 ノートZが自動的に行うので、新しい電話でメモを復元することを心配する必要はありません！ 一致して、対戦相手だけでなく、より特定の状況に合わせてノートをフィルターできるので、プレイ中に何をすべきかを常に思い出すことができます。"
                : language === "ko"
                ? "컴퓨터, 태블릿 또는 휴대 전화에서 캐릭터와 플레이어 모두 상대에 대해 메모를 쓰고 어디에서나 액세스 할 수 있도록합니다. 노트Z가 자동으로하기 때문에 새로운 전화 메모를 복원하는 것을 걱정할 필요가 없습니다! 일치하여 상대뿐만 아니라보다 구체적인 상황에 맞게 노트를 필터링 할 수 있으므로, 플레이 중에 무엇을해야 하는가를 항상 기억할 수 있습니다."
                : language === "zh-CN"
                ? "在计算机，平板电脑或手机上写下有关角色对手和玩家对手的注释，以便您随时随地都可以访问它们。 笔记Z自动执行此操作，因此您不必担心在新手机上恢复笔记！ 匹配并过滤音符以适应更具体的情况，而不仅仅是对手，因此您始终可以记住比赛中该做什么。"
                : language === "zh-TW"
                ? "在計算機，平板電腦或手機上寫下有關角色對手和玩家對手的註釋，以便您隨時隨地都可以訪問它們。筆記Z自動執行此操作，因此您不必擔心在新手機上恢復筆記！匹配並過濾音符以適應更具體的情況，而不僅僅是對手，因此您始終可以記住比賽中該做什麼。"
                : language === "zh-HK"
                ? "喺电脑，平板电脑或者手机上写下有关角色对手同玩家对手嘅注解嚟你随时随地都可以访问佢哋。筆記Z自动执行此用，就你唔使担心喺新手机上恢复碌士！匹配并隔音符以适应更具体嘅情况而不仅仅系对手，就你始终可以记住比赛中要做啲咩。"
                : `Write notes for both character and player matchups on your computer, tablet, or mobile phone, then have access to them wherever you are. No need to worry about restoring your notes on a new phone, as NoteZ will do it for you! In match, be able to filter down your notes to more specific circumstances than just your opponent, so that you'll always remember what to do as you play.`}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {language === "ja"
                ? "ノートZでゲームプレイを次のレベルに引き上げましょう！"
                : language === "ko"
                ? "노트Z로 게임 플레이를 다음 단계로 끌어 올려 보자!"
                : language === "zh-CN"
                ? "使用笔记Z将你的游戏玩法提升到新的水平！"
                : language === "zh-TW"
                ? "使用筆記Z將你的遊戲玩法提升到新的水平！"
                : language === "zh-HK"
                ? "使用筆記Z将你嘅游戏玩法提升到新嘅水平！"
                : "Take your game to the next level with NoteZ today!"}
            </Typography>
            <Container className={classes.buttonRow}>
              <Button
                variant="contained"
                color="primary"
                component={React.forwardRef((props, ref) => (
                  <RouterLink innerRef={ref} to="/login" {...props} />
                ))}
                className={classes.wrapper}
              >
                {language === "ja"
                  ? "既存のユーザー"
                  : language === "ko"
                  ? "기존 사용자"
                  : language === "zh-CN"
                  ? "现有用户"
                  : language === "zh-TW" || language === "zh-HK"
                  ? "現有用戶"
                  : "Existing users"}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.wrapper}
                component={React.forwardRef((props, ref) => (
                  <RouterLink innerRef={ref} to="/signup" {...props} />
                ))}
              >
                {language === "ja"
                  ? "新規ユーザー"
                  : language === "ko"
                  ? "신규 사용자"
                  : language === "zh-CN"
                  ? "新用户"
                  : language === "zh-TW" || language === "zh-HK"
                  ? "新用戶"
                  : "New users"}
              </Button>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Attract;
