import React, { Component } from "react";
import { FlatList } from "react-native";

export default class InfiniteScroll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      end: true
    };
    length = this.state.data.length;
    data = this.state.data.slice();
  }

  checkScroll=({ layoutMeasurement, contentOffset, contentSize })=> {

    if (this.state.data.length >= length * 3)
      this.setState(prevState => ({
        data: prevState.data.slice(length * 2)
      }));

    if (contentOffset.y <= this.props.offset) {
      this.setState(
        prevState => ({
          data: [...prevState.data, ...data]
        }),
        () => this.infListRef.scrollToIndex({ index: length, animated: false })
      );
    }

    if (
      layoutMeasurement.height + contentOffset.y >=
        contentSize.height - this.props.offset &&
      this.state.end
    ) {
      this.setState(prevState => ({
        data: [...prevState.data, ...data],
        end: false
      }));
    } else {
      this.setState({
        end: true
      });
    }
  }
  componentDidMount() {
    this.setState(prevState => ({
      data: [...prevState.data, ...prevState.data]
    }));
    setTimeout(() => {
      this.infListRef.scrollToIndex({ animated: false, index: length });
    }, 75);
  }
  render() {
    return (
      <FlatList
        // {...this.props}
        extraData={this.state.data}
        keyExtractor={(item, index) => `${item}${index}`}
        // initialNumToRender={this.state.data}
        getItemLayout={(item, index) => ({
          length: 100,
          offset: 100 * index,
          index
        })}
        initialScrollIndex={length / 2}
        // contentContainerStyle={{paddingVertical:150}}
        ref={ref => {
          this.infListRef = ref;
        }}
        data={this.state.data}
        renderItem={this.props.renderItem}
        onScroll={({ nativeEvent }) => this.checkScroll(nativeEvent)}
        showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
      />
    );
  }
}
