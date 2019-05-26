import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Animated,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ImageBackground
} from 'react-native';

import { USER, FACEBOOK_LIST, SLACK_LIST, GENERIC_LIST, SCREEN_WIDTH, SCREEN_HEIGHT, DEFAULT_WINDOW_MULTIPLIER, DEFAULT_NAVBAR_HEIGHT } from './constants';

import LinearGradient from 'react-native-linear-gradient';
import GambiarraTirarFundoDegrade from "../../../src/components/GambiarraTirarFundoDegrade";
import { primaryColor, secondaryColor } from "../../../src/theme/Contants.js";

const ScrollViewPropTypes = ScrollView.propTypes;

export default class ParallaxScrollView extends Component {
    constructor() {
        super();

        this.state = {
            scrollY: new Animated.Value(0)
        };
    }

    renderBackground() {
        var { windowHeight, backgroundSource } = this.props;
        var { scrollY } = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }

        return (
            <Animated.Image
                style={[
                    styles.background,
                    {
                        height: windowHeight,
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [-windowHeight, 0, windowHeight],
                                    outputRange: [windowHeight / 2, 0, -windowHeight / 3]
                                })
                            },
                            {
                                scale: scrollY.interpolate({
                                    inputRange: [-windowHeight, 0, windowHeight],
                                    outputRange: [2, 1, 1]
                                })
                            }
                        ]
                    }
                ]}
                source={backgroundSource}
            >
            </Animated.Image>
        );
    }

    renderHeaderView() {
        var { windowHeight, backgroundSource, userImage, userName, userTitle } = this.props;
        var { scrollY } = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }

        const newWindowHeight = windowHeight - DEFAULT_NAVBAR_HEIGHT;

        return (
            <Animated.View
                style={{
                    opacity: scrollY.interpolate({
                        inputRange: [-windowHeight, 0, windowHeight * DEFAULT_WINDOW_MULTIPLIER + DEFAULT_NAVBAR_HEIGHT],
                        outputRange: [1, 1, 0]
                    })
                }}
            >
              <View style={{height: newWindowHeight, justifyContent: 'center', alignItems: 'center'}}>
                  {this.props.headerView ||
                  (
                      <View>
                        <View
                            style={styles.avatarView}
                        >
                          <Image source={{uri: userImage || USER.image}} style={{height: 120, width: 120, borderRadius: 60}} />
                        </View>
                        <View style={{paddingVertical: 10}}>
                          <Text style={{textAlign: 'center', fontSize: 22, color: 'white', paddingBottom: 5}}>{userName || USER.name}</Text>
                          <Text style={{textAlign: 'center', fontSize: 17, color: 'rgba(247,247, 250, 1)', paddingBottom: 5}}>{userTitle || USER.title}</Text>
                        </View>
                      </View>
                  )
                  }
              </View>
            </Animated.View>
        );
    }

    renderNavBarTitle() {
        var { windowHeight, backgroundSource, navBarTitleColor } = this.props;
        var { scrollY } = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }

        return (
            <Animated.View
                style={{
                    opacity: scrollY.interpolate({
                        inputRange: [-windowHeight, windowHeight * DEFAULT_WINDOW_MULTIPLIER, windowHeight * 0.8],
                        outputRange: [0, 0, 1]
                    })
                }}
            >
              <Text style={{ fontSize: 18, fontWeight: '600', color: navBarTitleColor || 'white' }}>
                  {this.props.navBarTitle || USER.name}
              </Text>
            </Animated.View>
        );
    }

    rendernavBar() {
        var {
            windowHeight, backgroundSource, leftIcon,
            rightIcon, leftIconOnPress, rightIconOnPress, navBarColor
        } = this.props;
        var { scrollY } = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }

        return (
            <Animated.View
                style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    height: DEFAULT_NAVBAR_HEIGHT,
                    width: SCREEN_WIDTH,
                    flexDirection: 'row',
                    backgroundColor: scrollY.interpolate({
                        inputRange: [-windowHeight, windowHeight * DEFAULT_WINDOW_MULTIPLIER, windowHeight * 0.8],
                        outputRange: ['transparent', 'transparent', navBarColor || 'rgba(0, 0, 0, 1.0)']
                    })
                }}
            >
                {<View
                    style={{
                        flex: 1,
                        marginTop: 20,
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}
                >
                  <TouchableOpacity
                      style={styles.iconWrapper}
                      onPress={this.props.leftIconOnPress}
                  >
                    <Image
                        source={this.props.leftIcon}
                        style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
                }
              <View
                  style={{
                      flex: 5,
                      marginTop: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center'
                  }}
              >
                  {this.renderNavBarTitle()}
              </View>
                {<View
                    style={{
                        flex: 1,
                        marginTop: 20,
                        justifyContent: 'center',
                        alignItems: 'flex-end'
                    }}
                >
                  <TouchableOpacity
                      style={styles.iconWrapper}
                      onPress={this.props.rightIconOnPress}
                  >
                    <Image
                        source={this.props.rightIcon}
                        style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
                }
            </Animated.View>
        );
    }

    renderTodoListContent() {
        return (
            <View style={styles.listView}>
              <List>
                  {
                      FACEBOOK_LIST.map((item, index) => (
                          <ListItem
                              key={index}
                              onPress={() => console.log('List item pressed')}
                              title={item.title}
                              leftIcon={{name: item.icon}} />
                      ))
                  }
              </List>
              <List>
                  {
                      SLACK_LIST.map((item, index) => (
                          <ListItem
                              key={index}
                              onPress={() => console.log('List item pressed')}
                              title={item.title}
                              leftIcon={{name: item.icon}} />
                      ))
                  }
              </List>
              <List>
                  {
                      GENERIC_LIST.map((item, index) => (
                          <ListItem
                              key={index}
                              onPress={() => console.log('List item pressed')}
                              title={item.title}
                              leftIcon={{name: item.icon}} />
                      ))
                  }
              </List>
              <List containerStyle={{marginBottom: 15}}>
                <ListItem
                    key={1}
                    hideChevron={true}
                    onPress={() => console.log('Logout Pressed')}
                    title='LOGOUT'
                    titleStyle={styles.logoutText}
                    icon={{name: ''}} />
              </List>
            </View>
        );
    }

    render() {
        var { style, ...props } = this.props;

        return (
            <LinearGradient
                colors={[primaryColor, secondaryColor]}
                style={{flex: 1, minHeight: '100%', minWidth: '100%',zIndex: 0}}
                start={{x: 0, y: 0}}
                end={{x: 1.2, y: 0.3}}
            >
              <View style={[styles.container, style]}>
                  {/*{this.renderBackground()}*/}
                  {this.rendernavBar()}
                <ScrollView
                    ref={component => {
                        this._scrollView = component;
                    }}contentContainerStyle={styles.scrollViewContent}
                    onScroll={Animated.event([
                        { nativeEvent
                    {...props}
                    style={styles.scrollView}
                    : { contentOffset: { y: this.state.scrollY } } }
                    ])}
                    scrollEventThrottle={16}
                >
                    {this.renderHeaderView()}
                  <View style={[styles.content, props.scrollableViewStyle]}>
                      {this.props.children}
                  </View>
                </ScrollView>
              </View>
              <GambiarraTirarFundoDegrade/>
            </LinearGradient>
        );
    }
}

ParallaxScrollView.defaultProps = {
    backgroundSource: {uri: 'http://i.imgur.com/6Iej2c3.png'},
    windowHeight: SCREEN_HEIGHT * DEFAULT_WINDOW_MULTIPLIER,
    leftIconOnPress: () => console.log('Left icon pressed'),
    rightIconOnPress: () => console.log('Right icon pressed')
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: 'transparent'
    },
    scrollView: {
        backgroundColor: 'transparent'
    },
    background: {
        position: 'absolute',
        backgroundColor: 'transparent',
        width: SCREEN_WIDTH,
        resizeMode: 'cover'
    },
    content: {
        flex: 1,
        height: '100%',
        flexDirection: 'column'
    },
    scrollViewContent: {
        minHeight: SCREEN_HEIGHT + 30
    },
    headerView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    listView: {
        backgroundColor: 'rgba(247,247, 250, 1)'
    },
    logoutText: {
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    icon: {
        resizeMode: 'contain',
        height: 20,
        width: 20,
    },
});
