import React, { Component } from "react";
import Dimensions from "Dimensions";
import styled from "styled-components/native";
import Carousel from "react-native-snap-carousel";
import carouselImage from "./carousel.png";

export default class ThumbnailCarousel extends Component {
  constructor(props) {
    super();
    this.state = {
      errors: []
    };
    this.props = props;
    this._carousel = {};
    this.init();
  }

  init() {
    this.state = {
      videos: [
        {
          id: "1",
          source: carouselImage
        },
        {
          id: "2",
          source: carouselImage
        },
        {
          id: "3",
          source: carouselImage
        },
        {
          id: "4",
          source: carouselImage
        },
        {
          id: "5",
          source: carouselImage
        }
      ]
    };
  }

  handleSnapToItem(index) {}

  renderItem = ({ item, index }) => {
    return (
      <ThumbnailBackgroundView>
        <CurrentVideoTO
          onPress={() => {
            //this._carousel.snapToItem(index);
          }}
        >
          <CurrentVideoImage source={item.source} />
        </CurrentVideoTO>
        <VideoTitleText>{item.title}</VideoTitleText>
      </ThumbnailBackgroundView>
    );
  };

  render = () => {
    const sliderWidth = Dimensions.get("window").width;

    return (
      <CarouselBackgroundView>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.state.videos}
          renderItem={this.renderItem.bind(this)}
          onSnapToItem={this.handleSnapToItem.bind(this)}
          itemWidth={sliderWidth * 0.85}
          sliderWidth={sliderWidth}
          itemWidth={256}
          layout={"default"}
          firstItem={0}
          slideStyle={{ flex: 1 }}
          loop
        />
      </CarouselBackgroundView>
    );
  };
}

const VideoTitleText = styled.Text`
  color: white;
  top: 28;
  justify-content: center;
`;
const CurrentVideoImage = styled.Image`
  top: 5;
  box-shadow: 5px 10px;
  width: 256;
  border-radius: 10;
`;

const ThumbnailBackgroundView = styled.View`
  justify-content: center;
  align-items: center;
  width: 256;
`;

const CurrentVideoTO = styled.TouchableOpacity``;
const CarouselBackgroundView = styled.View`
  width: 100%;
`;
