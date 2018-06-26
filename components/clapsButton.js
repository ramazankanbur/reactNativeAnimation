import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Animated, Text } from 'react-native';

class ClapButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            claps: []
        }
    }

    animationComplate = countNumber => {
        claps = this.state.claps;
        claps.splice(claps.indexOf(countNumber), 1);
        this.setState({ claps });
    }

    clapHandler = () => {
        let count = this.state.count;
        let claps = this.state.claps;
        count++;
        claps.push(count);
        this.setState({ count });
    }

    keepClapping = () => {
    this.clapTimer =  setInterval(() => this.clapHandler(), 150);
    }

    stopClapping= () => {
        if(this.clapTimer) {
            clearInterval(this.clapTimer);
        }
    }

    renderClaps = () => {
        return this.state.claps.map((countNum) => <ClapBubble key={countNum} count={countNum} animationComplate={this.animationComplate} />);
    }

    render() {
        let clapIcon = this.state.count > 0 ? <Image source={require('./../images/clapped.png')} style={{ height: 30, width: 30 }} />
            : <Image source={require('./../images/clap.png')} style={{ height: 30, width: 30 }} />;
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={this.clapHandler} onPressIn={this.keepClapping} onPressOut={this.stopClapping} style={styles.clapButton}>
                    {clapIcon}
                </TouchableOpacity>
                {this.renderClaps()}
            </View>
        );
    }
}

class ClapBubble extends Component {
    constructor() {
        super();
        this.state = {
            yPosition: new Animated.Value(0),
            opacity: new Animated.Value(0)
        }
    }

    componentDidMount() {
        Animated.parallel([
            Animated.timing(
                this.state.yPosition, {
                    toValue: -120,
                    duration: 500
                }
            ),
            Animated.timing(
                this.state.opacity, {
                    toValue: 1,
                    duration: 500
                }
            )
        ]).start(() => {
            setTimeout(() => {
                this.props.animationComplate(this.props.count);
            }, 500);
        });
    }

    render() {
        let animationStyle = {
            transform: [{
                translateY: this.state.yPosition,
            }],
            opacity: this.state.opacity
        };
        return (
            <Animated.View style={[styles.clapBubble, animationStyle]}>
                <Text style={styles.clapText}>+{this.props.count}</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    clapButton: {
        position: 'absolute',
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#ecf0f1',
        bottom: 20,
        right: 20,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    clapBubble: {
        position: 'absolute',
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#15a872',
        bottom: 20,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    clapText: {
        color: 'white',
        fontSize: 15
    }
})


export default ClapButton;