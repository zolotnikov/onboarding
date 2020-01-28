import React, { useRef, useState } from "react";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { TouchableOpacity, StyleSheet, View, Platform } from "react-native";
import styled from "styled-components";
import { Pages } from "react-native-pages";
import Page from "./Page";
import { connect } from "react-redux";

function mapStateToProps(state) {
    return { action: state.action, textY: state.textY };
}

const Onboarding = props => {
    const pageRef = useRef(null);
    const onNextPress = () => {
        pageRef.current.scrollToPage(pageRef.current.activeIndex + 1);
    };
    const onSkipPress = () => {
        pageRef.current.scrollToPage(0);
    };

    const pageCount = pages.length;

    const [isLast, setLast] = useState(false);
    const onScrollEnd = () => {
        if (pageRef.current.activeIndex === pageCount - 1) {
            setLast(true);
        } else {
            setLast(false);
        }
    };

    return (
        <Container style={styles.AndroidSafeArea}>
            <Pages
                indicatorColor="#27ae60"
                ref={pageRef}
                onScrollEnd={onScrollEnd}
            >
                {pages.map((p, i) => {
                    return (
                        <Page
                            key={i}
                            image={p.image}
                            coverImage={p.coverImage}
                            title={p.title}
                            text={p.text}
                        ></Page>
                    );
                })}
            </Pages>
            <Text style={{ top: props.textY + 40 }}>WHAT’S NEW</Text>
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    onPress={onSkipPress}
                    style={{
                        flex: 1,
                        paddingLeft: 15
                    }}
                >
                    <SkipButton> {isLast ? "" : "Skip"} </SkipButton>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={isLast ? onSkipPress : onNextPress}
                    style={{
                        flex: 2,
                        paddingRight: 15
                    }}
                >
                    <NextButton> {isLast ? "Get started" : "Next"} </NextButton>
                </TouchableOpacity>
            </View>
            <View style={styles.shadow} />
        </Container>
    );
};

export default connect(mapStateToProps)(Onboarding);

const styles = StyleSheet.create({
    bottomBar: {
        position: "absolute",
        bottom: getBottomSpace(),
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
        alignSelf: "flex-end",
        height: 50
    },
    shadow: {
        alignSelf: "center",
        zIndex: -1,
        backgroundColor: "#fff",
        position: "absolute",
        height: 50 + getBottomSpace(),
        bottom: 0,
        width: "100%",
        shadowColor: "#E9EDF0",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.8,
        shadowRadius: 20
    },
    AndroidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? 25 : 0
    }
});

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fff;
`;

const Text = styled.Text`
    position: absolute;
    align-self: center;
    color: #27ae60;
    font-weight: 600;
    font-size: 12px;
`;

const NextButton = styled.Text`
    font-size: 16px;
    color: #007aff;
    font-weight: 500;
    text-align: right;
    padding-right: 15px;
    line-height: 22px;
`;

const SkipButton = styled.Text`
    font-size: 16px;
    color: #222;
    font-weight: 500;
    text-align: left;
    padding-left: 15px;
    line-height: 22px;
`;

const pages = [
    {
        image: require("./assets/img1.png"),
        coverImage: require("./assets/img1.2.png"),
        title: "Offline Notes",
        text:
            "As well, it became simpler to enter the dates of seasons. If you mistype, we’ll show a clue for checking the dates. Now it’s easier to stay tuned for the NDVI updates!"
    },
    {
        image: require("./assets/img2.png"),
        coverImage: require("./assets/img2.2.png"),
        title: "Offline Map",
        text:
            "Now it’s easier to stay tuned for the NDVI updates! If the weather is cloudless, we refresh the NDVI indices every 3–5 days. If it’s impossible to calculate NDVI due to the weather conditions, we show you a short note while viewing the field images."
    },
    {
        image: require("./assets/img3.gif"),
        title: "Offline Vegetation",
        text:
            "If you mistype, we’ll show a clue for checking the dates. Now it’s easier to stay tuned for the NDVI updates!"
    },

    {
        image: require("./assets/img2.png"),
        coverImage: require("./assets/img2.2.png"),
        title: "Other",
        text:
            "As well, it became simpler to enter the dates of seasons. If you mistype, we’ll show a clue for checking the dates. Now it’s easier to stay tuned for the NDVI updates! If the weather is cloudless, we refresh the NDVI indices every 3–5 days. If it’s impossible to calculate NDVI due to the weather conditions, we show you a short note while viewing the field images. Moreover, there is a new in-app help chat. To keep on getting support, update the app to the newest version! As well, it became simpler to enter the dates of seasons. If you mistype, we’ll show a clue for checking the dates. Now it’s easier to stay tuned for the NDVI updates! If the weather is cloudless, we refresh the NDVI indices every 3–5 days. If it’s impossible to calculate NDVI due to the weather conditions, we show you a short note while viewing the field images. Moreover, there is a new in-app help chat. To keep on getting support, update the app to the newest version!"
    }
];
