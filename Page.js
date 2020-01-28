import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Animated, ScrollView } from "react-native";
import { connect } from "react-redux";

function mapStateToProps(state) {
    return {
        textY: state.textY
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateTextY: textY =>
            dispatch({
                type: "UPDATE_TEXTY",
                textY: textY
            })
    };
}

const Page = props => {
    let style = {};
    const { image, coverImage, title, text, progress } = props;

    //Из-за этого вертикальный скролл работает только на полсденем слайде, хз в чем дело.
    style.transform = [
        {
            scale: progress.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [3, 1, 0]
            })
        }
    ];

    style.opacity = progress.interpolate({
        inputRange: [-0.25, 0, 1],
        outputRange: [0, 1, 0.25]
    });

    const imageRef = useRef(null);

    useEffect(() => {
        imageRef.current.measure((fx, fy, width, height, px, py) => {
            props.updateTextY(height + py);
        });
    });

    return (
        <Container>
            <Body>
                <Image ref={imageRef} source={image}></Image>
                <AnimatedImage
                    style={style}
                    source={coverImage}
                ></AnimatedImage>
                <Title>{title}</Title>
                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <Text>{text}</Text>
                </ScrollView>
            </Body>
            <BottomBar />
        </Container>
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Page);

const Container = styled.View`
    flex: 1;
    align-items: center;
`;

const Body = styled.View`
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
`;

const BottomBar = styled.View`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: #fff;
`;

const Image = styled.Image`
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    border-radius: 28px;
`;

const CoverImage = styled.Image`
    position: absolute;
    top: 0px;
    left: 15px;
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    border-radius: 28px;
`;

const AnimatedImage = Animated.createAnimatedComponent(CoverImage);

const Text = styled.Text`
    font-size: 16px;
    color: #222222;
    text-align: center;
    line-height: 22px;
    padding-bottom: 70px;
`;

const Title = styled.Text`
    padding-top: 68px;
    margin-bottom: 8px;
    font-size: 30px;
    color: #222222;
    font-weight: 700;
    text-align: center;
`;
