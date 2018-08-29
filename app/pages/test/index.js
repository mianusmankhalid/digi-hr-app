import React, { Component } from "react";
import { View } from "react-native";
import NavigationHelper from "@digihr_lib/navigation/helper";
import PromisedVideo from "@digihr_lib/promised_video";

export default class TestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen_params: {
        fullscreen: false,
      },
      videoUrl: null,
    };
  }

  componentWillMount() {
    let new_params = { ...this.state.screen_params };
    new_params.headerTitle = 'Saada Khushbu';

    this.props.nav_helper.setScreenParams(new_params);
    this.setState({
      screen_params: new_params,
    });
  }

  // componentDidMount() {
  //   let videoInfo = Youtube.getVideoInfo('2MpUj-Aua48');
  //   videoInfo.then(youtubeInfo => {
  //     // console.dir(youtubeInfo);
  //     this.setState({
  //       videoUrl: youtubeInfo.getHighestQualityVideo().url,
  //     });
  //   });

  //   // getVideoUrl("2MpUj-Aua48").then(result => {
  //   //   console.log(result);
  //   //   this.setState({
  //   //     videoUrl: result[0]["url"]
  //   //   });
  //   // });

  //   // let url =
  //   //   "https://r3---sn-uphxqvujvh-30as.googlevideo.com/videoplayback?fvip=3&ms=au%2Crdu&source=youtube&mv=m&ip=202.190.129.63&key=yt6&lmt=1526052754247137&id=o-AME-xlslP9GtKskJXohhSL6toaOdEWnyZeAtS24Y9X4L&dur=5793.687&mm=31%2C29&mn=sn-uphxqvujvh-30as%2Csn-30a7ynee&gir=yes&itag=248&clen=1879371540&ei=c43-WtybO4GGz7sP8POZ4AM&pcm2=no&pl=21&mt=1526631700&c=WEB&initcwndbps=947500&mime=video%2Fwebm&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&signature=43A362308ADC749783D5AE41C93203D79CEA459B.11ABC1A68A917B0A143C1324DA9AA095DA279DE1&keepalive=yes&requiressl=yes&ipbits=0&sparams=aitags%2Cclen%2Cdur%2Cei%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Ckeepalive%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpcm2%2Cpl%2Crequiressl%2Csource%2Cexpire&expire=1526653396";
  //   // this.setState({
  //   //   videoUrl: url
  //   // });
  // }

  onFullScreen(status) {
    // Set the params to pass in fullscreen status to navigationOptions
    let new_params = { ...this.state.screen_params };
    new_params.fullscreen = status;

    this.props.nav_helper.setScreenParams(new_params);
    this.setState({
      screen_params: new_params,
    });
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: 'red',
          flex: 1,
          justifyContent: 'center',
        }}>
        <PromisedVideo url={'2MpUj-Aua48'} onFullScreen={this.onFullScreen.bind(this)} />
        {/* <Async
          promise={Youtube.getVideoInfo('2MpUj-Aua48')}
          then={youtubeInfo => (
            <View style={{ flex: 1 }}>
              <Video
                url={youtubeInfo.getHighestQualityVideo().url}
                placeholder={youtubeInfo.getHighestQualityImage().url}
                onFullScreen={status => this.onFullScreen(status)}
                rotateToFullScreen={true}
                lockPortraitOnFsExit={true}
              />
            </View>
          )}
          pending={
            <View>
              <ActivityIndicator size="large" color={theme.colors.darkGray} />
            </View>
          }
        /> */}
        {/* {this.state.videoUrl !== null ? (
          <Video
            url={this.state.videoUrl}
            onFullScreen={status => this.onFullScreen(status)}
            rotateToFullScreen={true}
            lockPortraitOnFsExit={true}
          />
        ) : null} */}
      </View>
    );
  }
}

TestScreen.navigationOptions = ({ navigation }) => {
  const { state } = navigation;

  const currentParams = NavigationHelper.getCurrentScreenParams(state);
  const header = currentParams && (currentParams.fullscreen ? null : 1);

  if (header === null) {
    return {
      header,
    };
  }

  return {
    headerTitle: currentParams.headerTitle,
  };
};
